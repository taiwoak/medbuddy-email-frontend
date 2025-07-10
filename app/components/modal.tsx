'use client';

import { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface ModalProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export default function Modal({ message, type, onClose }: ModalProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4">
      <div className="bg-white border border-gray-200 rounded shadow-lg p-4 flex items-center justify-between">
        <span className={`text-sm ${type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </span>
        <button onClick={onClose} className="ml-4 cursor-pointer">
          <AiOutlineClose className="text-gray-600 hover:text-black text-lg" />
        </button>
      </div>
    </div>
  );
}
