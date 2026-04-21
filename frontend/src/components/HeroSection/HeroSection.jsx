import { Link } from 'react-router-dom';
import { DEFAULT_IMAGE } from '../../utils/constants';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${DEFAULT_IMAGE})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">LØØM & WΞFT</h1>
        <p className="hero-subtitle">Nuevas colecciones disponibles</p>
        <Link to="/tienda" className="hero-btn">Ver Prendas</Link>
      </div>
    </section>
  );
};

export default HeroSection;
