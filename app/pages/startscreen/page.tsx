'use client';
import { useNav } from '@/app/contexts/NavContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const Start = () => {
  const router = useRouter();

  const handleNavigate = (href: string) => {
    setTimeout(() => {
      router.push(href);
    }, 0); // รอ Animation เสร็จก่อนเปลี่ยนหน้า
  };
  const navRef = useNav()
const { setNavname, setNavmode } = useNav();
useEffect(() => {
  setNavname('Self Checkout'); // ถูกต้อง
  setNavmode(false);   // ถูกต้อง
}, []);
  return (
    <div className="flex justify-center items-center mx-[60px] py-[2rem] h-full">
      <motion.button
        className="btn btn-primary w-[100%] h-[80vh] text-8xl rounded-3xl"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleNavigate('/pages/selectmember')} // ใช้ฟังก์ชันใหม่
      >
        START
      </motion.button>
    </div>
  );
};
