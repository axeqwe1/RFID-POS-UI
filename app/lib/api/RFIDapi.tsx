// src/lib/api/rfid.ts
import { apiService } from '../axios';

// Interface สำหรับ request
interface RFIDRequest {
  rfidTag?: string; // ใช้สำหรับกรองตาม RFID tag
  limit?: number;   // จำกัดจำนวนรายการ
  offset?: number;  // สำหรับ pagination
}

// Interface สำหรับข้อมูล RFID แต่ละชิ้น (รวมข้อมูล Product)
interface RFIDProduct {
  ProductId: number;
  ProductCode: string;
  ProductName: string;
  RFIDData: string;
  CategoryId: number;
  UnitPrice: number;
  SKUCode: string;
  Color: string;
  Size: string;
  QuantityInStock: number;
  IsActive: boolean;
  Status: number;
  Remark: string;
  CreateDate: string; // รูปแบบ "/Date(1732467600000)/"
  UpdateDate: string; // รูปแบบ "/Date(1732467600000)/"
}

// Interface สำหรับ response จาก API
interface RFIDResponse extends Array<RFIDProduct> {
  
}

// Function สำหรับดึงข้อมูล RFID
// สร้าง cache object เพื่อเก็บข้อมูลชั่วคราว
// const cache = new Map<string, { data: RFIDResponse; timestamp: number }>();
export const fetchRFID = async (params?: RFIDRequest): Promise<RFIDResponse> => {

  try {
    const res = await apiService.get('/RFID/GetTags', { params });
    const data = res.data;
    if (!data || !Array.isArray(data)) {
      throw new Error('Invalid Response Data from server');
    }
    return data;
  } catch (err: any) {
    throw new Error(err.request?.data?.message || err.message || 'An error occurred while fetching RFID data');
  }
};

export const startRFID = async () => {
    try{
        const res = await apiService.post('/RFID/StartReading')
        console.log(`start RFID`)
    }
    catch(err:any){
        throw new Error(err.request?.data?.message || err.message || 'failed to start RFID data');
    }
}

export const restartRFID = async () => {
    try{
        await apiService.post('/RFID/ReStartReading')
        await fetchRFID()
        console.log('restart')
    }catch(err:any){
        throw new Error(err.request?.data?.message || err.message || 'failed to Restart RFID data')
    }
}

export const stopRFID = async () => {
    try{
        const res = await apiService.post('/RFID/StopReading')
        console.log(`stop RFID`)
    }catch(err:any){
        throw new Error(err.request?.data?.message || err.message || 'failed to Stop RFID data')
    }
}