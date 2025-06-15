import { motion, AnimatePresence } from 'framer-motion';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import '../styles/components/DeleteConfirmation.scss';

const DeleteConfirmation = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="delete-overlay"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="delete-modal"
          onClick={e => e.stopPropagation()}
        >
          <div className="modal-icon">
            <ExclamationTriangleIcon />
          </div>
          <h3>Remove Item</h3>
          <p>Are you sure you want to remove {itemName} from your cart?</p>
          <div className="modal-actions">
            <button
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Remove
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DeleteConfirmation; 