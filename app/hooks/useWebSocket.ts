import { useEffect, useState, useCallback } from 'react';

interface WebSocketData {
  data: any;
  timestamp?: string;
  message?: any;
}

export default function useWebSocket(url: string) {
  const [data, setData] = useState<WebSocketData | null>(null);
  const [status, setStatus] = useState<string>('Disconnected');
  const [error, setError] = useState<string | null>(null);

  // ฟังก์ชันสำหรับจัดการการเชื่อมต่อ WebSocket
  const connectWebSocket = useCallback(() => {
    // สร้าง WebSocket instance
    const socket = new WebSocket(url);

    socket.onopen = () => {
      console.log('WebSocket Connected');
      setStatus('Connected');
      setError(null);
    };

    socket.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setData(parsedData);
      } catch (err) {
        console.error('Error parsing WebSocket data:', err);
        setError('Failed to parse data');
      }
    };

    socket.onerror = (event) => {
      console.error('WebSocket Error:', event);
      setStatus('Error');
      setError('WebSocket connection error');
    };

    socket.onclose = (event) => {
      console.log('WebSocket Disconnected:', event.code, event.reason);
      setStatus('Disconnected');
      setError(event.reason || 'WebSocket disconnected');
    };

    // คืนค่า socket เพื่อใช้ในการ cleanup
    return socket;
  }, [url]);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    // เริ่มการเชื่อมต่อ
    socket = connectWebSocket();

    // ฟังก์ชันสำหรับ reconnect (ถ้าต้องการ)
    const attemptReconnect = () => {
      if (status === 'Disconnected' && !socket) {
        console.log('Attempting to reconnect...');
        socket = connectWebSocket();
      }
    };

    // ตั้งค่า reconnect ถ้าการเชื่อมต่อขาด (optional)
    if (status === 'Disconnected') {
      reconnectTimeout = setTimeout(attemptReconnect, 5000); // ลอง reconnect ทุก 5 วินาที
    }

    // Cleanup เมื่อ component unmount
    return () => {
      if (socket) {
        socket.close();
        socket = null;
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, [url, status, connectWebSocket]);

  return { data, status, error };
}