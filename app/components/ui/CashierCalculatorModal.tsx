// src/components/ui/CashierCalculatorModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { useAlert } from '@/app/contexts/AlertContext';
import LoadingThreeDotsJumping from './Loading';

interface CashierCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number; // ยอดรวมที่ต้องชำระ
  onConfirm: (amountReceived: number, change: number) => void; // ส่งข้อมูลกลับเมื่อกดยืนยัน
}

export const CashierCalculatorModal: React.FC<CashierCalculatorModalProps> = ({
  isOpen,
  onClose,
  totalAmount,
  onConfirm,
}) => {
  const [amountReceived, setAmountReceived] = useState(''); // จำนวนเงินที่ลูกค้าจ่าย
  const [change, setChange] = useState<number | null>(null); // เงินทอน
  const { showAlert } = useAlert(); // เรียกใช้ showAlert จาก AlertContext
  const [isLoading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(isOpen); // เพิ่ม state เพื่อควบคุมการปิด Modal

  // เพิ่ม/ลบ overflow-hidden ใน body เพื่อป้องกันการเลื่อน
  useEffect(() => {
    if (isOpen) {
      setModalVisible(true); // แสดง Modal เมื่อ isOpen เป็น true
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Animation สำหรับ Backdrop
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  // Animation เฉพาะ Modal Body
  const modalBodyVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  // ฟังก์ชันจัดการการกดตัวเลข (สำหรับปุ่ม 0-9)
  const handleNumberClick = (num: string) => {
    if (amountReceived.length < 10) {
      // จำกัดจำนวนหลัก
      setAmountReceived(amountReceived === '0' ? num : amountReceived + num);
    }
  };

  // ฟังก์ชันจัดการการกดปุ่ม 100, 500, 1000 (บวกจำนวนเงิน)
  const handleQuickAmountClick = (amount: number) => {
    const currentAmount = parseFloat(amountReceived) || 0; // แปลง amountReceived เป็นตัวเลข
    const newAmount = currentAmount + amount; // บวกจำนวนเงิน
    setAmountReceived(newAmount.toString()); // อัปเดต amountReceived
  };

  // ฟังก์ชันจัดการการกดจุดทศนิยม
  const handleDecimalClick = () => {
    if (!amountReceived.includes('.')) {
      setAmountReceived(amountReceived + '.');
    }
  };

  // ฟังก์ชันล้างค่า
  const handleClearClick = () => {
    setAmountReceived('');
    setChange(null);
  };

  // ฟังก์ชันคำนวณเงินทอน
  const calculateChange = () => {
    const received = parseFloat(amountReceived) || 0;
    if (received >= totalAmount) {
      const changeAmount = received - totalAmount;
      setChange(changeAmount);
    } else {
      setChange(null); // ถ้าเงินไม่พอ ไม่แสดงเงินทอน
    }
  };

  // อัปเดตเงินทอนเมื่อ amountReceived เปลี่ยน
  useEffect(() => {
    if (amountReceived) {
      calculateChange();
    } else {
      setChange(null);
    }
  }, [amountReceived]);

  // ฟังก์ชันหน่วงเวลา (simulate loading)
  const simulateLoading = async () => {
    setLoading(true);
    await new Promise<void>((resolve) => setTimeout(resolve, 1500)); // หน่วงเวลา 1.5 วินาที
    setLoading(false);
  };

  // ฟังก์ชันยืนยัน (แสดง Alert ก่อน)
  const handleConfirm = () => {
    const received = parseFloat(amountReceived) || 0;
    if (received >= totalAmount) {
      const changeAmount = received - totalAmount;
      // แสดง Alert เพื่อยืนยันข้อมูล
      showAlert({
        title: 'ยืนยันข้อมูลการชำระเงิน',
        message: `รับเงิน: ${received.toFixed(2)} THB\nเงินทอน: ${changeAmount.toFixed(2)} THB\nข้อมูลถูกต้องหรือไม่?`,
        confirmText: 'ยืนยัน',
        cancelText: 'ยกเลิก',
        type: 'info',
        onConfirm: async () => {
          // แสดง Loading ก่อนดำเนินการต่อ
          await simulateLoading();
          // หลังจาก Loading เสร็จ ดำเนินการชำระเงิน
          onConfirm(received, changeAmount);
          setModalVisible(false); // เริ่ม animation ปิด Modal
        },
      });
    }
  };

  // ฟังก์ชันปิด Modal (รอ animation เสร็จก่อน)
  const handleClose = () => {
    setModalVisible(false); // เริ่ม animation ปิด Modal
  };

  return (
    <>
      <LoadingThreeDotsJumping isLoading={isLoading} />
      <AnimatePresence
        onExitComplete={() => {
          if (!isModalVisible) {
            onClose(); // เรียก onClose หลังจาก animation เสร็จ
            document.body.style.overflow = 'auto'; // คืนค่า overflow
          }
        }}
      >
        {isModalVisible && !isLoading && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen z-[9999] back-drop-alert flex items-center justify-center will-change-opacity"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="bg-base-100 rounded-lg shadow-lg max-w-[900px] w-full p-6"
              variants={modalBodyVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <h3 className="text-3xl font-bold mb-4 text-center">เครื่องคิดเลขสำหรับชำระเงิน</h3>

              {/* Display */}
              <div className="mb-4">
                <div className="bg-gray-200 rounded-lg p-4 mb-2 text-right text-2xl font-mono">
                  <span className="text-gray-500">ยอดรวม: </span>
                  {totalAmount.toFixed(2)} THB
                </div>
                <div className="bg-gray-200 rounded-lg p-4 mb-2 text-right text-2xl font-mono">
                  <span className="text-gray-500">รับเงิน: </span>
                  {amountReceived || '0'} THB
                </div>
                <div className="bg-gray-200 rounded-lg p-4 text-right text-2xl font-mono">
                  <span className="text-gray-500">เงินทอน: </span>
                  {change !== null ? change.toFixed(2) : '-'} THB
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-4 gap-2">
                {/* Row 1 */}
                <button
                  className="btn btn-error h-[8vh] text-2xl"
                  onClick={handleClearClick}
                >
                  C
                </button>
                <button
                  className="btn btn-soft btn-primary h-[8vh] text-2xl"
                  onClick={() => handleNumberClick('7')}
                >
                  7
                </button>
                <button
                  className="btn btn-soft btn-primary h-[8vh] text-2xl"
                  onClick={() => handleNumberClick('8')}
                >
                  8
                </button>
                <button
                  className="btn btn-soft btn-primary h-[8vh] text-2xl"
                  onClick={() => handleNumberClick('9')}
                >
                  9
                </button>

                {/* Row 2 */}
                <button
                  className="btn btn-info h-[8vh] text-2xl col-span-1"
                  onClick={() => handleQuickAmountClick(1000)}
                >
                  1000
                </button>
                <button
                  className="btn btn-soft btn-primary h-[8vh] text-2xl"
                  onClick={() => handleNumberClick('4')}
                >
                  4
                </button>
                <button
                  className="btn btn-soft btn-primary h-[8vh] text-2xl"
                  onClick={() => handleNumberClick('5')}
                >
                  5
                </button>
                <button
                  className="btn btn-soft btn-primary h-[8vh] text-2xl"
                  onClick={() => handleNumberClick('6')}
                >
                  6
                </button>

                {/* Row 3 */}
                <button
                  className="btn btn-info h-[8vh] text-2xl col-span-1"
                  onClick={() => handleQuickAmountClick(500)}
                >
                  500
                </button>
                <button
                  className="btn btn-soft btn-primary h-[8vh] text-2xl"
                  onClick={() => handleNumberClick('1')}
                >
                  1
                </button>
                <button
                  className="btn btn-soft btn-primary h-[8vh] text-2xl"
                  onClick={() => handleNumberClick('2')}
                >
                  2
                </button>
                <button
                  className="btn btn-soft btn-primary h-[8vh] text-2xl"
                  onClick={() => handleNumberClick('3')}
                >
                  3
                </button>

                {/* Row 4 */}
                <button
                  className="btn btn-info h-[8vh] text-2xl col-span-1"
                  onClick={() => handleQuickAmountClick(100)}
                >
                  100
                </button>
                <button
                  className="btn btn-soft btn-primary h-[8vh] text-2xl col-span-2"
                  onClick={() => handleNumberClick('0')}
                >
                  0
                </button>
                <button
                  className="btn btn-soft btn-primary h-[8vh] text-2xl"
                  onClick={handleDecimalClick}
                >
                  .
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-[24px] flex justify-between">
                <button
                  className="btn btn-error btn-wide h-[7vh] text-2xl"
                  onClick={handleClose}
                >
                  ปิด
                </button>
                <button
                  className="btn btn-success btn-wide h-[7vh] text-2xl"
                  onClick={handleConfirm}
                  disabled={change === null || change < 0}
                >
                  ยืนยัน
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};