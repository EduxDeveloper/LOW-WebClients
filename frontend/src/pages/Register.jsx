import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthdate: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    // Preparar el FormData porque el backend espera multipart/form-data debido a multer en la ruta
    // Wait, the backend route uses upload.single("image"). We need to send FormData.
    const data = new FormData();
    data.append('name', formData.name);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('birthdate', formData.birthdate);
    data.append('phone', formData.phone);
    data.append('address', formData.address);

    try {
      const response = await fetch('http://localhost:4000/api/registerClient', {
        method: 'POST',
        body: data,
        credentials: 'include' // Allow setting cookies
      });

      const resData = await response.json();

      if (response.ok) {
        // Step 1 successful, email sent
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
          // Step 2: Verify code
          const verifyResponse = await fetch('http://localhost:4000/api/registerClient/verifyCodeEmail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ verificationCodeRequest: code }),
            credentials: 'include' // Allow sending the verification cookie
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok) {
            await Swal.fire({
              title: '¡Cuenta creada!',
              text: 'Tu cuenta ha sido verificada exitosamente. ¡Bienvenido a la familia!',
              icon: 'success',
              confirmButtonText: 'Ir a Iniciar Sesión',
              background: '#fff',
              color: '#000',
              confirmButtonColor: '#111',
            });
            navigate('/login');
          } else {
            Swal.fire('Error', verifyData.message || 'Código incorrecto o expirado.', 'error');
          }
        }
      } else {
        Swal.fire('Error', resData.message || 'No se pudo crear la cuenta.', 'error');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      Swal.fire('Error', 'No se pudo conectar con el servidor.', 'error');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card register-card">
        <h1 className="auth-title">Crear Cuenta</h1>
        <p className="auth-subtitle">Se parte de la comunidad de LØW</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          
          <div className="form-group-row">
            <div className="auth-form-group">
              <label>Nombre <span className="req">*</span></label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Salvador Eduardo" className="auth-input" required />
            </div>
            <div className="auth-form-group">
              <label>Apellido <span className="req">*</span></label>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Martinez Zuniga" className="auth-input" required />
            </div>
          </div>

          <div className="auth-form-group">
            <label>Correo Electronico <span className="req">*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="correoElectronico@email.com" className="auth-input" required />
          </div>

          <div className="auth-form-group">
            <label>Numero de Teléfono <span className="req">*</span></label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="(503) 1234-5678" className="auth-input" required />
          </div>

          <div className="auth-form-group">
            <label>Dirección <span className="req">*</span></label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Calle Principal 123, San Salvador" className="auth-input" required />
          </div>

          <div className="auth-form-group">
            <label>Fecha de Nacimiento <span className="req">*</span></label>
            <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} className="auth-input" required />
          </div>

          <div className="form-group-row">
            <div className="auth-form-group">
              <label>Contraseña <span className="req">*</span></label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="contraseña" className="auth-input" required />
            </div>
            <div className="auth-form-group">
              <label>Confirmar Contraseña <span className="req">*</span></label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="contraseña" className="auth-input" required />
            </div>
          </div>

          <div className="auth-checkbox-group">
            <input type="checkbox" id="terms" required />
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
