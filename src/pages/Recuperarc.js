import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { WEBSERVICE_IP } from '../functions/roots/webserviceIP'; // Asegúrate de que este valor sea correcto

const Recuperarc = () => {
  const [correo, setCorreo] = useState('');
  const [nuevaContrasena, setNuevaContrasena] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mostrarFormularioContrasena, setMostrarFormularioContrasena] = useState(false);
  const { token } = useParams(); // Token obtenido de la URL
  const navigate = useNavigate();

  // Enviar correo para solicitar recuperación
  const handleEnviarCorreo = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${WEBSERVICE_IP}/usuarios/solicitar-recuperacion`, { correo: correo });
      setMensaje(response.data.mensaje);
      setMostrarFormularioContrasena(true); // Mostrar formulario para restablecer la contraseña
    } catch (error) {
      setMensaje('Hubo un problema al enviar el correo. Intenta más tarde.');
      console.error(error);
    }
  };

  // Restablecer contraseña
  const handleRestablecerContrasena = async (event) => {
    event.preventDefault();
    console.log("Token en el encabezado: ", token); 
    if (!token) {
      setMensaje('Token no válido o no encontrado');
      return;
    }

    try {
      const response = await axios.post(
        `${WEBSERVICE_IP}/usuarios/restablecer`,
        { nuevaContrasena },
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Asegúrate de que el token esté aquí con el prefijo 'Bearer'
          },
        }
      );
      setMensaje(response.data.mensaje);
      if (response.data.mensaje === 'Contraseña restablecida con éxito.') {
        setTimeout(() => {
          navigate('/inicio-sesion'); // Redirige al login después de 2 segundos
        }, 2000);
      }
    } catch (error) {
      setMensaje('Hubo un problema al restablecer la contraseña. Intenta más tarde.');
      console.error(error);
    }
  };

  useEffect(() => {
    console.log('Token recibido:', token); // Verifica que el token esté llegando correctamente
    if (token) {
      setMostrarFormularioContrasena(true); // Si hay un token, mostramos el formulario de restablecimiento
    }
  }, [token]);

  return (
    <div className="recuperarc-background">
      <div className="recuperarc-container">
        <h2>Recuperación de Contraseña</h2>
        {!mostrarFormularioContrasena ? (
          <form onSubmit={handleEnviarCorreo}>
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            /><br />
            <button type="submit" className="boton-recuperacion">Enviar</button>
          </form>
        ) : (
          <form onSubmit={handleRestablecerContrasena}>
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              minLength={8}
              required
            /><br />
            <button type="submit" className="boton-recuperacion">Restablecer</button>
          </form>
        )}
        {mensaje && <p>{mensaje}</p>}
      </div>
    </div>
  );
};

export default Recuperarc;
