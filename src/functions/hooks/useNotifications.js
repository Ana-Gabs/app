import { useEffect } from 'react';
import {WEBSERVICE_IP} from '../../functions/roots/webserviceIP';
import { useSnackbar } from 'notistack';

const useNotifications = (usuarioId) => {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // Función para obtener las notificaciones desde el servidor
    const obtenerNotificaciones = async () => {
      try {
        const response = await fetch(`${WEBSERVICE_IP}/notificaciones/noleidas/${usuarioId}`);
        const data = await response.json();

        if (response.ok) {
          // Verificamos si la notificación ya ha sido mostrada anteriormente
          const mostradas = JSON.parse(localStorage.getItem('notificaciones_mostradas')) || [];

          // Muestra las notificaciones
          data.forEach((notificacion) => {
            // Si la notificación ya ha sido mostrada, no la mostramos de nuevo
            if (!mostradas.includes(notificacion._id)) {
              // Muestra la notificación
              enqueueSnackbar(notificacion.mensaje, {
                variant: 'info',  // Puedes cambiar el tipo de notificación, como 'success', 'error', etc.
              });

              // Guardar la notificación como mostrada
              mostradas.push(notificacion._id);
              localStorage.setItem('notificaciones_mostradas', JSON.stringify(mostradas));
            }
          });
        } else {
          console.error('No se pudieron obtener las notificaciones:', data);
        }
      } catch (error) {
        console.error('Error al obtener las notificaciones:', error);
      }
    };

    // Llamar la función para obtener las notificaciones
    obtenerNotificaciones();

    // Configurar polling (cada 10 segundos)
    const intervalo = setInterval(obtenerNotificaciones, 10000); // 10000ms = 10 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalo);
  }, [usuarioId, enqueueSnackbar]);
};

export default useNotifications;
