// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import LoadingThreeDotsJumping from './components/ui/Loading';
import Start from './startscreen/page';
import { fetchProduct } from './lib/api/ProductApi';
export default function HomePage() {
const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchProduct(); // รอให้ Promise resolved
        console.log(response.GETDATA); // ดูข้อมูลที่ได้
        setProducts(response.GETDATA); // เก็บข้อมูล GETDATA ใน state
      } catch (err: any) {
        console.error(err);
        setError(err.message || 'Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []); // dependency array ว่างเปล่า ดังนั้นจะเรียกครั้งเดียวตอน component mount

  
  // // ตั้งค่า isLoading เฉพาะฝั่ง client
  // useEffect(() => {
  //   setLoading(true); // เริ่มโหลดเมื่อ client-side เท่านั้น

  //   // // จำลองการโหลด 3 วินาที แล้วเปลี่ยนหน้า
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [router]);

  return (
    <div className="max-w-[1400px] mx-auto h-full page-card">
      {/* {products.length > 0 && (
        <div>
          {products.map((items) => (
            
            <div key={items.ProductId}>
              <div>{items.ProductName}</div>
            </div>
          ))}
        </div>
      )} */}
      <Start/>
    </div>
  ); // หรือแสดง loading state
}