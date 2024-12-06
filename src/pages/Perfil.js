import Footer from '../components/Footer';
import Header from '../components/Header';
import InformacionUsuario from '../components/containers/InformacionUsuario';
import SubscripcionUsuario from '../components/containers/SubscripcionUsuario';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import useNotifications from '../functions/hooks/useNotifications';

const usuarioMock = {
  nombre: 'Andrea',
  apellidoPaterno: 'Pérez',
  apellidoMaterno: 'González',
  email: 'juan.perez@correo.com',
  contrasena: 'miContraseñaSegura123',
  imagenPerfil: '',
};

const Perfil = () => {
  const navigate = useNavigate();
  const usuarioId = sessionStorage.getItem('usuarioId');
  useNotifications(usuarioId);

  const handleSubscriptionRedirect = () => {
    navigate('/suscripcion');
  };

  return (
    <div style={{ backgroundColor: '#F4F6FA', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1, padding: '20px', gap: '20px' }}>
        <div
          style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
          }}
        >
          <InformacionUsuario usuario={usuarioMock} />
        </div>
        <SubscripcionUsuario
          usuarioId={usuarioId}
          onSubscriptionClick={handleSubscriptionRedirect}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Perfil;
