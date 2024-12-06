import React, { useState, useEffect } from 'react';
import { WEBSERVICE_IP } from '../../functions/roots/webserviceIP';
import {
  Box, Grid, Typography, Button, Accordion, AccordionSummary, AccordionDetails,
  IconButton, Chip, LinearProgress, Checkbox, FormControlLabel,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ActividadesUsuario = () => {
  const [actividades, setActividades] = useState([]);
  const [tipo, setTipo] = useState('nocompletadas'); // Por defecto: 'No Completadas'
  const [loading, setLoading] = useState(false); // Para mostrar el estado de carga
  const usuarioId = sessionStorage.getItem('usuarioId');

  const fetchActividades = async (tipo) => {
    try {
      setLoading(true);
      const url = `${WEBSERVICE_IP}/actividades/${tipo}/${usuarioId}`;
      const response = await fetch(url);
      const data = await response.json();
      if (Array.isArray(data)) {
        setActividades(data);
      } else {
        console.error('La respuesta no es un array:', data);
        setActividades([]);
      }
    } catch (error) {
      console.error('Error al obtener las actividades:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (usuarioId) {
      fetchActividades(tipo);
    }
  }, [usuarioId, tipo]);

  const handleDelete = async (actividadId) => {
    try {
      const response = await fetch(`${WEBSERVICE_IP}/actividades/eliminar/${actividadId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setActividades(actividades.filter((actividad) => actividad._id !== actividadId));
      }
    } catch (error) {
      console.error('Error al eliminar la actividad:', error);
    }
  };

const handleCheckboxChange = async (actividadId, isChecked) => {
  // Optimización: cambiar el estado localmente antes de realizar la llamada
  const updatedActividades = actividades.map((actividad) =>
    actividad._id === actividadId
      ? { ...actividad, estado: isChecked ? 'Terminada' : 'Pendiente' }
      : actividad
  );
  
  setActividades(updatedActividades);

  try {
    const endpoint = isChecked
      ? `${WEBSERVICE_IP}/actividades/terminar/${actividadId}`
      : `${WEBSERVICE_IP}/actividades/pendiente/${actividadId}`;

    const response = await fetch(endpoint, {
      method: 'PUT',
    });

    if (response.ok) {
      // Si la actividad se marca como "terminada" y el servidor lo confirma, eliminamos la actividad de la lista
      if (isChecked) {
        setActividades((prevActividades) =>
          prevActividades.filter((actividad) => actividad._id !== actividadId)
        );
      }
    } else {
      console.error('Error al actualizar la actividad:', await response.text());
      // Si ocurre un error, revertir el cambio local
      setActividades((prevActividades) =>
        prevActividades.map((actividad) =>
          actividad._id === actividadId
            ? { ...actividad, estado: isChecked ? 'Pendiente' : 'Terminada' }
            : actividad
        )
      );
    }
  } catch (error) {
    console.error('Error al manejar el cambio de checkbox:', error);
    // Si ocurre un error, revertir el cambio local
    setActividades((prevActividades) =>
      prevActividades.map((actividad) =>
        actividad._id === actividadId
          ? { ...actividad, estado: isChecked ? 'Pendiente' : 'Terminada' }
          : actividad
      )
    );
  }
};


  const getChipColor = (value) => {
    switch (value) {
      case 'Alta':
        return '#EFA1C4';
      case 'Media':
        return '#809BCE';
      case 'Baja':
        return '#B8E0D2';
      default:
        return '#95B8D1';
    }
  };

  const buttonStyles = (buttonType) => ({
    backgroundColor: tipo === buttonType ? '#95B8D1' : '#B8E0D2',
    color: '#FFFFFF',
    textTransform: 'none',
    margin: '0 5px',
    fontWeight: 'bold',
    ':hover': {
      backgroundColor: tipo === buttonType ? '#7EAAC4' : '#A9D1C5',
    },
  });

  const activityTextStyles = {
    color: '#EAC4D5', // Color rosado para el nombre y el icono de la actividad
    fontWeight: 'bold',
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(); // Solo mostrar la fecha
  };

  const getDificultadPorcentaje = (dificultad) => {
    return (dificultad - 1) * 20; // Escala de 1-5 => 20-100%
  };

  const getDificultadColor = (dificultad) => {
    const porcentaje = getDificultadPorcentaje(dificultad);
    if (porcentaje <= 40) return '#66BB6A'; // Verde para dificultad baja
    if (porcentaje <= 70) return '#FFEB3B'; // Amarillo para dificultad media
    return '#FF7043'; // Rojo para dificultad alta
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Botones de Filtro */}
      <Box display="flex" justifyContent="center" marginBottom="20px">
        <Button
          variant="contained"
          sx={buttonStyles('pendientes')}
          onClick={() => setTipo('pendientes')}
        >
          Pendientes
        </Button>
        <Button
          variant="contained"
          sx={buttonStyles('enproceso')}
          onClick={() => setTipo('enproceso')}
        >
          En Proceso
        </Button>
        <Button
          variant="contained"
          sx={buttonStyles('nocompletadas')}
          onClick={() => setTipo('nocompletadas')}
        >
          No Completadas
        </Button>
        <Button
          variant="contained"
          sx={buttonStyles('terminadas')}
          onClick={() => setTipo('terminadas')}
        >
          Terminadas
        </Button>
      </Box>

      {/* Indicador de carga */}
      {loading && <LinearProgress />}

      {/* Actividades */}
      {actividades.length === 0 ? (
        <Typography variant="h6" color="textSecondary" textAlign="center">
          No tienes actividades {tipo}.
        </Typography>
      ) : (
        actividades.map((actividad) => (
          <Accordion
            key={actividad._id}
            sx={{
              marginBottom: '10px',
              border: '1px solid #D6EADF',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ fontSize: '3rem', color: '#EAC4D5' }} />}
              sx={{
                backgroundColor: '#FFFFFF',
                color: '#333',
                padding: '10px',
              }}
            >
              <Typography variant="h6" sx={activityTextStyles}>
                {actividad.nombreActividad}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: '#FFFFFF', padding: '15px' }}>
              <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '10px' }}>
                {actividad.descripcion}
              </Typography>
              <Box display="flex" justifyContent="space-between" marginBottom="10px">
                <Chip
                  icon={<PriorityHighIcon />}
                  label={`Importancia: ${actividad.importancia}`}
                  sx={{
                    backgroundColor: getChipColor(actividad.importancia),
                    color: '#FFFFFF',
                  }}
                />
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`Urgencia: ${actividad.urgencia}`}
                  sx={{
                    backgroundColor: getChipColor(actividad.urgencia),
                    color: '#FFFFFF',
                  }}
                />
              </Box>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={6} display="flex" justifyContent="center">
                  <Typography variant="body2" color="textSecondary">
                    <strong>Inicio:</strong> {formatDate(actividad.fechaInicio)}
                  </Typography>
                </Grid>
                <Grid item xs={6} display="flex" justifyContent="center">
                  <Typography variant="body2" color="textSecondary">
                    <strong>Fin:</strong> {formatDate(actividad.fechaFin)}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ marginBottom: '15px', textAlign: 'center' }}>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ marginBottom: '20px', fontWeight: 'bold' }}
                >
                  Gráfico de Dificultad
                </Typography>
                <Box sx={{ position: 'relative' }}>
                  <LinearProgress
                    variant="determinate"
                    value={getDificultadPorcentaje(actividad.dificultad)}
                    sx={{
                      height: 10,
                      borderRadius: '5px',
                      backgroundColor: '#f0f0f0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: getDificultadColor(actividad.dificultad),
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{
                      position: 'absolute',
                      top: '-20px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontWeight: 'bold',
                      color: getDificultadColor(actividad.dificultad),
                    }}
                  >
                    {getDificultadPorcentaje(actividad.dificultad)}%
                  </Typography>
                </Box>
              </Box>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={actividad.estado === 'Terminada'}
                    onChange={(e) => handleCheckboxChange(actividad._id, e.target.checked)}
                    sx={{
                      color: actividad.estado === 'Terminada' ? '#66BB6A' : '#FF7043',
                      '&.Mui-checked': {
                        color: '#66BB6A',
                      },
                    }}
                  />
                }
                label={actividad.estado === 'Terminada' ? 'Completada' : 'Pendiente'}
              />


              <Box display="flex" justifyContent="flex-end" marginTop="10px">
                <IconButton
                  onClick={() => handleDelete(actividad._id)}
                  color="error"
                  aria-label="eliminar"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Box>
  );
};

export default ActividadesUsuario;
