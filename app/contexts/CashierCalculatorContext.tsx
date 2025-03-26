// src/contexts/CashierCalculatorContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { CashierCalculatorModal } from '../components/ui/CashierCalculatorModal';

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

  const showCalculator = (
    totalAmount: number,
    onConfirm: (amountReceived: number, change: number) => void
  ) => {
    setCalculatorState({ totalAmount, onConfirm });
    setIsOpen(true);
  };

  const hideCalculator = () => {
    setIsOpen(false);
    setCalculatorState(null);
  };

  return (
    <CashierCalculatorContext.Provider value={{ showCalculator, hideCalculator }}>
      {children}
      {calculatorState && (
        <CashierCalculatorModal
          isOpen={isOpen}
          onClose={hideCalculator}
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