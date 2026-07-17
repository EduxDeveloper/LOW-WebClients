import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Banknote, CreditCard } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import './Payment.css';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('efectivo');
  const [loading, setLoading] = useState(false);
  
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!user) {
      Swal.fire('Error', 'Debes iniciar sesión para realizar la compra.', 'error');
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      Swal.fire('Error', 'Tu carrito está vacío.', 'error');
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        client: user._id,
        items: cartItems.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          unitPrice: item.product.price,
          size: item.size
        })),
        total: cartTotal
      };

      const response = await fetch('http://localhost:4000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        clearCart();
        Swal.fire('¡Compra exitosa!', 'Tu pedido ha sido procesado.', 'success').then(() => {
          navigate('/mis-pedidos');
        });
      } else {
        const errorData = await response.json();
        Swal.fire('Error', errorData.message || 'Hubo un error al procesar el pedido.', 'error');
      }
    } catch (error) {
      Swal.fire('Error de red', 'No se pudo conectar con el servidor.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container payment-page">
      <div className="payment-content">
        
        {/* Left Column: Forms */}
        <div className="payment-left-col">
          <h1 className="payment-title">Checkout</h1>
          
          <h2 className="payment-section-title">Información de Entrega</h2>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Direccion</label>
              <input type="text" placeholder="Calle y numero de casa" className="form-input" />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>Ciudad</label>
                <input type="text" placeholder="Ciudad" className="form-input" />
              </div>
              <div className="form-group">
                <label>Codigo Postal</label>
                <input type="text" placeholder="00000" className="form-input" />
              </div>
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input type="tel" placeholder="(503) 1234-1234" className="form-input" />
            </div>
          </div>

          <h2 className="payment-section-title">Método de Pago</h2>
          
          <div className="payment-methods">
            {/* Efectivo */}
            <div 
              className={`payment-method-box ${paymentMethod === 'efectivo' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('efectivo')}
            >
              <div className="payment-method-left">
                <div className="radio-circle"></div>
                <span>Efectivo al momento de entrega</span>
              </div>
              <span className="payment-icon"><Banknote size={24} /></span>
            </div>

            {/* Tarjeta */}
            <div 
              className={`payment-method-box ${paymentMethod === 'tarjeta' ? 'active' : ''}`}
              onClick={() => setPaymentMethod('tarjeta')}
            >
              <div className="payment-method-left">
                <div className="radio-circle"></div>
                <span>Tarjeta de Crédito o Débito</span>
              </div>
              <span className="payment-icon"><CreditCard size={24} /></span>
            </div>

            {/* CC Form shown only if Tarjeta is selected */}
            {paymentMethod === 'tarjeta' && (
              <div className="cc-form">
                <div className="form-group">
                  <label>Número de Tarjeta</label>
                  <input type="text" className="form-input" />
                </div>
                
                <div className="form-group">
                  <label>Nombre en la Tarjeta</label>
                  <input type="text" placeholder="NOMBRE APELLIDO" className="form-input" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Vencimiento</label>
                    <input type="text" placeholder="MM/AA" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="123" className="form-input" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="payment-summary-col">
          <h2 className="summary-title">Resumen del pedido</h2>
          
          <div className="summary-items-list">
            {cartItems.map((item, idx) => (
              <div key={`${item.product._id}-${idx}`} className="summary-item">
                <div className="summary-item-info">
                  <span className="summary-item-name">{item.product.name} (x{item.quantity})</span>
                  <span className="summary-item-variant">Talla: {item.size}</span>
                </div>
                <span className="summary-item-price">${(item.product.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="summary-divider" />

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

          <button className="proceed-payment-btn" onClick={handlePayment} disabled={loading}>
            {loading ? 'Procesando...' : 'Realizar Pago'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default Payment;
