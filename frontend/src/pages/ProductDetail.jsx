import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PrimaryButton, SecondaryButton } from '../components/Buttons/Buttons';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2';
import './ProductDetail.css';

const sizes = ['S', 'M', 'L', 'XL', '2X'];

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          // If product not found, return to store
          navigate('/tienda');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize);
      Swal.fire({
        title: '¡Añadido!',
        text: 'El producto se ha añadido a tu carrito.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        background: '#fff',
        color: '#000'
      });
    }
  };

  if (loading) {
    return <div className="product-detail-overlay"><div style={{padding: '5rem', textAlign: 'center'}}>Cargando...</div></div>;
  }

  if (!product) return null;

  return (
    <div className="product-detail-overlay">
      <div className="product-detail-container">
        
        <div className="product-detail-content">
          <div className="product-image-section">
            <img src={product.images && product.images.length > 0 ? product.images[0].image : ''} alt={product.name} className="detail-image" />
          </div>

          <div className="product-info-section">
            <h1 className="detail-title">{product.name}</h1>
            <hr className="detail-divider" />
            
            <h3 className="detail-subtitle">Descripción</h3>
            <p className="detail-description">
              Chaqueta casual exclusiva de LOW. Con diseño {product.color ? `en color ${product.color}` : 'increíble'}.
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
              <span className="detail-price">${product.price.toFixed(2)}</span>
              
              <div className="quantity-selector">
                <button onClick={decreaseQuantity}>−</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
            </div>

            <hr className="detail-divider" />

            <div className="detail-actions">
              <SecondaryButton className="add-to-cart-btn" onClick={handleAddToCart}>
                Añadir al carrito
              </SecondaryButton>
              
              <PrimaryButton className="checkout-btn" onClick={() => { handleAddToCart(); navigate('/checkout'); }}>
                <span>Finalizar Compra</span>
                <span className="dot-separator">•</span>
                <span>${(product.price * quantity).toFixed(2)}</span>
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
