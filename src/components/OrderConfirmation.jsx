import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const OrderConfirmation = ({ orderData }) => {
  const { deliveryInfo, paymentMethod } = orderData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center"
    >
      <div className="mb-8">
        <CheckCircleIcon className="w-20 h-20 text-success-color mx-auto mb-4" />
        <h2>Order Confirmed!</h2>
        <p className="text-gray-600">
          Thank you for your purchase. Your order has been confirmed.
        </p>
      </div>

      <div className="bg-background-color rounded-lg p-6 mb-6 text-left">
        <h3 className="mb-4">Order Details</h3>
        
        <div className="mb-4">
          <h4 className="text-gray-600">Delivery Address</h4>
          <p>{deliveryInfo.fullName}</p>
          <p>{deliveryInfo.address}</p>
          <p>{`${deliveryInfo.city}, ${deliveryInfo.state} ${deliveryInfo.zipCode}`}</p>
        </div>

        <div className="mb-4">
          <h4 className="text-gray-600">Contact Information</h4>
          <p>Email: {deliveryInfo.email}</p>
          <p>Phone: {deliveryInfo.phone}</p>
        </div>

        <div>
          <h4 className="text-gray-600">Payment Method</h4>
          <p>{paymentMethod === 'card' ? 'Credit Card' : 
             paymentMethod === 'bank' ? 'Bank Transfer' : 
             'Digital Wallet'}</p>
        </div>
      </div>

      <div className="text-center">
        <p className="mb-4">
          We'll send you a confirmation email with your order details and tracking information.
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="btn btn-primary"
        >
          Continue Shopping
        </button>
      </div>
    </motion.div>
  );
};

export default OrderConfirmation; 