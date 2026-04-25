import { Link } from 'react-router-dom';
import prendaImg from '../../images/ROPA (6).png';
import './CartSidebar.css';

const CartSidebar = ({ isOpen, onClose }) => {
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
          {/* Example Item */}
          <div className="cart-item">
            <div className="cart-item-image">
              <img src={prendaImg} alt="Elixir Spider" />
            </div>
            <div className="cart-item-details">
              <h4 className="cart-item-title">Elixir Spider Tribal Zip-Up</h4>
              <p className="cart-item-price">$109.00</p>
              
              <div className="cart-item-controls">
                <span className="cart-item-size">S</span>
                <div className="cart-quantity-selector">
                  <button>−</button>
                  <span>1</span>
                  <button>+</button>
                </div>
                <button className="cart-item-remove">Quitar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="cart-footer">
          <hr className="cart-divider" />
          <p className="cart-note">
            Nota! Los cobros de envío se calculan en la pantalla de pago
          </p>
          <Link to="/checkout" className="cart-checkout-btn" onClick={onClose}>
            <span>Finalizar Compra</span>
            <span className="cart-checkout-dot">•</span>
            <span>$109.00</span>
          </Link>
        </div>

      </div>
    </>
  );
};

export default CartSidebar;
