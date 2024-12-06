// ./pages/Sugerencias.js
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import InformacionUsuario from '../components/containers/InformacionUsuario';


const usuarioMock = {
  nombre: 'Andrea',
  apellidoPaterno: 'Pérez',
  apellidoMaterno: 'González',
  email: 'juan.perez@correo.com',
  contrasena: 'miContraseñaSegura123',
  imagenPerfil: '',
};

const Sugerencias = () => {
  return (
    <div style={{ backgroundColor: '#F4F6FA', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <InformacionUsuario usuario={usuarioMock} />
      <Footer />
    </div>
  );
};

export default Sugerencias;
