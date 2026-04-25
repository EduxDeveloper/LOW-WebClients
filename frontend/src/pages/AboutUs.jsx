import HeroSection from '../components/HeroSection/HeroSection';
import ValueCard from '../components/Cards/ValueCard';
import InfoBlock from '../components/InfoBlock/InfoBlock';
import prendaImg from '../images/NUESTRA HISTORIA.png';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-page">
      <HeroSection 
        title="Sobre Nosotros"
        subtitle="Redefiniendo el estilo urbano desde 2025"
        showButton={false}
      />

      <div className="about-container">
        
        <section className="history-section">
          <div className="history-content">
            <h2 className="history-title">Nuestra Historia</h2>
            <p className="history-text">
              LØØM & WΞFT nació de la pasión por crear ropa urbana que combina estilo contemporáneo con calidad excepcional. Fundada en 2020, nuestra marca se ha convertido en sinónimo de streetwear auténtico y diseño innovador.
            </p>
            <p className="history-text">
              Creemos que la moda es una forma de expresión personal, y cada prenda que creamos está diseñada para empoderar a quienes la usan. Desde nuestros icónicos hoodies hasta nuestros pantalones cargo, cada pieza cuenta una historia de creatividad y dedicación.
            </p>
            <p className="history-text">
              Con presencia en toda América Latina y un creciente número de clientes satisfechos, continuamos expandiendo nuestras fronteras mientras mantenemos nuestro compromiso con la calidad y la innovación.
            </p>
          </div>
          <div className="history-image-container">
            <img src={prendaImg} alt="Nuestra historia" className="history-image" />
          </div>
        </section>

        <section className="values-section">
          <h2 className="values-title">Nuestros Valores</h2>
          <div className="values-grid">
            <ValueCard 
              icon="♥" 
              title="Pasión" 
              description="Utilizamos solo los mejores materiales para garantizar durabilidad y comodidad." 
            />
            <ValueCard 
              icon="⚡" 
              title="Innovación" 
              description="Constantemente buscamos nuevas formas de mejorar y sorprender." 
            />
            <ValueCard 
              icon="★" 
              title="Autenticidad" 
              description="Nos mantenemos fieles a nuestra identidad y estilo único." 
            />
          </div>
        </section>

        <section className="mission-vision-section">
          <InfoBlock 
            variant="dark"
            title="Nuestra misión"
            description="Proporcionar ropa urbana de alta calidad que permita a nuestros clientes expresar su individualidad y estilo único. Nos comprometemos a ofrecer productos excepcionales con un servicio al cliente inigualable, mientras fomentamos una comunidad de personas apasionadas por la moda y la cultura urbana."
          />
          <InfoBlock 
            variant="light"
            title="Nuestra visión"
            description="Ser la marca líder de streetwear en Centroamérica, reconocida por nuestra innovación en diseño, calidad excepcional y compromiso con la comunidad. Aspiramos a inspirar a las próximas generaciones a través de la moda y convertirnos en un referente en estilo urbano auténtico."
          />
        </section>

      </div>
    </div>
  );
};

export default AboutUs;
