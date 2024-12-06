import React from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Fab } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

export default function BotonSave({ onClick, loading }) {
  const colors = {
    initial: '#809BCE',
    hover: '#95B8D1',
    progress: '#95B8D1',
    success: '#EAC4D5',
    successDark: '#EFA1C4',
  };

  const buttonSx = {
    bgcolor: loading ? colors.progress : colors.initial,
    transition: 'background-color 0.3s ease', // Transición suave de colores
    '&:hover': {
      bgcolor: loading ? colors.successDark : colors.hover,
    },
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    position: 'relative',
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* Botón circular */}
      <Box sx={{ m: 1, position: 'relative' }}>
        <Fab
          aria-label="save"
          color="primary"
          sx={buttonSx}
          onClick={onClick}
          disabled={loading} // Deshabilitamos el botón cuando está en carga
        >
          {loading ? (
            <CircularProgress
              size={40}
              sx={{
                color: colors.progress,
                position: 'absolute', // Centrado dentro del botón
              }}
            />
          ) : (
            <SaveIcon />
          )}
        </Fab>
      </Box>

      {/* Botón alternativo (opcional, para texto) */}
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: colors.initial,
            '&:hover': { bgcolor: colors.hover },
            width: '200px',
            transition: 'background-color 0.3s ease',
          }}
          disabled={loading}
          onClick={onClick}
        >
          ACTUALIZAR DATOS
        </Button>
        {loading && (
          <CircularProgress
            size={24}
            sx={{
              color: colors.progress,
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  );
}
