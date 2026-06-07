import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: Solicitar, 2: Restablecer
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const navigate = useNavigate();

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      // 1. Send code to email
      const response = await fetch('http://localhost:4000/api/recoverClientPassword/sendRecoveryCode', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        // 2. Ask for code via SweetAlert
        const { value: code } = await Swal.fire({
          title: 'Verifica tu correo',
          text: 'Hemos enviado un código a tu correo electrónico. Ingrésalo a continuación (vence en 15 minutos):',
          input: 'text',
          inputPlaceholder: 'Código de verificación',
          showCancelButton: true,
          confirmButtonText: 'Verificar',
          cancelButtonText: 'Cancelar',
          background: '#fff',
          color: '#000',
          confirmButtonColor: '#111',
          cancelButtonColor: '#ccc',
          inputValidator: (value) => {
            if (!value) {
              return '¡Necesitas ingresar el código!'
            }
          }
        });

        if (code) {
          // 3. Verify code with backend
          const verifyResponse = await fetch('http://localhost:4000/api/recoverClientPassword/verifyCode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ verificationCodeRequest: code }),
            credentials: 'include'
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok) {
            await Swal.fire({
              title: '¡Código Correcto!',
              text: 'Ahora puedes ingresar tu nueva contraseña.',
              icon: 'success',
              confirmButtonText: 'Continuar',
              background: '#fff',
              color: '#000',
              confirmButtonColor: '#111',
            });
            // Switch to step 2 (Reset password form)
            setStep(2);
          } else {
            Swal.fire('Error', verifyData.message || 'Código incorrecto o expirado.', 'error');
          }
        }
      } else {
        Swal.fire('Error', data.message || 'No se pudo enviar el correo.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/recoverClientPassword/resetPassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        await Swal.fire({
          title: 'Contraseña Restablecida',
          text: 'Tu contraseña se ha actualizado correctamente. Ya puedes iniciar sesión.',
          icon: 'success',
          confirmButtonText: 'Regresar al Inicio de Sesión',
          background: '#fff',
          color: '#000',
          confirmButtonColor: '#111',
        });
        navigate('/login');
      } else {
        Swal.fire('Error', data.message || 'No se pudo actualizar la contraseña.', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        
        {step === 1 ? (
          <>
            <h1 className="auth-title">Recuperar Contraseña</h1>
            <p className="auth-subtitle" style={{ marginBottom: '2rem' }}>
              Ingresa tu email y te enviaremos un código <br/> para restablecer tu contraseña
            </p>

            <form className="auth-form" onSubmit={handleSendCode}>
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

              <button type="submit" className="auth-btn-primary">Enviar Código</button>
            </form>
          </>
        ) : (
          <>
            <h1 className="auth-title">Nueva Contraseña</h1>
            <p className="auth-subtitle" style={{ marginBottom: '2rem' }}>
              Ingresa tu nueva contraseña para la cuenta <br/> {email}
            </p>

            <form className="auth-form" onSubmit={handleResetPassword}>
              <div className="auth-form-group">
                <label>Nueva Contraseña</label>
                <input 
                  type="password" 
                  placeholder="contraseña" 
                  className="auth-input" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="auth-form-group">
                <label>Confirmar Contraseña</label>
                <input 
                  type="password" 
                  placeholder="contraseña" 
                  className="auth-input" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-btn-primary">Actualizar Contraseña</button>
            </form>
          </>
        )}

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
