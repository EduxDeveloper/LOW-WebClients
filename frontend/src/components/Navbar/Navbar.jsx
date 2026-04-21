import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ onOpenCart }) => {
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
        <Link to="/login" className="login-btn">
          <span className="user-icon">👤</span> Login
        </Link>
        <button className="cart-btn" onClick={onOpenCart}>
          🛒
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
