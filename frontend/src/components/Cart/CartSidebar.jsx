import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useContext(CartContext);

  if (!isOpen) return null;

  return (
    <>
      {/* Background overlay */}
      <div className="cart-overlay" onClick={onClose}></div>
      
      {/* Sidebar Panel */}
      <div className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        
        <div className="cart-header">
          <h2 className="cart-title">CARRITO</h2>
          <button className="cart-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <hr className="cart-divider" />

        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <p className="cart-empty-msg" style={{textAlign: "center", marginTop: "2rem"}}>Tu carrito está vacío.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={`${item.product._id}-${item.size}-${index}`} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.product.images && item.product.images.length > 0 ? item.product.images[0].image : ''} alt={item.product.name} />
                </div>
                <div className="cart-item-details">
                  <h4 className="cart-item-title">{item.product.name}</h4>
                  <p className="cart-item-price">${item.product.price.toFixed(2)}</p>
                  
                  <div className="cart-item-controls">
                    <span className="cart-item-size">{item.size}</span>
                    <div className="cart-quantity-selector">
                      <button onClick={() => updateQuantity(item.product._id, item.size, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product._id, item.size, item.quantity + 1)}>+</button>
                    </div>
                    <button className="cart-item-remove" onClick={() => removeFromCart(item.product._id, item.size)}>Quitar</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <hr className="cart-divider" />
          <p className="cart-note">
            Nota! Los cobros de envío se calculan en la pantalla de pago
          </p>
          <Link to="/checkout" className="cart-checkout-btn" onClick={onClose}>
            <span>Finalizar Compra</span>
            <span className="cart-checkout-dot">•</span>
            <span>${cartTotal.toFixed(2)}</span>
          </Link>
        </div>

      </div>
    </>
  );
};

export default CartSidebar;
