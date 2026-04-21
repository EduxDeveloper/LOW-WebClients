import { DEFAULT_IMAGE } from '../utils/constants';
import './Checkout.css';

const Checkout = () => {
  const items = [
    {
      id: 1,
      title: "Elixir Spider Tribal Zip-Up",
      color: "Negro",
      size: "XL",
      price: 109.00,
      qty: 1
    },
    {
      id: 2,
      title: "Elixir Baggy Jeans",
      color: "Negro",
      size: "XL",
      price: 70.00,
      qty: 1
    }
  ];

  return (
    <div className="page-container checkout-page">
      <div className="checkout-content">
        
        {/* Left Column: Items */}
        <div className="checkout-items-column">
          {items.map(item => (
            <div key={item.id} className="checkout-item-card">
              <div className="checkout-item-image">
                <img src={DEFAULT_IMAGE} alt={item.title} />
              </div>
              <div className="checkout-item-details">
                <h2 className="checkout-item-title">{item.title}</h2>
                <p className="checkout-item-variant">Color: {item.color} || Talla {item.size}</p>
                <p className="checkout-item-price">${item.price.toFixed(2)}</p>
                
                <div className="checkout-quantity">
                  <button>−</button>
                  <span>{item.qty}</span>
                  <button>+</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Summary */}
        <div className="checkout-summary-column">
          <h2 className="summary-title">Resumen del pedido</h2>
          
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

          <button className="proceed-btn">Proceder al pago</button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
