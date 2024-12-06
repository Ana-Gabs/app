// Notificaciones.js
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import BandejaNotificaciones from '../components/carts/BandejaNotificaciones';
import { Box, Container } from '@mui/material';
import useNotifications from '../functions/hooks/useNotifications';

const Notificaciones = () => {
  const usuarioId = sessionStorage.getItem('usuarioId');
  useNotifications(usuarioId);
  return (
    <Box sx={{ backgroundColor: '#F4F6FA', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />

      <Container >
        <BandejaNotificaciones />
      </Container>
      
      <Footer />
    </Box>
  );
};

export default Notificaciones;
