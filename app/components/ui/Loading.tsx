// src/components/ui/LoadingThreeDotsJumping.tsx
'use client';

import { motion, Variants } from 'framer-motion';

interface LoadingThreeDotsJumpingProps {
  isLoading?: boolean;
}

export default function LoadingThreeDotsJumping({ isLoading = true }: LoadingThreeDotsJumpingProps) {
    console.log("from loading")
    console.log(isLoading)
  if (!isLoading) return null;
 
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

  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black bg-opacity-50 flex items-center justify-center"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role="status"
      aria-label="กำลังโหลด"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className="flex justify-center items-center gap-3"
          animate="jump"
          transition={{ staggerChildren: 0.2, staggerDirection: 1 }}
        >
          <motion.div className="w-5 h-5 rounded-full bg-primary" variants={dotVariants} />
          <motion.div className="w-5 h-5 rounded-full bg-primary" variants={dotVariants} />
          <motion.div className="w-5 h-5 rounded-full bg-primary" variants={dotVariants} />
        </motion.div>
        <p className="text-white text-2xl">กำลังโหลด...</p>
      </div>
    </motion.div>
  );
}