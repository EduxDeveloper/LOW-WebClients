import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingCart, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <Link to="/" onClick={closeMobileMenu}>LØW</Link>
      </div>
      
      <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={closeMobileMenu}>Inicio</Link></li>
        <li><Link to="/tienda" onClick={closeMobileMenu}>Tienda</Link></li>
        <li><Link to="/contacto" onClick={closeMobileMenu}>Contacto</Link></li>
        <li><Link to="/sobre-nosotros" onClick={closeMobileMenu}>Sobre nosotros</Link></li>
        <li><Link to="/resenas" onClick={closeMobileMenu}>Reseñas</Link></li>
      </ul>

      <div className="nav-actions">
        <Link to="/login" className="login-btn" onClick={closeMobileMenu}>
          <span className="user-icon"><User size={18} /></span> Login
        </Link>
        <button className="cart-btn" onClick={() => { onOpenCart(); closeMobileMenu(); }}>
          <ShoppingCart size={20} />
        </button>
        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
