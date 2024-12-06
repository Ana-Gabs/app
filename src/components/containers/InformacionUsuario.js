import React, { useState, useEffect } from 'react';
import { WEBSERVICE_IP } from '../../functions/roots/webserviceIP';
import { Avatar, TextField, Grid, Box, Typography } from '@mui/material';
import CircularIntegration from '../../functions/BotonSave'; // Componente actualizado
import { useSnackbar } from 'notistack';
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const InformacionUsuario = () => {
  const defaultAvatar = '/images/avatars/user_default.png';
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [usuarioId] = useState(sessionStorage.getItem('usuarioId'));
  const [loading, setLoading] = useState(false); // Estado de carga
  const [success, setSuccess] = useState(false); // Estado de éxito

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`${WEBSERVICE_IP}/usuarios/usuario/${usuarioId}`);
        if (!response.ok) throw new Error('Error al obtener los datos del usuario');
        const data = await response.json();
        setUsuario(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (usuarioId) fetchUsuario();
  }, [usuarioId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!usuario.nombre || !usuario.correo) {
      enqueueSnackbar('Por favor, llena todos los campos obligatorios', { variant: 'warning' });
      return;
    }
  
    setLoading(true);
    setSuccess(false);
  
    try {
      const response = await fetch(`${WEBSERVICE_IP}/usuarios/usuario/actualizar/${usuarioId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
      });
  
      // Introducimos un retraso artificial
      await delay(2000); // 2 segundos
  
      if (!response.ok) throw new Error('Error al actualizar los datos');
  
      setSuccess(true); // Marca éxito
      enqueueSnackbar('Datos actualizados correctamente', { variant: 'success' });
    } catch (err) {
      enqueueSnackbar('Hubo un problema al guardar los datos', { variant: 'error' });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <p>Error: {error}</p>;
  if (!usuario) return <p>Cargando...</p>;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{
          color: '#809BCE',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 3,
        }}
      >
        Información del Usuario
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3} style={{ textAlign: 'center' }}>
          <Avatar
            alt="Perfil del usuario"
            src={usuario.imagenPerfil || defaultAvatar}
            sx={{
              width: '100%', // Hacemos que el avatar sea 100% del contenedor
              maxWidth: 150, // Máximo de 150px en pantallas grandes
              height: 'auto', // Altura automática para mantener la proporción
              marginBottom: 2,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            label="Nombre"
            name="nombre"
            value={usuario.nombre || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Apellido Paterno"
            name="app"
            value={usuario.app || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Apellido Materno"
            name="apm"
            value={usuario.apm || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Correo"
            name="correo"
            value={usuario.correo || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 1 }}
          />
          <TextField
            label="Teléfono"
            name="telefono"
            value={usuario.telefono || ''}
            onChange={handleInputChange}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="flex-end">
            <CircularIntegration
              onClick={handleSave} // Vinculado al método guardar
              loading={loading}
              success={success}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InformacionUsuario;
