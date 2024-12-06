import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import imagen2 from '../assets/imagen2.jpg'; 
import {WEBSERVICE_IP} from '../functions/roots/webserviceIP'

const InicioSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para controlar si la contraseña se muestra o no
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const limpiarCampos = () => {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

   
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(email)) {
      return Swal.fire('Formato de correo incorrecto', 'Por favor, ingresa un correo válido.', 'error');
    }


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return Swal.fire(
        'Formato de contraseña incorrecto',
        'La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas y números.',
        'error'
      );
    }

    try {
      const response = await axios.post(`${WEBSERVICE_IP}/usuarios/login`, {
        correo: email,
        password,
      });

     
      if (response.data.message === 'Inicio de sesión exitoso') {
        const { id_us, tipo, nombre } = response.data;

        if (!id_us) {
          return Swal.fire('Error', 'No se pudo obtener el ID del usuario.', 'error');
        }

      
        sessionStorage.setItem('nombre', nombre);
        sessionStorage.setItem('isLoggedIn', 'true'); 
        sessionStorage.setItem('usuarioId', id_us);

        // Mostrar mensaje de éxito
        Swal.fire({
          title: `¡Inicio de sesión exitoso, ${nombre}!`,
          icon: 'success',
        }).then(() => {
          // Redirigir según el tipo de usuario
          if (tipo === '1') {
            navigate('/Calendario');
          } else {
            Swal.fire('Acceso denegado', 'Tipo de usuario no autorizado.', 'error');
          }
        });

        limpiarCampos();
      } else {
        Swal.fire('¡Datos incorrectos!', 'Por favor, inténtalo de nuevo', 'error');
        limpiarCampos();
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Hubo un problema con el servidor. Inténtalo más tarde.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/registro');
  
  };

  const handleForgotPasswordClick = () => {
    navigate('/recuperarc'); // Redirigir a la página de recuperación de contraseña
  };

  return (
    <div className="inicio-sesion-container">
      <div className="image-container" style={{ backgroundImage: `url(${imagen2})` }}></div> 
      <div className="form-container">
        <h2 className="form-title">Inicio de sesión</h2>
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Correo:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'} // Cambia el tipo de entrada
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
         
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)} // Cambia el estado al hacer clic
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? '👁️' : '🙈'} {/* Cambia el ícono */}
                </button>
              </div>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="button-container">
              <button type="submit">Aceptar</button>
              <button type="button" onClick={handleRegisterClick}>Registro</button>
              <button type="button" onClick={handleForgotPasswordClick}>
          ¿Olvidaste tu contraseña?
        </button>
              
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InicioSesion;
