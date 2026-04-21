import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DEFAULT_IMAGE } from '../utils/constants';
import { PrimaryButton, SecondaryButton } from '../components/Buttons/Buttons';
import './ProductDetail.css';

const sizes = ['S', 'M', 'L', 'XL', '2X'];

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  
  const productPrice = 109.00; // Mocked for now

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div className="product-detail-overlay">
      <div className="product-detail-container">
        
        <div className="product-detail-content">
          <div className="product-image-section">
            <img src={DEFAULT_IMAGE} alt="Product" className="detail-image" />
          </div>

          <div className="product-info-section">
            <h1 className="detail-title">Elixir Spider Tribal Zip-Up</h1>
            <hr className="detail-divider" />
            
            <h3 className="detail-subtitle">Descripción</h3>
            <p className="detail-description">
              Chaqueta casual marca Unexpected, exclusiva de LOW. Con diseño sólido color negro.
            </p>

            <div className="detail-sizes">
              {sizes.map(size => (
                <button 
                  key={size}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="detail-price-row">
              <span className="detail-price">${productPrice.toFixed(2)}</span>
              
              <div className="quantity-selector">
                <button onClick={decreaseQuantity}>−</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
            </div>

            <hr className="detail-divider" />

            <div className="detail-actions">
              <SecondaryButton className="add-to-cart-btn">
                Añadir al carrito
              </SecondaryButton>
              
              <PrimaryButton className="checkout-btn">
                <span>Finalizar Compra</span>
                <span className="dot-separator">•</span>
                <span>${(productPrice * quantity).toFixed(2)}</span>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
