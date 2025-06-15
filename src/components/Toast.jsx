import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import '../styles/components/Toast.scss';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`toast ${type}`}
      >
        <div className="toast-content">
          {type === 'success' && <CheckCircleIcon className="icon" />}
          <span>{message}</span>
        </div>
        <button onClick={onClose} className="close-button">
          <XMarkIcon className="icon" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast; 