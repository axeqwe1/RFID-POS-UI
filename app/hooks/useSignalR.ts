'use client'
import { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useSignalRContext } from '../contexts/SignalRContext';
import { ProductinCart } from '../types/ProductInCart';

const useSignalR = (hubUrl: string) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [rfidTags, setRfidTags] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const refContext = useSignalRContext()
  const [IsMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (typeof window === 'undefined') return; // ⛔️ Don't run on server
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl, {
        skipNegotiation: false, // ใช้ negotiation เพื่อเลือก WebSocket
        transport: signalR.HttpTransportType.WebSockets // บังคับใช้ WebSocket
      })
      .withAutomaticReconnect([0,2000,5000,10000,30000])
      .withHubProtocol(new signalR.JsonHubProtocol())
      .configureLogging(signalR.LogLevel.Information)
      .build();
      
    setConnection(newConnection);
    const startConnection = async () => {
      try {
        setIsConnecting(true);
        if(!IsMounted){
          await newConnection.start()
          .catch((err) => {
            console.error('❌ SignalR connection error:', err);
          });
        }else{
          console.log(`is Mounted Already`)
          return
        }

        newConnection.on('ReceiveRFIDUpdate', (tag) => {
          const newTag = tag[0]; // สมมติ tag[0] คือ object ที่มี EPC
          console.log(tag)
          refContext.setData(prev => {
            const isDuplicate = prev.some(t => t.rfidData === newTag.rfidData);
            if (isDuplicate) {
              console.log('prev RFID Tag:', prev);
              return prev; // ถ้ามีอยู่แล้ว ให้คืน state เดิม
            }
            const updated = [...prev, newTag];
            console.log('Added new RFID Tag:', updated);
            return updated;
          });
        });

        newConnection.on('TestBroadcast', (tag) => {
          console.log('Received RFID Tag:', tag);
        });
        newConnection.onclose((error) => {
          if (error) {
            console.error('Connection closed with error:', error);
            setError(error);
          } else {
            console.log('Connection closed');
          }
        });

      } catch (err: any) {
        console.error('Connection error:', err);
        setError(err);
      } finally {
        setIsConnecting(false);
      }
    };
    startConnection();

    return () => {
      if (connection) {
        newConnection.off("ReceiveMessage");
      }
    };
  }, []);

  return { connection, rfidTags, error, isConnecting };
};

export default useSignalR;