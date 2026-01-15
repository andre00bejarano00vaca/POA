// src/hooks/useAlert.tsx
import { useState, useCallback } from 'react';

interface AlertOptions {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const useAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertOptions>({
    type: 'info',
    message: '',
  });
  const [onConfirmCallback, setOnConfirmCallback] = useState<(() => void) | undefined>();
  const [onCancelCallback, setOnCancelCallback] = useState<(() => void) | undefined>();

  const showAlert = useCallback(
    (options: AlertOptions, onConfirm?: () => void, onCancel?: () => void) => {
      setAlertConfig(options);
      setOnConfirmCallback(() => onConfirm);
      setOnCancelCallback(() => onCancel);
      setIsOpen(true);
    },
    []
  );

  const hideAlert = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    alertConfig,
    showAlert,
    hideAlert,
    onConfirmCallback,
    onCancelCallback,
  };
};