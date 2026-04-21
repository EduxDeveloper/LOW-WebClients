import { Link } from 'react-router-dom';
import { DEFAULT_IMAGE } from '../../utils/constants';
import './HeroSection.css';

const HeroSection = ({ 
  title = "LØØM & WΞFT", 
  subtitle = "Nuevas colecciones disponibles", 
  buttonText = "Ver Prendas", 
  buttonLink = "/tienda",
  showButton = true,
  image = DEFAULT_IMAGE
}) => {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${image})` }}>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        {showButton && (
          <Link to={buttonLink} className="hero-btn">{buttonText}</Link>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
