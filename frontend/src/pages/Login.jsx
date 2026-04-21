import { Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Iniciar Sesión</h1>
        <p className="auth-subtitle">Bienvenido a LØØM & WEFT</p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="auth-form-group">
            <label>Correo Electronico</label>
            <input type="email" placeholder="correoElectronico@email.com" className="auth-input" />
          </div>

          <div className="auth-form-group">
            <label>Contraseña</label>
            <input type="password" placeholder="contraseña" className="auth-input" />
          </div>

          <div className="auth-forgot">
            <Link to="#">¿Olvidaste tu contraseña?</Link>
          </div>

          <button type="submit" className="auth-btn-primary">Iniciar Sesión</button>
        </form>

        <hr className="auth-divider" />

        <p className="auth-prompt">¿Todavia no eres parte de LØW?</p>
        
        <Link to="/registro" className="auth-btn-secondary">
          CREAR CUENTA
        </Link>
      </div>
    </div>
  );
};

export default Login;
