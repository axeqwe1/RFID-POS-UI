// src/contexts/CashierCalculatorContext.tsx
'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CashierCalculatorModal } from '../components/ui/CashierCalculatorModal';
import { usePathname } from 'next/navigation';

interface CashierCalculatorContextType {
  showCalculator: (totalAmount: number, onConfirm: (amountReceived: number, change: number) => void) => void;
  hideCalculator: () => void;
}

interface CalculatorState {
  totalAmount: number;
  onConfirm: (amountReceived: number, change: number) => void;
}

const CashierCalculatorContext = createContext<CashierCalculatorContextType | undefined>(undefined);

export const CashierCalculatorProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [calculatorState, setCalculatorState] = useState<CalculatorState | null>(null);
  const pathname = usePathname(); // ใช้ usePathname เพื่อตรวจสอบการเปลี่ยนหน้า

  // รีเซ็ต state เมื่อเปลี่ยนหน้า
  useEffect(() => {
    console.log(`Pathname changed to: ${pathname}`);
    if (pathname === '/PaymentScreen') {
      // ถ้ากลับมาที่ /PaymentScreen ให้รีเซ็ต state
      setIsOpen(false);
      setCalculatorState(null);
    }
  }, [pathname]);

  const showCalculator = (
    totalAmount: number,
    onConfirm: (amountReceived: number, change: number) => void
  ) => {
    console.log('showCalculator called with:', { totalAmount, onConfirm });
    setCalculatorState({ totalAmount, onConfirm });
    setIsOpen(true);
    console.log('After setting state:', { isOpen: true, calculatorState: { totalAmount, onConfirm } });
  };

  const hideCalculator = () => {
    console.log('hideCalculator called');
    setIsOpen(false);
    // ไม่ล้าง calculatorState ทันที รอให้ Modal ปิดสนิท
  };

  const handleModalClose = () => {
    console.log('handleModalClose called');
    setCalculatorState(null); // ล้าง calculatorState หลังจาก Modal ปิดสนิท
    setIsOpen(false);
  };

  return (
    <CashierCalculatorContext.Provider value={{ showCalculator, hideCalculator }}>
      {children}
      {isOpen && calculatorState && (
        <CashierCalculatorModal
          isOpen={isOpen}
          onClose={handleModalClose}
          totalAmount={calculatorState.totalAmount}
          onConfirm={calculatorState.onConfirm}
        />
      )}
    </CashierCalculatorContext.Provider>
  );
};

export const useCashierCalculator = () => {
  const context = useContext(CashierCalculatorContext);
  if (!context) {
    throw new Error('useCashierCalculator ต้องใช้ภายใน CashierCalculatorProvider');
  }
  return context;
};