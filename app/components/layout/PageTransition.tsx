// src/components/layout/PageTransition.tsx
'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import HomePage from '@/app/page';
import SelectMemberPage from '@/app/selectmember/page';
import RFIDScanScreen from '@/app/RFIDScanScreen/page';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState(pathname);
  const [isAnimating, setIsAnimating] = useState(false);

const pages: { [key: string]: ReactNode } = {
  '/': <HomePage />,
  '/selectmember': <SelectMemberPage />,
  '/RFIDScanScreen': <RFIDScanScreen />
};

  const [displayedPage, setDisplayedPage] = useState<ReactNode>(pages[pathname] || children);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const simulateLoading = async () => {
    try {
      // จำลองการโหลด
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      setHasError(true);
      throw error;
    }
  };
  const waitForAnimation = () =>
    new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, 200); // รอ 300ms (เท่ากับ duration ของ transition)
    });
    
  const handlePageChange = async (newPathname: string) => {
    if (currentPath !== newPathname) {
      setIsAnimating(true);
      setCurrentPath(newPathname);

      // รอ Animation เสร็จ
      await waitForAnimation();

      console.log('Animation complete, updating page to:', newPathname);
      setDisplayedPage(pages[newPathname] || children);
      setIsAnimating(false);
    }
  };

  useEffect(() => {
    console.log('Pathname:', pathname);
    console.log('Current Path:', currentPath);

    if (pathname !== currentPath) {
      handlePageChange(pathname);
    }
  }, [pathname]);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (pathname === '/' && !isAnimating) {
        console.log('Swiped left, going to /pages/about');
        setIsAnimating(true);
        router.push('/pages/about');
      }
    },
    onSwipedRight: () => {
      if (pathname === '/pages/about' && !isAnimating) {
        console.log('Swiped right, going back');
        setIsAnimating(true);
        router.back();
      }
    },
    delta: 50,
  });

  const variants = {
    initial: { scale: 0.95, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.95, opacity: 0 },
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        // {...handlers}
        key={currentPath}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="w-full h-full"
      >
        {displayedPage}
      </motion.div>
    </AnimatePresence>
  );
};