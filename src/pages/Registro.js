import React, { useRef, useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from 'axios';
import backgroundImage from '../assets/imagen3.jpg';
import {WEBSERVICE_IP} from '../functions/roots/webserviceIP';

const Registro = () => {
  const navigate = useNavigate();
  const nombreRef = useRef();
  const appRef = useRef();
  const apmRef = useRef();
  const telefonoRef = useRef();
  const correoRef = useRef();
  const passwordRef = useRef();

  // Estado para controlar la visibilidad de la contraseña
  const [showPassword, setShowPassword] = useState(false);

  const hasConsecutiveNumbers = (password) => {
    for (let i = 0; i < password.length - 1; i++) {
      const currentChar = parseInt(password[i]);
      const nextChar = parseInt(password[i + 1]);
  
      if (!isNaN(currentChar) && !isNaN(nextChar) && nextChar === currentChar + 1) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const nombre = nombreRef.current.value;
    const app = appRef.current.value;
    const apm = apmRef.current.value;
    const telefono = telefonoRef.current.value;
    const correo = correoRef.current.value;
    const password = passwordRef.current.value;

    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.',
      });
      return;
    }

    if (hasConsecutiveNumbers(password)) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'La contraseña no debe contener números consecutivos.',
      });
      return;
    }

    try {
      const response = await Axios.post(`${WEBSERVICE_IP}/usuarios/register`, {
        nombre,
        app,
        apm,
        telefono,
        correo,
        password,
      });

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Correo enviado',
          text: 'Te hemos enviado un correo para verificar tu cuenta. Por favor, revisa tu bandeja de entrada.',
        });
        navigate('/verificacion');  // Redirige a la página de verificación si todo es correcto.
      }
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
  
      if (error.response) {
        if (error.response.status === 400) {
          Swal.fire({
            icon: 'error',
            title: 'Error de validación',
            text: error.response.data.message,
          });
        } else if (error.response.status === 409) {
          Swal.fire({
            icon: 'error',
            title: 'Usuario ya registrado',
            text: 'El correo o teléfono ya está en uso. Por favor, usa otros datos.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al registrar la cuenta. Por favor, inténtalo de nuevo.',
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo conectar al servidor. Por favor, inténtalo de nuevo más tarde.',
        });
      }
    }
  };

  const handleLoginClick = () => {
    navigate('/inicio-sesion');
  };

  // Función para alternar la visibilidad de la contraseña
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="inicio-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="form-overlay">
        <h2 className="form-title">Registro</h2>
        <div className="form-box">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre:</label>
              <input
                type="text"
                ref={nombreRef}
                required
              />
            </div>
            <div>
              <label>Apellido paterno:</label>
              <input
                type="text"
                ref={appRef}
                required
              />
            </div>
            <div>
              <label>Apellido materno:</label>
              <input
                type="text"
                ref={apmRef}
                required
              />
            </div>
            <div>
              <label>Teléfono:</label>
              <input
                type="text"
                ref={telefonoRef}
                required
              />
            </div>
            <div>
              <label>Correo:</label>
              <input
                type="email"
                ref={correoRef}
                required
              />
            </div>
            <div>
              <label>Contraseña:</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  ref={passwordRef}
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
            </div>
            <div className="button-container">
              <button type="submit">Registrar</button>
              <button type="button" onClick={handleLoginClick}>Iniciar sesión</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Registro;
