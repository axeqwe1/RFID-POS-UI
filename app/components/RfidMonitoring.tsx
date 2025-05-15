import React from 'react';
import useSignalR from '../hooks/useSignalR';

const RfidMonitor: React.FC = () => {
  // เปลี่ยน URL ให้ตรงกับเซิร์ฟเวอร์ของคุณ
  const { connection, rfidTags, error, isConnecting } = useSignalR(
    process.env.NEXT_PUBLIC_SIGNALR_URL || 'https://localhost:7233/rfidHub'
  );

  if (isConnecting) {
    return <div>Connecting to RFID Hub...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  return (
    <>
    </>
  );
};

export default RfidMonitor;