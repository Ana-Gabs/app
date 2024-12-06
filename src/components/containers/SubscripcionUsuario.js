import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WEBSERVICE_IP } from '../../functions/roots/webserviceIP';
import { Box, Typography, Button, Stack, Divider } from '@mui/material';
import { Lock, CheckCircle, AttachMoney, CalendarToday, Person } from '@mui/icons-material';

const SubscripcionUsuario = ({ usuarioId, onSubscriptionClick }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);

  useEffect(() => {
    if (usuarioId) {
      axios
        .get(`${WEBSERVICE_IP}/subscripciones/suscripcion/${usuarioId}`)
        .then((response) => {
          const { suscrito, fechaInicio, fechaFin, tipoSuscripcion, costo, nombre } = response.data;
          setIsSubscribed(suscrito);
          if (suscrito) {
            setSubscriptionDetails({
              fechaInicio,
              fechaFin,
              tipoSuscripcion,
              costo,
              nombre,
            });
          }
        })
        .catch(() => setIsSubscribed(false));
    }
  }, [usuarioId]);

  return (
    <Box
      sx={{
        width: '35%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!isSubscribed ? (
        <Box sx={{ textAlign: 'center', flexGrow: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#809BCE', // Color 809BCE
              marginBottom: 2,
            }}
          >
            Accede a los Reportes
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#95B8D1', // Color 95B8D1
              marginBottom: 3,
            }}
          >
            ¡Suscríbete ahora para desbloquear el acceso a nuestros reportes
            exclusivos!
          </Typography>
          <Lock
            sx={{
              fontSize: 50,
              color: '#809BCE', // Color 809BCE
              marginBottom: 2,
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#809BCE', // Color 809BCE
              '&:hover': {
                backgroundColor: '#95B8D1', // Color 95B8D1
              },
              color: '#FFFFFF',
              fontWeight: 'bold',
            }}
            onClick={onSubscriptionClick}
          >
            Suscribirme
          </Button>
        </Box>
      ) : (
        <Box sx={{ textAlign: 'left', width: '100%', flexGrow: 1 }}>
          <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
            <CheckCircle
              sx={{
                fontSize: 50,
                color: '#95B8D1', // Color 95B8D1
                marginBottom: 1,
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: '#809BCE', // Color 809BCE
              }}
            >
              Suscripción Activa
            </Typography>
          </Box>
<Divider sx={{ marginY: 2 }} />
          <Stack spacing={2}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                color: '#EFA1C4', // Color EFA1C4
                textAlign: 'center',
              }}
            >
              {subscriptionDetails.tipoSuscripcion}
            </Typography>
            <Typography>
              <Person
                sx={{
                  fontSize: 20,
                  verticalAlign: 'middle',
                  marginRight: 1,
                  color: '#809BCE', // Color 809BCE
                }}
              />
              <strong>Usuario:</strong> {subscriptionDetails.nombre}
            </Typography>
            <Typography>
              <AttachMoney
                sx={{
                  fontSize: 20,
                  verticalAlign: 'middle',
                  marginRight: 1,
                  color: '#B8E0D2', // Color B8E0D2
                }}
              />
              <strong>Costo:</strong> ${subscriptionDetails.costo}
            </Typography>
            <Typography>
              <CalendarToday
                sx={{
                  fontSize: 20,
                  verticalAlign: 'middle',
                  marginRight: 1,
                  color: '#EFA1C4', // Color EFA1C4
                }}
              />
              <strong>Fecha de Inicio:</strong>{' '}
              {new Date(subscriptionDetails.fechaInicio).toLocaleDateString()}
            </Typography>
            <Typography>
              <CalendarToday
                sx={{
                  fontSize: 20,
                  verticalAlign: 'middle',
                  marginRight: 1,
                  color: '#EAC4D5', // Color EAC4D5
                }}
              />
              <strong>Fecha de Fin:</strong>{' '}
              {new Date(subscriptionDetails.fechaFin).toLocaleDateString()}
            </Typography>
            <Divider sx={{ marginY: 2 }} />
            <Typography
              variant="body1"
              sx={{
                color: '#95B8D1', 
                textAlign: 'center',
              }}
            >
              ¡Estás suscrito a los reportes exclusivos!
            </Typography>
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default SubscripcionUsuario;
