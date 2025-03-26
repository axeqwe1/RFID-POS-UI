// src/components/ui/LoadingThreeDotsJumping.tsx
'use client';

import { motion, Variants } from 'framer-motion';

interface LoadingThreeDotsJumpingProps {
  isLoading?: boolean; // เพิ่ม prop เพื่อควบคุมการแสดง
}

export default function LoadingThreeDotsJumping({ isLoading = true }: LoadingThreeDotsJumpingProps) {
  // ถ้าไม่โหลด ให้ return null
  if (!isLoading) return null;

  // Animation สำหรับจุด
  const dotVariants: Variants = {
    jump: {
      y: -30,
      transition: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      },
    },
  };

  // Animation สำหรับ Backdrop
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <div
      className="fixed top-0 inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center"
    //   role="status"
    //   aria-label="กำลังโหลด"
    >
      <motion.div
        className="flex justify-center items-center gap-3"
        animate="jump"
        transition={{ staggerChildren: 0.2, staggerDirection: 1 }}
      >
        <motion.div className="w-5 h-5 rounded-full bg-pink-500" variants={dotVariants} />
        <motion.div className="w-5 h-5 rounded-full bg-pink-500" variants={dotVariants} />
        <motion.div className="w-5 h-5 rounded-full bg-pink-500" variants={dotVariants} />
      </motion.div>
    </div>
  );
}