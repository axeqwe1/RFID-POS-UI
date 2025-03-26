// src/components/ui/Alert.tsx
'use client';

import { ReactNode, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { motion, Variants } from 'framer-motion';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  icon?: IconDefinition; // กำหนด Icon
  autoClose?: number; // ระยะเวลาก่อนปิดอัตโนมัติ (มิลลิวินาที)
}

export const Alert: React.FC<AlertProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'ยืนยันการดำเนินการ',
  message = 'คุณแน่ใจหรือไม่ว่าต้องการดำเนินการนี้?',
  confirmText = 'ยืนยัน',
  cancelText = 'ยกเลิก',
  type = 'success',
  icon,
  autoClose,
}) => {
  // ปิดอัตโนมัติหลังจากระยะเวลาที่กำหนด (ถ้ามี)
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  // ถ้าไม่เปิด Alert ให้ return null
  if (!isOpen) return null;

  // กำหนดสีตามประเภทของ Alert
  const alertStyles = {
    success: { class: 'bg-success text-success-content' },
    error: { class: 'bg-error text-error-content' },
    info: { class: 'bg-info text-info-content' },
    warning: { class: 'bg-warning text-warning-content' },
  };

  const { class: alertClass } = alertStyles[type];

  // ถ้าไม่ได้กำหนด Icon ให้ใช้ Icon ตาม type
  const defaultIcons: { [key: string]: IconDefinition } = {
    success: faCheckCircle,
    error: faExclamationCircle,
    info: faExclamationCircle,
    warning: faExclamationCircle,
  };

  const selectedIcon = icon || defaultIcons[type];

  // Animation เฉพาะ Alert Body
  const alertBodyVariants: Variants = {
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

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[9999] back-drop-alert bg-opacity-50 flex items-center justify-center">
      <motion.div
        className="bg-base-100 rounded-lg shadow-lg max-w-[1600px] max-h-[calc(100vh-24rem)] h-full p-[3rem]"
        variants={alertBodyVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()} // ป้องกันการปิดเมื่อคลิกใน Alert
      >
        <div className="flex justify-between flex-col h-full">
          <div className="flex flex-col justify-center items-center">
            {/* Icon พร้อม Animation */}
            <motion.div variants={iconVariants} initial="hidden" animate={['visible', 'bounce']}>
              <FontAwesomeIcon icon={selectedIcon} className="text-8xl text-primary mb-9" />
            </motion.div>
            <h3 className="font-bold text-6xl">{title}</h3>
            <p className="py-4 text-base-content text-4xl">{message}</p>
          </div>
          <div className="flex flex-row justify-between w-full h-[100px] max-w-[1100px] mx-auto">
            <button
              className={`btn btn-error text-4xl h-full w-[45%] `}
              onClick={onClose}
            >
              {cancelText}
            </button>
            <button
              className={`btn btn-success text-4xl h-full w-[45%] `}
              onClick={handleConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};