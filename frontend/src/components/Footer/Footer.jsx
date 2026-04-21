import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-columns">
        
        <div className="footer-col brand-col">
          <h2 className="footer-brand">LØW</h2>
          <p className="footer-desc">
            Streetwear urbano de alta calidad y<br/>
            diseño exclusivo.
          </p>
        </div>

        <div className="footer-col">
          <h3>Tienda</h3>
          <ul>
            <li><Link to="/mujer">Mujer</Link></li>
            <li><Link to="/hombre">Hombre</Link></li>
            <li><Link to="/accesorios">Accesorios</Link></li>
            <li><Link to="/resenas">Reseñas</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Ayuda</h3>
          <ul>
            <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/terminos">Terminos y<br/>condiciones</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Síguenos</h3>
          <div className="social-icons">
            <a href="#" className="social-icon">📷</a>
            <a href="#" className="social-icon">🐦</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
