import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      await Swal.fire({
        title: 'Contraseña Restablecida',
        text: 'Regresa a iniciar sesión con tu nueva contraseña',
        icon: 'success',
        confirmButtonText: 'Regresar al Inicio de Sesión',
        background: '#fff',
        color: '#000',
        confirmButtonColor: '#111',
      });
      navigate('/login');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        
        <h1 className="auth-title">Recuperar Contraseña</h1>
        <p className="auth-subtitle" style={{ marginBottom: '2rem' }}>
          Ingresa tu email y te enviaremos instrucciones <br/> para restablecer tu contraseña
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label>Correo Electronico</label>
            <input 
              type="email" 
              placeholder="correoElectronico@email.com" 
              className="auth-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-btn-primary">Enviar Instrucciones</button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <Link to="/login" style={{ fontSize: '0.85rem', color: '#555', textDecoration: 'none' }}>
            Volver al inicio de sesión
          </Link>
        </div>

        <hr className="auth-divider" />
        
        <Link to="/registro" className="auth-btn-secondary" style={{ textDecoration: 'none' }}>
          CREAR CUENTA
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
