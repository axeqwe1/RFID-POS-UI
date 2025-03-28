const { WebSocketServer } = require('ws');
const express = require('express');

const app = express();
const server = require('http').createServer(app);

// สร้าง WebSocket Server
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
    console.log('Client Connected');

    ws.on('message', (message) => {
        console.log('Received:', message.toString());

        // ส่งข้อความกลับไปหาทุก Client
        wss.clients.forEach((client) => {
            if (client.readyState === ws.OPEN) {
                client.send(`Server received: ${message}`);
            }
        });
    });

    ws.on('close', () => console.log('Client Disconnected'));

    // ส่งข้อมูล real-time ทุก 3 วินาที
    const interval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
            ws.send(JSON.stringify({ timestamp: new Date().toISOString(), message: 'Real-time update' }));
        }
    }, 3000);

    ws.on('close', () => clearInterval(interval));
});

// เริ่มเซิร์ฟเวอร์ WebSocket ที่พอร์ต 3001
server.listen(3001, () => {
    console.log('WebSocket Server is running on ws://localhost:3001');
});
