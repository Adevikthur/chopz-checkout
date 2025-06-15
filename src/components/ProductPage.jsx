import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCartIcon, 
  HeartIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import '../styles/components/ProductPage.scss';

const ProductPage = () => {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const product = {
    id: 1,
    name: 'Premium Cotton T-Shirt',
    price: 29.99,
    description: 'Elevate your casual wardrobe with our premium cotton t-shirt. Made from 100% organic cotton, this shirt offers unmatched comfort and style for any occasion.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Navy', 'Gray'],
    rating: 4.8,
    reviews: 128,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600',
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600',
      'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600'
    ],
    features: [
      'Premium organic cotton',
      'Comfortable fit',
      'Breathable fabric',
      'Easy to care for',
      'Durable construction'
    ]
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowToast(true);
      return;
    }
    
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      size: selectedSize,
      image: product.images[0]
    };
    
    setCartItems(prev => [...prev, newItem]);
    setShowToast(true);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="product-page">
      
      <div className="product-container">
        <div className="product-gallery">
          <div className="main-image">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              src={product.images[selectedImage]}
              alt={product.name}
            />
            <button
              className={`favorite-button ${isFavorite ? 'active' : ''}`}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? (
                <HeartIconSolid className="icon" />
              ) : (
                <HeartIcon className="icon" />
              )}
            </button>
          </div>
          <div className="thumbnail-list">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${product.name} view ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-details">
          <h1>{product.name}</h1>
          
          <div className="product-meta">
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}
                />
              ))}
              <span>{product.rating}</span>
              <span className="reviews">({product.reviews} reviews)</span>
            </div>
            <div className="price">${product.price}</div>
          </div>

          <p className="description">{product.description}</p>

          <div className="features">
            <h3>Key Features</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="options">
            <div className="size-selection">
              <label>Select Size</label>
              <div className="size-buttons">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-button ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="quantity-selection">
              <label>Quantity</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="add-to-cart"
            onClick={handleAddToCart}
          >
            <ShoppingCartIcon className="icon" />
            Add to Cart
          </button>
          {cartItems.length > 0 && (
        <div className="cart-checkout">
          {/* <div className="cart-icon" onClick={handleCheckout}>
            <ShoppingCartIcon className="icon" />
            <span className="cart-count">{cartItems.length}</span>
          </div> */}
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}

          <div className="benefits">
            <div className="benefit">
              <TruckIcon className="icon" />
              <div>
                <h4>Free Shipping</h4>
                <p>On orders over $50</p>
              </div>
            </div>
            <div className="benefit">
              <ShieldCheckIcon className="icon" />
              <div>
                <h4>Secure Payment</h4>
                <p>100% secure checkout</p>
              </div>
            </div>
            <div className="benefit">
              <ArrowPathIcon className="icon" />
              <div>
                <h4>Easy Returns</h4>
                <p>30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      

      {showToast && (
        <Toast
          message={selectedSize ? "Added to cart!" : "Please select a size"}
          type={selectedSize ? "success" : "error"}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default ProductPage; 