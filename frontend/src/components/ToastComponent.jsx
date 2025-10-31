import React from 'react';
import { useToast } from '../context/ToastContext';

const Toast = () => {
  const { toast, hideToast } = useToast();

  if (!toast) return null;

  const { message, type } = toast;

  // Set styles based on toast type
  const baseClasses = 'fixed top-5 right-5 z-50 p-4 rounded-md shadow-lg flex items-center justify-between transition-all duration-300';
  const typeClasses = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    info: 'bg-blue-500 text-white',
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type] || typeClasses.info}`}>
      <span>{message}</span>
      <button onClick={hideToast} className="ml-4 font-bold text-lg leading-none">&times;</button>
    </div>
  );
};

export default Toast;
