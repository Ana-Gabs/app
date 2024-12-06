import React from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/imagen1.jpg';
import '../App.css'; // Importa el archivo de estilos globales

const Inicio = () => {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/registro');
  };

  const handleLoginClick = () => {
    navigate('/inicio-sesion');
  };

  return (
    <div 
      className="inicio-container"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <button className="circular-button" onClick={handleRegisterClick}>Registro</button>
      <button className="circular-button" style={{ right: '180px' }} onClick={handleLoginClick}>Inicio de sesión</button>

      <h1>GDAY</h1>
      <h2>DONDE MEJORA TU PRODUCTIVIDAD</h2>
    </div>
  );
};

export default Inicio;
