// src/components/ui/Modal.tsx
'use client';

import { ReactNode, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { motion, Variants } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'ยืนยันการดำเนินการ',
  message = 'คุณแน่ใจหรือไม่ว่าต้องการดำเนินการนี้?',
  confirmText = 'ยืนยัน',
  cancelText = 'ยกเลิก',
  children,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  console.log('Modal rendering, isOpen:', isOpen); // Debug log

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      if (isOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  // กำหนด type ให้ iconVariants เป็น Variants
  const iconVariants: Variants = {
    hidden: {
      scale: 0,
      opacity: 0,
      rotate: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      rotate: 360,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.8,
      },
    },
    bounce: {
      scale: [1, 1.2, 1],
      transition: {
        repeat: Infinity,
        repeatType: 'loop' as const, // ระบุให้เป็น literal type
        duration: 1.5,
      },
    },
  };

  return (
    <dialog ref={dialogRef} className="modal z-[9999]!important">
      <div className="modal-box bg-base-100 max-w-[1600px] max-h-[calc(100vh-24rem)] h-full p-[3rem]">
        <div className="flex justify-between flex-col h-full">
          <div className="flex flex-col justify-center items-center">
            {/* เพิ่ม Icon พร้อม Animation ด้วย Framer Motion */}
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate={['visible', 'bounce']}
            >
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-8xl text-primary mb-9"
              />
            </motion.div>
            <h3 className="font-bold text-6xl">{title}</h3>
            {children ? (
              children
            ) : (
              <p className="py-4 text-base-content text-4xl">{message}</p>
            )}
          </div>
          <div className="modal-action">
            <form method="dialog" className="flex justify-between items-center space-x-2 w-full">
              <div className="flex flex-row justify-between w-full h-[100px] max-w-[1100px] mx-auto">
                <button
                  className="btn btn-error text-4xl h-full w-[45%] min-w-[495px]"
                  onClick={onClose}
                >
                  {cancelText}
                </button>
                <button
                  className="btn btn-primary text-4xl h-full w-[45%] min-w-[495px]"
                  onClick={handleConfirm}
                >
                  {confirmText}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};