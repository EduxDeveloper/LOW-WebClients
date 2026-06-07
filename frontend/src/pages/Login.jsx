import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/loginClient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include' // Allow sending/receiving cookies for authentication
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user || { email: formData.email, userType: 'client' }); // We can store more if API returns it

        await Swal.fire({
          title: '¡Bienvenido de vuelta!',
          text: 'Has iniciado sesión correctamente.',
          icon: 'success',
          confirmButtonText: 'Continuar',
          background: '#fff',
          color: '#000',
          confirmButtonColor: '#111',
        });
        navigate('/');
      } else {
        Swal.fire({
          title: 'Error',
          text: data.message || 'Credenciales incorrectas.',
          icon: 'error',
          confirmButtonColor: '#111',
        });
      }
    } catch (error) {
      console.error('Error logging in:', error);
      Swal.fire({
        title: 'Error de red',
        text: 'No se pudo conectar con el servidor.',
        icon: 'error',
        confirmButtonColor: '#111',
      });
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Iniciar Sesión</h1>
        <p className="auth-subtitle">Bienvenido a LØØM &amp; WEFT</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form-group">
            <label>Correo Electronico</label>
            <input
              type="email"
              name="email"
              placeholder="correoElectronico@email.com"
              className="auth-input"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              placeholder="contraseña"
              className="auth-input"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-forgot">
            <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
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
