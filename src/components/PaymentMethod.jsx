import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CreditCardIcon, 
  BanknotesIcon, 
  QrCodeIcon 
} from '@heroicons/react/24/outline';

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit Card',
    icon: CreditCardIcon,
    description: 'Pay securely with your credit card'
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    icon: BanknotesIcon,
    description: 'Direct bank transfer'
  },
  {
    id: 'wallet',
    name: 'Digital Wallet',
    icon: QrCodeIcon,
    description: 'Pay with your digital wallet'
  }
];

const PaymentMethod = ({ onNext, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedMethod) {
      setError('Please select a payment method');
      return;
    }
    onNext(selectedMethod);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h2>Select Payment Method</h2>
      <form onSubmit={handleSubmit}>
        <div className="payment-methods">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`payment-method ${selectedMethod === method.id ? 'selected' : ''}`}
              onClick={() => {
                setSelectedMethod(method.id);
                setError('');
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedMethod(method.id);
                  setError('');
                }
              }}
            >
              <method.icon className="w-8 h-8 mb-2" />
              <h3>{method.name}</h3>
              <p className="text-sm text-gray-600">{method.description}</p>
            </div>
          ))}
        </div>

        {error && (
          <div className="text-error-color text-center mb-4">
            {error}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onBack}
            className="btn btn-secondary"
          >
            Back to Delivery
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Continue to Confirmation
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PaymentMethod; 