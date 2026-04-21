import { Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-card register-card">
        <h1 className="auth-title">Crear Cuenta</h1>
        <p className="auth-subtitle">Se parte de la comunidad de LØW</p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          
          <div className="form-group-row">
            <div className="auth-form-group">
              <label>Nombre <span className="req">*</span></label>
              <input type="text" placeholder="Salvador Eduardo" className="auth-input" />
            </div>
            <div className="auth-form-group">
              <label>Apellido <span className="req">*</span></label>
              <input type="text" placeholder="Martinez Zuniga" className="auth-input" />
            </div>
          </div>

          <div className="auth-form-group">
            <label>Correo Electronico <span className="req">*</span></label>
            <input type="email" placeholder="correoElectronico@email.com" className="auth-input" />
          </div>

          <div className="auth-form-group">
            <label>Numero de Teléfono <span className="req">*</span></label>
            <input type="tel" placeholder="(503) 1234-5678" className="auth-input" />
          </div>

          <div className="auth-form-group">
            <label>Fecha de Nacimiento <span className="req">*</span></label>
            <input type="text" placeholder="dd/mm/aaaa" className="auth-input" />
          </div>

          <div className="form-group-row">
            <div className="auth-form-group">
              <label>Contraseña <span className="req">*</span></label>
              <input type="password" placeholder="contraseña" className="auth-input" />
            </div>
            <div className="auth-form-group">
              <label>Confirmar Contraseña <span className="req">*</span></label>
              <input type="password" placeholder="contraseña" className="auth-input" />
            </div>
          </div>

          <div className="auth-checkbox-group">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">Acepto los terminos y condiciones</label>
          </div>

          <button type="submit" className="auth-btn-primary">CREAR CUENTA</button>
        </form>

        <p className="auth-footer-prompt">
          ¿Ya eres parte de LØW? <Link to="/login" className="auth-link">Inicia Sesion</Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
