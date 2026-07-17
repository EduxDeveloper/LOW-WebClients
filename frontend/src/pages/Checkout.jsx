import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal, updateQuantity, removeFromCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      Swal.fire({
        title: '¡Atención!',
        text: 'Inicia sesión para finalizar tu compra.',
        icon: 'warning',
        confirmButtonText: 'Ir a Login',
        confirmButtonColor: '#111'
      }).then(() => {
        navigate('/login');
      });
    }
  }, [user, navigate]);

  return (
    <div className="page-container checkout-page">
      <div className="checkout-content">

        {/* Left Column: Items */}
        <div className="checkout-items-column">
          {cartItems.length === 0 ? (
            <p>No tienes productos en tu carrito.</p>
          ) : (
            cartItems.map((item, index) => (
              <div key={`${item.product._id}-${item.size}-${index}`} className="checkout-item-card">
                <div className="checkout-item-image">
                  <img src={item.product.images && item.product.images.length > 0 ? item.product.images[0].image : ''} alt={item.product.name} />
                </div>
                <div className="checkout-item-details">
                  <h2 className="checkout-item-title">{item.product.name}</h2>
                  <p className="checkout-item-variant">Talla {item.size}</p>
                  <p className="checkout-item-price">${item.product.price.toFixed(2)}</p>

                  <div className="checkout-quantity">
                    <button onClick={() => updateQuantity(item.product._id, item.size, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product._id, item.size, item.quantity + 1)}>+</button>
                  </div>
                  <button className="cart-item-remove" style={{marginTop: '10px', background: 'transparent', border: '1px solid #ccc', padding: '5px', cursor: 'pointer'}} onClick={() => removeFromCart(item.product._id, item.size)}>Quitar</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Summary */}
        <div className="checkout-summary-column">
          <h2 className="summary-title">Resumen del pedido</h2>

          <div className="summary-row">
            <span className="summary-label">Subtotal</span>
            <span className="summary-value">${cartTotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span className="summary-label">Envío</span>
            <span className="summary-value">Gratis</span>
          </div>

          <hr className="summary-divider" />

          <div className="summary-row total-row">
            <span className="summary-label">Total</span>
            <span className="summary-value">${cartTotal.toFixed(2)}</span>
          </div>

          {cartItems.length > 0 && (
            <Link to="/pago" className="proceed-btn" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>Proceder al pago</Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default Checkout;
