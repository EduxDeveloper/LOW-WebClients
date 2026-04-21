import { useState } from 'react';
import { Banknote, CreditCard } from 'lucide-react';
import './Payment.css';

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('efectivo');

  // Hardcoded items based on mockup
  const items = [
    { id: 1, title: 'Elixir Spider Tribal Zip-Up', variant: '(negro || XL)', price: 109.00 },
    { id: 2, title: 'Elixir Baggy Jeans', variant: '(negro || XL)', price: 70.00 }
  ];

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
            {items.map(item => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-info">
                  <span className="summary-item-name">{item.title}</span>
                  <span className="summary-item-variant">{item.variant}</span>
                </div>
                <span className="summary-item-price">${item.price.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="summary-divider" />

          <div className="summary-row">
            <span className="summary-label">Subtotal</span>
            <span className="summary-value">$179.00</span>
          </div>
          
          <div className="summary-row">
            <span className="summary-label">Envio</span>
            <span className="summary-value">Gratis</span>
          </div>

          <hr className="summary-divider" />

          <div className="summary-row total-row">
            <span className="summary-label">Total</span>
            <span className="summary-value">$179.00</span>
          </div>

          <button className="proceed-payment-btn">Proceder al pago</button>
        </div>

      </div>
    </div>
  );
};

export default Payment;
