import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping, onHomeClick, onPlantsClick }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const totalCartQuantity = cart.reduce((total, item) => total + item.quantity, 0);

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const cost = parseFloat(item.cost.substring(1));
      return total + cost * item.quantity;
    }, 0);
  };

  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return (cost * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-page">
      <div className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>
          <h3>Paradise Nursery</h3>
          <p>Where Green Meets Serenity</p>
        </div>
        <div className="navbar-links">
          <span onClick={onHomeClick}>Home</span>
          <span onClick={onPlantsClick}>Plants</span>
          <div className="cart-icon">
            🛒
            {totalCartQuantity > 0 && (
              <span className="cart-count">{totalCartQuantity}</span>
            )}
          </div>
        </div>
      </div>

      <div className="cart-container">
        <h2 className="cart-total">Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>

        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.name} className="cart-item-card">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-cost">{item.cost}</p>
                  <div className="cart-item-quantity">
                    <button className="quantity-btn" onClick={() => handleDecrement(item)}>-</button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button className="quantity-btn" onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <p className="cart-item-subtotal">Total: ${calculateTotalCost(item)}</p>
                  <button className="delete-btn" onClick={() => handleRemove(item)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cart-actions">
          <button className="continue-shopping-btn" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
          <button className="checkout-btn" onClick={handleCheckoutShopping}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
