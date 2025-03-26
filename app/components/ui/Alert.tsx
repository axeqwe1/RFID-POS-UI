// src/components/ui/Alert.tsx
'use client';

import { ReactNode, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { motion, Variants, AnimatePresence } from 'framer-motion';

interface AlertProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  icon?: IconDefinition;
  autoClose?: number;
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
  const [isClosing, setIsClosing] = useState(false);

  // ปิดอัตโนมัติหลังจากระยะเวลาที่กำหนด (ถ้ามี)
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  // เพิ่ม/ลบ overflow-hidden ใน body เพื่อป้องกันการเลื่อน
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

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

  // Animation สำหรับ Backdrop

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

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

  const handleConfirm = async () => {
    setIsClosing(true);
    // await new Promise<void>((resolve) => setTimeout(resolve, 300));
    onConfirm();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 w-screen h-screen z-[9999] back-drop-alert flex items-center justify-center will-change-opacity"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-base-100 rounded-lg shadow-lg max-w-[900px] w-full max-h-[calc(100vh-18rem)] h-full p-[3rem]"
            variants={alertBodyVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between flex-col h-full">
              <div className="flex flex-col justify-center items-center">
                <motion.div variants={iconVariants} initial="hidden" animate={['visible', 'bounce']}>
                  <FontAwesomeIcon icon={selectedIcon} className="text-8xl text-primary mb-9" />
                </motion.div>
                <h3 className="font-bold text-5xl">{title}</h3>
                <p className="py-4 text-base-content text-3xl">{message}</p>
              </div>
              <div className="flex flex-row justify-between w-full h-[100px] max-w-[1100px] mx-auto">
                <button
                  className={`btn btn-error text-4xl h-full w-[45%]`}
                  onClick={onClose}
                >
                  {cancelText}
                </button>
                <button
                  className={`btn btn-success text-4xl h-full w-[45%]`}
                  onClick={handleConfirm}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};