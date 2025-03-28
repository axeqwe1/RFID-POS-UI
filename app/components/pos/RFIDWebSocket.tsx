'use client'; // ระบุว่าเป็น Client Component เพราะใช้ useEffect และ useState

import { useEffect, useState } from 'react';
import useWebSocket from '@/app/hooks/useWebSocket';

interface ProductinCart {
  ProductName: string;
  Price: number;
  Qty: number;
  Size: string;
  Total: number;
  Color: string;
}

export default function RFIDWebSocket() {
  // ใช้ WebSocket Hook
  const { data, status, error } = useWebSocket('ws://localhost:3000/lib/api/socket');
    const [lastUpdated, setLastUpdated] = useState<string>(''); // เริ่มต้นเป็น string ว่าง
  const [message, setMessage] = useState<string>(''); // สำหรับส่งข้อความไปยัง server
  const [tagData, setTagData] = useState<ProductinCart[]>([]); // เก็บข้อมูลที่แปลงแล้ว
  const [scan, setScan] = useState<boolean>(false); // สถานะ scan

  // สร้าง WebSocket instance สำหรับส่งข้อความ (ใช้ instance เดียวกับใน Hook ไม่ได้โดยตรง)
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
  // กำหนดค่าเริ่มต้นของ lastUpdated เฉพาะฝั่ง client
  if (!lastUpdated) {
    setLastUpdated(new Date().toLocaleString());
  }
}, []); // ทำงานครั้งเดียวเมื่อ component mount
  // ตั้งค่า WebSocket instance สำหรับส่งข้อความ
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000/lib/api/socket');
    socket.onopen = () => {
      console.log('WebSocket for sending messages connected');
    };
    socket.onerror = (err) => {
      console.error('WebSocket for sending messages error:', err);
    };
    socket.onclose = () => {
      console.log('WebSocket for sending messages disconnected');
    };
    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  // อัปเดตข้อมูลเมื่อได้รับจาก WebSocket
  useEffect(() => {
    if (!data || !data.data) return;

    const rfidItems = data.data;
    const productList: ProductinCart[] = [];
    for (let i = 0; i < rfidItems.length; i++) {
      const existingProduct = productList.find(
        (item) =>
          item.ProductName === rfidItems[i].ProductName &&
          item.Size === rfidItems[i].Size &&
          item.Color === rfidItems[i].Color
      );

      if (existingProduct) {
        existingProduct.Qty += 1;
        existingProduct.Total += rfidItems[i].UnitPrice;
      } else {
        const newProduct: ProductinCart = {
          ProductName: rfidItems[i].ProductName,
          Price: rfidItems[i].UnitPrice,
          Qty: 1,
          Size: rfidItems[i].Size,
          Total: rfidItems[i].UnitPrice,
          Color: rfidItems[i].Color,
        };
        productList.push(newProduct);
      }
    }

    setTagData((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(productList)) {
        return prev;
      }
      return productList;
    });

    setScan(productList.length > 0);
    setLastUpdated(new Date().toLocaleString());
  }, [data]);

  // ฟังก์ชันสำหรับส่งข้อความไปยัง WebSocket server
  const sendMessage = () => {
    if (ws && ws.readyState === ws.OPEN) {
      ws.send(message);
      setMessage(''); // ล้าง input หลังจากส่ง
    } else {
      alert('WebSocket is not connected');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Real-time RFID Data via WebSocket</h2>

      {/* แสดงสถานะ WebSocket */}
      <div style={{ marginBottom: '20px' }}>
        <p>
          <strong>WebSocket Status:</strong>{' '}
          <span
            style={{
              color:
                status === 'Connected'
                  ? 'green'
                  : status === 'Disconnected'
                  ? 'red'
                  : 'orange',
            }}
          >
            {status}
          </span>
        </p>
        {error && (
          <p style={{ color: 'red' }}>
            <strong>Error:</strong> {error}
          </p>
        )}
      </div>

      {/* แสดงสถานะ Scan และ Last Updated */}
      <div style={{ marginBottom: '20px' }}>
        <p>
          <strong>Scan Status:</strong>{' '}
          <span style={{ color: scan ? 'green' : 'red' }}>
            {scan ? 'Active' : 'Inactive'}
          </span>
        </p>
        <p>
          <strong>Last Updated:</strong> {lastUpdated}
        </p>
      </div>

      {/* ฟอร์มสำหรับส่งข้อความไปยัง WebSocket server */}
      <div style={{ marginBottom: '20px' }}>
        <h3>Test Two-Way Communication</h3>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message to send..."
          style={{ padding: '5px', marginRight: '10px', width: '300px' }}
        />
        <button
          onClick={sendMessage}
          style={{
            padding: '5px 10px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Send Message
        </button>
      </div>

      {/* แสดงข้อมูล RFID */}
      <div>
        <h3>RFID Data</h3>
        {tagData.length > 0 ? (
          <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: '800px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f0f0' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Product Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Price</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Size</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Total</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Color</th>
              </tr>
            </thead>
            <tbody>
              {tagData.map((item, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.ProductName}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.Price}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.Qty}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.Size}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.Total}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.Color}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Waiting for RFID data...</p>
        )}
      </div>

      {/* แสดง raw data (สำหรับ debugging) */}
      <div style={{ marginTop: '20px' }}>
        <h3>Raw WebSocket Data (Debug)</h3>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          {data ? JSON.stringify(data, null, 2) : 'No data received yet'}
        </pre>
      </div>
    </div>
  );
}