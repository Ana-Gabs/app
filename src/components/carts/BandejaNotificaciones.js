import React, { useEffect, useState } from 'react';
import { WEBSERVICE_IP } from '../../functions/roots/webserviceIP';
import { Box, Typography } from '@mui/material';
import Notificacion from '../../functions/NotificacionesF';

const Bandejanotificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const usuarioId = sessionStorage.getItem('usuarioId');
  console.log(usuarioId)

  useEffect(() => {
    if (!usuarioId) {
      setError('ID de usuario no disponible');
      setLoading(false);
      return;
    }

    const fetchNotificaciones = async () => {
      try {
        const response = await fetch(`${WEBSERVICE_IP}/notificaciones/${usuarioId}`);
        if (!response.ok) {
          throw new Error('No se pudieron cargar las notificaciones');
        }

        const data = await response.json();
        setNotificaciones(data);
        setLoading(false);
      } catch (err) {
        setError('No se pudieron cargar las notificaciones');
        setLoading(false);
      }
    };

    fetchNotificaciones();
  }, [usuarioId]);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${WEBSERVICE_IP}/notificaciones/eliminar/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la notificación');
      }

      setNotificaciones((prevNotificaciones) =>
        prevNotificaciones.filter((notificacion) => notificacion._id !== id)
      );
    } catch (err) {
      setError('No se pudo eliminar la notificación');
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      const response = await fetch(`${WEBSERVICE_IP}/notificaciones/marcar-leida/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error('Error al marcar como leída');
      }

      setNotificaciones((prevNotificaciones) =>
        prevNotificaciones.map((notificacion) =>
          notificacion._id === id ? { ...notificacion, leida: true } : notificacion
        )
      );
    } catch (err) {
      setError('No se pudo marcar como leída');
    }
  };

  if (loading) {
    return <Typography variant="h6">Cargando notificaciones...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ padding: 2, margin: '20px auto', width: '100%', maxWidth: { xs: '100%', md: '1000px' } }}>
      <Box sx={{ padding: 2, borderRadius: '8px' }}>
        {notificaciones.length > 0 ? (
          notificaciones.map((notification) => (
            <Notificacion
              key={notification._id}
              tipo={notification.tipo}
              text={notification.mensaje}
              date={new Date(notification.fecha).toLocaleDateString()}
              id={notification._id}
              leida={notification.leida} 
              onDelete={handleDelete}
              onMarkAsRead={handleMarkAsRead}
            />
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No tienes notificaciones.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Bandejanotificaciones;
