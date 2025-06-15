import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrashIcon } from '@heroicons/react/24/outline';
import DeleteConfirmation from './DeleteConfirmation';
import Toast from './Toast';
import '../styles/components/CartSummary.scss';

const CartSummary = ({ onNext }) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Premium T-Shirt',
      price: 29.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300'
    },
    {
      id: 2,
      name: 'Designer Jeans',
      price: 89.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=300'
    },
    {
      id: 3,
      name: 'Casual Sneakers',
      price: 59.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300'
    }
  ]);

  const [deleteItem, setDeleteItem] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 4.99;
  const total = subtotal + shipping;

  const handleDelete = (item) => {
    setDeleteItem(item);
  };

  const confirmDelete = () => {
    setCartItems(prev => prev.filter(item => item.id !== deleteItem.id));
    setShowToast(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="cart-summary"
    >
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="btn-back" onClick={() => window.history.back()}>
          Back to Shopping
        </button>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p className="item-price">${item.price.toFixed(2)}</p>
              <div className="item-quantity">
                <label>Quantity:</label>
                <select 
                  value={item.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value);
                    setCartItems(prev => prev.map(i => 
                      i.id === item.id ? { ...i, quantity: newQuantity } : i
                    ));
                  }}
                >
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="item-total">
              <p>${(item.price * item.quantity).toFixed(2)}</p>
              <button 
                className="delete-button"
                onClick={() => handleDelete(item)}
              >
                <TrashIcon className="icon" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary-totals">
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="summary-row total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button 
        className="btn-primary checkout-button"
        onClick={onNext}
        disabled={cartItems.length === 0}
      >
        Proceed to Delivery
      </button>

      <DeleteConfirmation
        isOpen={deleteItem !== null}
        onClose={() => setDeleteItem(null)}
        onConfirm={confirmDelete}
        itemName={deleteItem?.name}
      />

      {showToast && (
        <Toast
          message="Item removed from cart"
          onClose={() => setShowToast(false)}
        />
      )}
    </motion.div>
  );
};

export default CartSummary; 