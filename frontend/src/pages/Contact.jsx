import twitterIcon from '../assets/images/Twitter.webp';
import instagramIcon from '../assets/images/instagram.webp';
import './Contact.css';

const Contact = () => {
  return (
    <div className="page-container contact-page">
      <h1 className="contact-title">¿Tienes alguna duda? ¡Escríbenos!</h1>
      
      <div className="contact-content">
        
        {/* Left Column: Contact Form */}
        <div className="contact-form-col">
          <h2 className="contact-form-title">Envíanos un mensaje</h2>
          
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre <span className="req">*</span></label>
                <input type="text" placeholder="Tu nombre" className="form-input" />
              </div>
              <div className="form-group">
                <label>Apellido <span className="req">*</span></label>
                <input type="text" placeholder="Tu apellido" className="form-input" />
              </div>
            </div>

            <div className="form-group">
              <label>Correo Electrónico <span className="req">*</span></label>
              <input type="email" placeholder="correo@ejemplo.com" className="form-input" />
            </div>

            <div className="form-group">
              <label>Asunto <span className="req">*</span></label>
              <input type="text" placeholder="Consulta sobre producto, envíos, etc." className="form-input" />
            </div>

            <div className="form-group">
              <label>Mensaje <span className="req">*</span></label>
              <textarea 
                placeholder="Escribe tu mensaje detalladamente aquí..." 
                className="form-textarea" 
                rows="6"
              ></textarea>
            </div>

            <button type="submit" className="contact-submit-btn">ENVIAR MENSAJE</button>
          </form>
        </div>

        {/* Right Column: Contact Info */}
        <div className="contact-info-col">
          <div className="contact-info-block">
            <h3>Información Directa</h3>
            <p>
              <strong>Email:</strong> contacto@loomandweft.com<br />
              <strong>Teléfono:</strong> +503 2222-3456
            </p>
          </div>

          <div className="contact-info-block">
            <h3>Horario de Atención</h3>
            <p>
              Lunes - Viernes: 9:00 AM - 6:00 PM<br />
              Sábados: 9:00 AM - 1:00 PM<br />
              Domingos: Cerrado
            </p>
          </div>

          <div className="contact-info-block">
            <h3>Soporte Comercial</h3>
            <p>
              Respuesta promedio dentro de las primeras 24 horas hábiles. Para temas urgentes de modificaciones en pedidos, te sugerimos contactarnos por vía telefónica.
            </p>
          </div>

          <div className="contact-info-block">
            <h3>Síguenos</h3>
            <div className="contact-socials">
              <a href="https://instagram.com" className="contact-social-icon" target="_blank" rel="noreferrer">
                <img src={instagramIcon} alt="Instagram" style={{ width: '20px', height: '20px' }} />
              </a>
              <a href="https://twitter.com" className="contact-social-icon" target="_blank" rel="noreferrer">
                <img src={twitterIcon} alt="Twitter" style={{ width: '20px', height: '20px' }} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
