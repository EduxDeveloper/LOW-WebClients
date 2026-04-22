import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import prendaImg from '../images/Prenda.png';
import '../components/ProductCards/ProductCards.css'; // Reusing some product card styles
import './Store.css';

const storeProducts = [
  { id: 1, name: 'NFL Spider Blue Jersey', price: '$81.00', category: 'Hombre' },
  { id: 2, name: 'NFL Spider Black Jersey', price: '$81.00', category: 'Hombre' },
  { id: 3, name: 'Black Leather Fur Detachable Jacket', price: '$181.00', category: 'Mujer' },
  { id: 4, name: 'White Leather Fur Detachable Jacket', price: '$181.00', category: 'Mujer' },
  { id: 5, name: 'SpiderWeb Black Seams Jeans', price: '$157.00', category: 'Hombre' },
  { id: 6, name: 'Black Cross Mohair Zip-Up', price: '$109.00', category: 'Todo' },
];

const Store = () => {
  const location = useLocation();

  const getInitialFilter = () => {
    if (location.pathname.includes('mujer')) return 'Mujer';
    if (location.pathname.includes('hombre')) return 'Hombre';
    return 'Todo';
  };

  const [activeFilter, setActiveFilter] = useState(getInitialFilter());

  useEffect(() => {
    setActiveFilter(getInitialFilter());
  }, [location.pathname]);

  const filters = ['Todo', 'Hombre', 'Mujer'];

  const filteredProducts = activeFilter === 'Todo'
    ? storeProducts
    : storeProducts.filter(p => p.category === activeFilter || p.category === 'Todo'); // 'Todo' category shows up everywhere for demo

  return (
    <div className="store-page">
      <div className="store-filters">
        <div className="filter-btn label">Filtrar por</div>
        {filters.map(f => (
          <button
            key={f}
            className={`filter-btn ${activeFilter === f ? 'active' : 'inactive'}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="store-grid">
        {filteredProducts.map((product) => (
          <Link to={`/producto/${product.id}`} key={product.id} className="product-card">
            <div className="product-image-container">
              <img src={prendaImg} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-price">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Store;
