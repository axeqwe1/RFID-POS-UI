// src/components/ui/Modal.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  direction?: 'left' | 'right'; // เพิ่ม prop เพื่อเลือกทิศทางการสไลด์
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  direction = 'right', // ค่าเริ่มต้นสไลด์จากขวา
}) => {
  const variants = {
    initial: {
      x: direction === 'right' ? '100%' : '-100%', // เริ่มจากด้านขวา (หรือซ้ายถ้าเลือก left)
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: direction === 'right' ? '-100%' : '100%', // ออกไปทางซ้าย (หรือขวาถ้าเลือก left)
      opacity: 0,
    },
  };

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 0.5 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="modal-backdrop"
            onClick={onClose}
          />
          <motion.div
            key="modal"
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="modal modal-open"
          >
            <div className="modal-box">
              {children}
              <div className="modal-action">
                <button className="btn btn-ghost" onClick={onClose}>
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};