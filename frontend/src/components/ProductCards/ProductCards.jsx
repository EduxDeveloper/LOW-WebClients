import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductCards.css';

const ProductCards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/products');
        if (response.ok) {
          const data = await response.json();
          // Take only the first 3 products for the featured section
          setProducts(data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <section className="products-section"><div style={{textAlign: "center"}}>Cargando destacados...</div></section>;
  }

  return (
    <section className="products-section">
      <div className="products-header">
        <h2 className="productos-title">Destacados</h2>
        <Link to="/tienda" className="view-all-link">Ver Todos ➔</Link>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <Link to={`/producto/${product._id}`} key={product._id} className="product-card" style={{textDecoration: 'none', color: 'inherit'}}>
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
    </section>
  );
};

export default ProductCards;
