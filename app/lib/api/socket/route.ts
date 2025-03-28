import { NextRequest } from 'next/server';
import { WebSocketServer } from 'ws';
import { fetchRFID } from '../RFIDapi';

// สร้าง WebSocket server instance (สร้างครั้งเดียวเมื่อไฟล์ถูกโหลด)
const wss = new WebSocketServer({ noServer: true });

// ตัวแปรเก็บ interval สำหรับการส่งข้อมูล
let dataInterval: NodeJS.Timeout | null = null;

// ฟังก์ชันเริ่มการส่งข้อมูล
const startSendingData = () => {
    if (dataInterval) return; // ถ้ามี interval อยู่แล้ว ไม่ต้องเริ่มใหม่

    dataInterval = setInterval(async () => {
        // ดึงข้อมูลจาก fetchRFID
        try {
            const data = await fetchRFID();
            // ส่งข้อมูลไปยังทุก client ที่เชื่อมต่อ
            wss.clients.forEach((client) => {
                if (client.readyState === client.OPEN) {
                    client.send(
                        JSON.stringify({
                            data,
                            timestamp: new Date().toISOString(),
                            message: data,
                        })
                    );
                }
            });
        } catch (err) {
            console.error('Error fetching RFID data:', err);
        }
    }, 1000); // ส่งทุก 1 วินาที
};

// ฟังก์ชันหยุดการส่งข้อมูล
const stopSendingData = () => {
    if (dataInterval && wss.clients.size === 0) {
        clearInterval(dataInterval);
        dataInterval = null;
        console.log('Stopped sending data: No clients connected');
    }
};

// จัดการการเชื่อมต่อ WebSocket
wss.on('connection', (ws) => {
    console.log('Client Connected');

    // เริ่มส่งข้อมูลเมื่อมี client เชื่อมต่อ
    startSendingData();

    ws.on('message', (message) => {
        console.log('Received:', message.toString());
        // ส่งข้อมูลกลับไปให้ทุก client ที่เชื่อมต่อ
        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(`Server received: ${message}`);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client Disconnected');
        // หยุดส่งข้อมูลถ้าไม่มี client เชื่อมต่อ
        stopSendingData();
    });
});

export async function GET(req: NextRequest) {
    // ตรวจสอบว่าเป็น WebSocket request หรือไม่
    if (req.headers.get('upgrade') === 'websocket') {
        // สร้าง HTTP server เพื่อจัดการ upgrade
        const { server } = req as any; // Next.js API Route จะส่ง server มาใน context
        if (!server) {
            return new Response('Server not available', { status: 500 });
        }

        server.on('upgrade', (request: any, socket: any, head: any) => {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
            });
        });

        return new Response(null, { status: 101 });
    }

    return new Response('WebSocket Server Running');
}