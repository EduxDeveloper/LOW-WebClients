import { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, ShoppingCart, Menu, X, LogOut } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = ({ onOpenCart }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  // Cierra el menú de perfil si haces clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef]);

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
        {user ? (
          <div className="profile-dropdown-container" ref={profileMenuRef}>
            <button 
              className="profile-btn" 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            >
              <User size={20} />
            </button>
            {isProfileMenuOpen && (
              <div className="profile-dropdown-menu">
                <button className="logout-btn" onClick={handleLogout}>
                  <LogOut size={16} /> Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="login-btn" onClick={closeMobileMenu}>
            <span className="user-icon"><User size={18} /></span> Login
          </Link>
        )}
        
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
