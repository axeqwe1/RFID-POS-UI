// app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import LoadingThreeDotsJumping from './components/ui/Loading';
import Start from './startscreen/page';
export default function HomePage() {
const [isLoading, setLoading] = useState(false); // เริ่มต้นเป็น false เพื่อรอ client-side
  const router = useRouter();

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

      <Start/>
    </div>
  ); // หรือแสดง loading state
}