import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import './styles/main.scss'

import ProductPage from './components/ProductPage'
import Stepper from './components/Stepper'
import CartSummary from './components/CartSummary'
import DeliveryForm from './components/DeliveryForm'
import PaymentMethod from './components/PaymentMethod'
import OrderConfirmation from './components/OrderConfirmation'

function CheckoutFlow() {
  const [currentStep, setCurrentStep] = useState(1)
  const [orderData, setOrderData] = useState({
    deliveryInfo: null,
    paymentMethod: null
  })

  const handleDeliverySubmit = (deliveryInfo) => {
    setOrderData(prev => ({ ...prev, deliveryInfo }))
    setCurrentStep(3)
  }

  const handlePaymentSubmit = (paymentMethod) => {
    setOrderData(prev => ({ ...prev, paymentMethod }))
    setCurrentStep(4)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CartSummary onNext={() => setCurrentStep(2)} />
      case 2:
        return (
          <DeliveryForm
            onNext={handleDeliverySubmit}
            onBack={() => setCurrentStep(1)}
          />
        )
      case 3:
        return (
          <PaymentMethod
            onNext={handlePaymentSubmit}
            onBack={() => setCurrentStep(2)}
          />
        )
      case 4:
        return <OrderConfirmation orderData={orderData} />
      default:
        return null
    }
  }

  return (
    <div className="container">
      <div className="checkout-container">
        <h1 className="text-center mb-8">Chopz Checkout</h1>
        <Stepper currentStep={currentStep} />
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>
      </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/checkout" element={<CheckoutFlow />} />
      </Routes>
    </Router>
  )
}

export default App
