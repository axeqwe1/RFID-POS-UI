// app/PaymentSuccess/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPrint } from '@fortawesome/free-solid-svg-icons';
import { motion, Variants } from 'framer-motion';
import { useNav } from '@/app/contexts/NavContext';

const PaymentSuccess = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const refNav = useNav()
  // ดึงข้อมูลจาก query parameters
  const totalAmount = parseFloat(searchParams.get('totalAmount') || '0');
  const amountReceived = parseFloat(searchParams.get('amountReceived') || '0');
  const change = parseFloat(searchParams.get('change') || '0');
  const method = searchParams.get('method') || 'ไม่ระบุ';

  // วันที่และเวลา
  const transactionDate = new Date().toLocaleString('th-TH', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // Animation สำหรับ container
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  // Animation สำหรับไอคอน
  const iconVariants: Variants = {
    hidden: { scale: 0, opacity: 0, rotate: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 360,
      transition: { type: 'spring', stiffness: 260, damping: 20, duration: 0.8 },
    },
    bounce: {
      scale: [1, 1.2, 1],
      transition: { repeat: Infinity, repeatType: 'loop' as const, duration: 1.5 },
    },
  };

  // Animation สำหรับข้อความ
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.3 },
    },
  };

  // กลับไปหน้าแรกหลังจาก 10 วินาที (ถ้าผู้ใช้ไม่กดปุ่ม)
  useEffect(() => {
    refNav.setNavmode(false)
    refNav.setNavname("Payment Success")
    // const timer = setTimeout(() => {
    //   router.push('/');
    // }, 10000); // 10 วินาที

    // return () => clearTimeout(timer);
  }, [router]);

  // ฟังก์ชันสำหรับพิมพ์ใบเสร็จ
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50">
      <motion.div
        className="bg-base-100 rounded-lg shadow-lg max-w-[800px] w-full p-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* ไอคอนสำเร็จ */}
        <motion.div
          variants={iconVariants}
          initial="hidden"
          animate={['visible', 'bounce']}
        >
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-8xl text-success mb-6"
          />
        </motion.div>

        {/* หัวข้อ */}
        <motion.h1
          className="text-4xl font-bold text-success mb-4"
          variants={textVariants}
        >
          ชำระเงินสำเร็จ!
        </motion.h1>

        {/* รายละเอียดการชำระเงิน */}
        <motion.div
          className="text-lg text-base-content mb-6"
          variants={textVariants}
        >
          <p>วิธีการชำระเงิน: <span className="font-semibold">{method}</span></p>
          <p>ยอดรวม: <span className="font-semibold">{totalAmount.toFixed(2)} THB</span></p>
          {method === 'เงินสด' && (
            <>
              <p>รับเงิน: <span className="font-semibold">{amountReceived.toFixed(2)} THB</span></p>
              <p>เงินทอน: <span className="font-semibold">{change.toFixed(2)} THB</span></p>
            </>
          )}
          <p>วันที่/เวลา: <span className="font-semibold">{transactionDate}</span></p>
        </motion.div>

        {/* ปุ่มดำเนินการ */}
        <motion.div
          className="flex justify-center gap-4 mb-4"
          variants={textVariants}
        >
          <button
            className="btn btn-info text-2xl px-6"
            onClick={handlePrint}
          >
            <FontAwesomeIcon icon={faPrint} className="mr-2" />
            พิมพ์ใบเสร็จ
          </button>
          <button
            className="btn btn-primary text-2xl px-6"
            onClick={() => router.push('/')}
          >
            กลับไปหน้าแรก
          </button>
          <button
            className="btn btn-secondary text-2xl px-6"
            onClick={() => router.push('/PaymentScreen')}
          >
            ชำระเงินใหม่
          </button>
        </motion.div>

        {/* ข้อความแจ้งกลับอัตโนมัติ */}
        <motion.p
          className="text-sm text-gray-500"
          variants={textVariants}
        >
          ระบบจะกลับไปหน้าแรกอัตโนมัติใน 10 วินาที...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;