import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from 'react-router-dom';
import '../App.css';

const Notificacion = ({ tipo, text, date, id, onDelete, onMarkAsRead, leida }) => {
  const getStyles = (tipo) => {
    switch (tipo) {
      case 1:
        return { color: 'green' };
      case 2:
        return { color: 'orange' };
      case 3:
        return { color: 'blue' };
      case 4:
        return { color: 'purple' };
      default:
        return {};
    }
  };

  const getIcon = (tipo) => {
    switch (tipo) {
      case 1:
        return <CheckCircleIcon style={{ color: 'green' }} />;
      case 2:
        return <WarningIcon style={{ color: 'orange' }} />;
      case 3:
        return <ScheduleIcon style={{ color: 'blue' }} />;
      case 4:
        return <LightbulbIcon style={{ color: 'purple' }} />;
      default:
        return null;
    }
  };

  const handleMarkAsRead = async () => {
    try {
      await onMarkAsRead(id);
    } catch (err) {
      console.error('Error al marcar como leída:', err);
    }
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <Card
      sx={{
        margin: '15px 0',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        animation: leida ? '' : 'jump 1s infinite',
      }}
    >
      <CardContent>
        <Typography variant="body1" sx={getStyles(tipo)}>
          {getIcon(tipo)} {text}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', gap: '40px' }}>
        <div style={{ display: 'flex', gap: '20px' }}>
          <Link to="/actividades" style={{ textDecoration: 'none' }}>
            <Button
              size="small"
              color="primary"
              startIcon={<VisibilityIcon />}
              onClick={handleMarkAsRead}
            >
              Ver Más
            </Button>
          </Link>
          <Button
            size="small"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
          >
            Eliminar
          </Button>
        </div>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="caption" color="text.secondary">
            Fecha: {date}
          </Typography>
        </Box>
      </CardActions>
    </Card>
  );
};

export default Notificacion;
