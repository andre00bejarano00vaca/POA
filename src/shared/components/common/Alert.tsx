// src/components/common/Alert.tsx
import React, { useEffect } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon 
} from '@heroicons/react/24/outline';
import Button from './Button';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
  isOpen: boolean;
  onClose: () => void;
  autoClose?: number;
}

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  cancelText,
  isOpen,
  onClose,
  autoClose,
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoClose);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  const typeConfig = {
    success: {
      icon: CheckCircleIcon,
      iconColor: 'text-green-600',
      iconBg: 'bg-green-100',
      buttonVariant: 'success' as const,
    },
    error: {
      icon: XCircleIcon,
      iconColor: 'text-red-600',
      iconBg: 'bg-red-100',
      buttonVariant: 'danger' as const,
    },
    warning: {
      icon: ExclamationTriangleIcon,
      iconColor: 'text-yellow-600',
      iconBg: 'bg-yellow-100',
      buttonVariant: 'warning' as const,
    },
    info: {
      icon: InformationCircleIcon,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      buttonVariant: 'primary' as const,
    },
  };

  const config = typeConfig[type];
  const IconComponent = config.icon;

  const hasButtons = confirmText || cancelText;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-gray-900/30 transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />
      
      {/* Alert Dialog */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all w-full max-w-md">
          {/* Content - Todo centrado */}
          <div className="p-8 text-center">
            {/* Icon centrado */}
            <div className="flex justify-center mb-4">
              <div className={`${config.iconBg} rounded-full p-3`}>
                <IconComponent className={`w-10 h-10 ${config.iconColor}`} />
              </div>
            </div>
            
            {/* Text centrado */}
            <div>
              {title && (
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {title}
                </h3>
              )}
              <p className="text-sm text-gray-600 leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          {/* Buttons centrados */}
          {hasButtons && (
            <div className="bg-gray-50 px-8 py-5 flex flex-col-reverse sm:flex-row sm:justify-center gap-4">
              {onCancel && cancelText && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    onCancel();
                    onClose();
                  }}
                >
                  {cancelText}
                </Button>
              )}
              {confirmText && (
                <Button
                  variant={config.buttonVariant}
                  onClick={() => {
                    if (onConfirm) onConfirm();
                    onClose();
                  }}
                >
                  {confirmText}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Alert;