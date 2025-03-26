// src/contexts/AlertContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Alert } from '../components/ui/Alert';

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

interface AlertOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  icon?: IconDefinition;
  autoClose?: number;
  onConfirm?: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alertOptions, setAlertOptions] = useState<AlertOptions | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const showAlert = (options: AlertOptions) => {
    setAlertOptions(options);
    setIsOpen(true);
  };

  const hideAlert = () => {
    setIsOpen(false);
    setAlertOptions(null); // รีเซ็ต alertOptions
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <Alert
        isOpen={isOpen}
        onClose={hideAlert}
        onConfirm={alertOptions?.onConfirm || hideAlert}
        title={alertOptions?.title}
        message={alertOptions?.message}
        confirmText={alertOptions?.confirmText}
        cancelText={alertOptions?.cancelText}
        type={alertOptions?.type}
        icon={alertOptions?.icon}
        autoClose={alertOptions?.autoClose}
      />
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert ต้องใช้ภายใน AlertProvider');
  }
  return context;
};