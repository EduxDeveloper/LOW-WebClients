import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/">LØW</Link>
      </div>
      
      <ul className="nav-links">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/tienda">Tienda</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
        <li><Link to="/sobre-nosotros">Sobre nosotros</Link></li>
        <li><Link to="/resenas">Reseñas</Link></li>
      </ul>

      <div className="nav-actions">
        <button className="login-btn">
          <span className="user-icon">👤</span> Login
        </button>
        <button className="cart-btn">
          🛒
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
