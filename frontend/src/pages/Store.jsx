import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../components/ProductCards/ProductCards.css'; // Reusing some product card styles
import './Store.css';

const Store = () => {
  const location = useLocation();
  const [storeProducts, setStoreProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getInitialFilter = () => {
    if (location.pathname.includes('mujer')) return 'Mujer';
    if (location.pathname.includes('hombre')) return 'Hombre';
    return 'Todo';
  };

  const [activeFilter, setActiveFilter] = useState(getInitialFilter());

  useEffect(() => {
    setActiveFilter(getInitialFilter());
  }, [location.pathname]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products');
        if (response.ok) {
          const data = await response.json();
          setStoreProducts(data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filters = ['Todo', 'Hombre', 'Mujer'];

  const filteredProducts = activeFilter === 'Todo'
    ? storeProducts
    : storeProducts.filter(p => p.sub_type === activeFilter || p.product_type === activeFilter || activeFilter === 'Todo'); 
    // We filter by sub_type or product_type assuming the backend uses these for 'Hombre' / 'Mujer'

  if (loading) {
    return <div className="store-page" style={{textAlign: "center", marginTop: "5rem"}}>Cargando productos...</div>;
  }

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
          <Link to={`/producto/${product._id}`} key={product._id} className="product-card">
            <div className="product-image-container">
              <img src={product.images && product.images.length > 0 ? product.images[0].image : ''} alt={product.name} className="product-image" />
            </div>
            <div className="product-info">
              <h4 className="product-name">{product.name}</h4>
              <p className="product-price">${product.price.toFixed(2)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Store;
