import { apiService } from '../axios';


// Interface สำหรับ request (GET request อาจส่ง query params)
interface ProductRequest {
  rfidTag?: string; // ถ้า API ต้องการส่ง RFID tag เพื่อค้นหาสินค้า
  limit?: number;   // จำกัดจำนวนสินค้าที่ดึงมา
  offset?: number;  // สำหรับ pagination
}

// Interface สำหรับข้อมูลผลิตภัณฑ์แต่ละชิ้น
interface Product {
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
interface ProductResponse {
  GETDATA: Product[];
}

// Function สำหรับดึงข้อมูลสินค้า
export const fetchProduct = async (params?:ProductRequest) : Promise<ProductResponse> => {
    try{
        const res = await apiService.get('/RFID/GetProduct', {params})
        const data = res.data
        if(!data.GETDATA || ! Array.isArray(data.GETDATA)){
            throw new Error('Invalid Response Data from server')
        }
        return data
    }catch(err:any){
        throw new Error(err.request?.data?.message || err.message || 'An error occurred while fetching products')
    }
}