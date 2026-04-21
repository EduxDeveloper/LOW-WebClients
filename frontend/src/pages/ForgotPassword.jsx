import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setIsSubmitted(true);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        
        {!isSubmitted ? (
          <>
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
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '80px', height: '80px', backgroundColor: '#82E098', 
              borderRadius: '50%', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', margin: '0 auto 1.5rem auto'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
            
            <h1 className="auth-title" style={{ fontSize: '1.8rem' }}>Revisa tu email</h1>
            <p className="auth-subtitle" style={{ marginBottom: '1.5rem', color: '#777' }}>
              Hemos enviado las instrucciones de recuperación a <br/>
              <strong>{email}</strong>
            </p>
            
            <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '2rem' }}>
              Si no recibes el email en unos minutos, revisa tu carpeta de spam
            </p>

            <Link to="/login" className="auth-btn-primary" style={{ display: 'block', textDecoration: 'none' }}>
              Volver al inicio de sesión
            </Link>
          </div>
        )}

        <hr className="auth-divider" />
        
        <Link to="/registro" className="auth-btn-secondary" style={{ textDecoration: 'none' }}>
          CREAR CUENTA
        </Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
