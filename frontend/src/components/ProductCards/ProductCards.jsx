import { Link } from 'react-router-dom';
import ropa5 from '../../images/ROPA (5).png';
import ropa6 from '../../images/ROPA (6).png';
import ropa7 from '../../images/ROPA (7).png';
import './ProductCards.css';

const products = [
  { id: 1, name: 'Rhinestones Tracksuit Pants', price: '$157.00', img: ropa5 },
  { id: 2, name: 'Elixir Spider Tribal Zip-Up', price: '$109.00', img: ropa6 },
  { id: 3, name: 'Detachable Black Jeans', price: '$157.00', img: ropa7 },
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
              <img src={product.img} alt={product.name} className="product-image" />
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
