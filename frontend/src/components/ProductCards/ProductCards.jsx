import { Link } from 'react-router-dom';
import prendaImg from '../../images/Prenda.png';
import './ProductCards.css';

const products = [
  { id: 1, name: 'Rhinestones Tracksuit Pants', price: '$157.00' },
  { id: 2, name: 'Rhinestones Tracksuit Pants', price: '$157.00' },
  { id: 3, name: 'Detachable Black Jeans', price: '$157.00' },
];

const ProductCards = () => {
  return (
    <section className="products-section">
      <div className="products-header">
        <h2 className="productos-title">Destacados</h2>
        <Link to="/tienda" className="view-all-link">Ver Todos ➔</Link>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={prendaImg} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-price">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCards;
