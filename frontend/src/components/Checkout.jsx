import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, CheckCircle } from 'lucide-react';

const Checkout = ({ cart, totalPrice, onBack, onOrderComplete }) => {
  const [step, setStep] = useState(1);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order processing
    setTimeout(() => {
      setOrderComplete(true);
      onOrderComplete();
    }, 2000);
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  if (orderComplete) {
    return (
      <div className="checkout-container">
        <div className="order-success">
          <CheckCircle size={64} className="success-icon" />
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase. Your order has been successfully placed.</p>
          <p className="order-number">Order #HW{Date.now().toString().slice(-6)}</p>
          <button onClick={onBack} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <button onClick={onBack} className="back-button">
          <ArrowLeft size={20} />
          Back to Cart
        </button>
        <h1>Checkout</h1>
      </div>

      <div className="checkout-content">
        <div className="checkout-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <span>Shipping</span>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span>Payment</span>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <span>Confirm</span>
          </div>
        </div>

        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            {step === 1 && (
              <div className="form-step">
                <h2>
                  <Truck size={24} />
                  Shipping Information
                </h2>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>ZIP Code</label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <button type="button" onClick={nextStep} className="next-btn">
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="form-step">
                <h2>
                  <CreditCard size={24} />
                  Payment Information
                </h2>

                <div className="form-group">
                  <label>Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={prevStep} className="back-btn">
                    Back
                  </button>
                  <button type="button" onClick={nextStep} className="next-btn">
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="form-step">
                <h2>Order Review</h2>
                
                <div className="order-summary">
                  <h3>Order Items ({cart.length})</h3>
                  <div className="order-items">
                    {cart.map((item) => (
                      <div key={item.cartId} className="order-item">
                        <img src={item.image_url} alt={item.name} />
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p>{item.series}</p>
                        </div>
                        <span className="item-price">${item.price}</span>
                      </div>
                    ))}
                  </div>

                  <div className="order-totals">
                    <div className="total-row">
                      <span>Subtotal:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="total-row">
                      <span>Shipping:</span>
                      <span>$5.99</span>
                    </div>
                    <div className="total-row">
                      <span>Tax:</span>
                      <span>${(totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="total-row grand-total">
                      <span>Total:</span>
                      <span>${(totalPrice + 5.99 + (totalPrice * 0.08)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" onClick={prevStep} className="back-btn">
                    Back
                  </button>
                  <button type="submit" className="place-order-btn">
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div className="order-summary-sidebar">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.cartId} className="summary-item">
                <img src={item.image_url} alt={item.name} />
                <div className="summary-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">${item.price}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total: ${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;