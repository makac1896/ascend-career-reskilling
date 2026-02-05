import React, { useEffect } from 'react';
import { CheckCircle2, Info, Loader2, X } from 'lucide-react';

export interface ToastProps {
  message: string;
  type: 'success' | 'info' | 'loading';
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible && type !== 'loading') {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, type, onClose]);

  if (!isVisible) return null;

  const styles = {
    success: 'bg-white border-green-100 text-green-800 shadow-glow',
    info: 'bg-white border-blue-100 text-ascend-text shadow-crisp',
    loading: 'bg-ascend-text text-white shadow-lg'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    info: <Info className="w-5 h-5 text-ascend-blue" />,
    loading: <Loader2 className="w-5 h-5 animate-spin text-white" />
  };

  return (
    <div className={`fixed bottom-8 right-8 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300 animate-in slide-in-from-bottom-5 ${styles[type]}`}>
      <div className="shrink-0">{icons[type]}</div>
      <span className="font-bold text-sm">{message}</span>
      {type !== 'loading' && (
        <button onClick={onClose} className="ml-4 hover:opacity-50 transition-opacity">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Toast;