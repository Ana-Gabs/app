import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import {WEBSERVICE_IP} from '../functions/roots/webserviceIP';

const Verificacionc = () => {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mostrarFormularioVerificacion, setMostrarFormularioVerificacion] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const handleEnviarCorreoVerificacion = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${WEBSERVICE_IP}/usuarios/solicitar-verificacion`, { correo });
      setMensaje(response.data.mensaje);
      if (response.data.success) {
        setMostrarFormularioVerificacion(true);
      }
    } catch (error) {
      setMensaje('Hubo un problema al enviar el correo. Intenta más tarde.');
      console.error(error);
    }
  };
  const handleVerificarCorreo = async (event) => {
    event.preventDefault();
  
    if (!token || token.trim() === "") {
      setMensaje('Token no proporcionado.');
      return;
    }
  
    const url = `${WEBSERVICE_IP}/usuarios/verificar/${token.trim()}`; // Construir URL
    console.log("URL de solicitud al backend:", url); // Imprimir URL
    console.log("Token recibido:", token); // Imprimir token
  
    try {
      // Hacer solicitud al backend
      const response = await axios.get(url);
  
      // Manejar respuesta exitosa
      setMensaje(response.data.message || 'Verificación exitosa.');
  
      // Redirigir si la verificación es exitosa
      if (response.data.message.includes('verificado exitosamente')) {
        setTimeout(() => {
          navigate('/inicio-sesion');
        }, 2000); // Esperar 2 segundos antes de redirigir
      }
    } catch (error) {
      // Manejar errores del backend o problemas de conexión
      if (error.response && error.response.data) {
        setMensaje(error.response.data.message || 'Hubo un problema al verificar el correo.');
      } else {
        setMensaje('Hubo un problema al verificar el correo. Intenta más tarde.');
      }
      console.error("Error en la solicitud:", error);
    }
  };
  
  
  
  

  useEffect(() => {
    if (token) {
      setMostrarFormularioVerificacion(true);
    }
  }, [token]);

  return (
    <div className="verificacion-container">
      <div className="verificacion-form">
        <h2>Verificación de Correo</h2>
        {!mostrarFormularioVerificacion ? (
          <form onSubmit={handleEnviarCorreoVerificacion} >
            <input
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
            <button type="submit">Enviar enlace de verificación</button>
          </form>
        ) : (
          <form onSubmit={handleVerificarCorreo}>
            <p>¿Este es tu correo?</p>
            <button type="submit"className="verificacion-form button">Sí</button><br></br>
         
            <button type="button" className="verificacion-form button" onClick={() => navigate('/registro')}>No</button>
          </form>
        )}
        {mensaje && <p className="verificacion-mensaje">{mensaje}</p>}
      </div>
    </div>
  );
};

export default Verificacionc;
