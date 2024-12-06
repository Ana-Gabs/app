import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import EventIcon from '@mui/icons-material/Event';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Swal from 'sweetalert2';
import axios from 'axios';
import {WEBSERVICE_IP} from '../functions/roots/webserviceIP';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Verificación de sesión
  useEffect(() => {
    const storedUserId = sessionStorage.getItem('usuarioId');
    const storedUserName = sessionStorage.getItem('nombre');

    if (storedUserId && storedUserName) {
      setUser({ id: storedUserId, name: storedUserName });

      // Verificar suscripción
      axios
        .get(`${WEBSERVICE_IP}/subscripciones/suscripcion/${storedUserId}`)
        .then((response) => {
          setIsSubscribed(response.data.suscrito);
        })
        .catch(() => {
          setIsSubscribed(false);
        });
    } else if (location.pathname !== '/inicio-sesion' && location.pathname !== '/') {
      navigate('/inicio-sesion');
    }
  }, [location, navigate]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleProtectedNavigation = (path) => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate(path);
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Inicio de sesión requerido',
        text: 'Por favor, inicia sesión para acceder.',
      }).then(() => {
        navigate('/inicio-sesion');
      });
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'white' }}>
        <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src="/images/g_day-h-16x9.png"
              alt="DevU Logo"
              style={{ maxHeight: '60px', marginRight: '15px' }}
            />
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '10px' }}>
          <Button
          sx={{ color: '#809BCE' }}
          onClick={() => handleProtectedNavigation('/calendario')}
          startIcon={<EventIcon />}
        >
          CALENDARIO
        </Button>
            <Button sx={{ color: '#809BCE' }} component={Link} to="/actividades" startIcon={<ListAltIcon />}>
              ACTIVIDADES
            </Button>
            {isSubscribed && (
              <Button
                sx={{ color: '#809BCE' }}
                component={Link}
                to="/reportes"
                startIcon={<ListAltIcon />}
              >
                REPORTES
              </Button>
            )}
           
            <Button sx={{ color: '#809BCE' }} component={Link} to="/notificaciones" startIcon={<NotificationsNoneIcon />}>
              NOTIFICACIONES
            </Button>
            {user ? (
              <>
                <Button
                  sx={{ color: '#809BCE' }}
                  onClick={() => handleProtectedNavigation('/perfil')}
                  startIcon={<AccountCircleIcon />}
                >
                  PERFIL
                </Button>
                <Button sx={{ color: '#809BCE' }} onClick={logout} startIcon={<ExitToAppIcon />}>
                  SALIR
                </Button>
              </>
            ) : (
              <>
                <Button sx={{ color: '#809BCE' }} component={Link} to="/acceso" startIcon={<LoginIcon />}>
                  ACCESO
                </Button>
                <Button sx={{ color: '#809BCE' }} component={Link} to="/registro" startIcon={<AppRegistrationIcon />}>
                  REGISTRO
                </Button>
              
              </>
            )}
          </Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{
              display: { xs: 'inline', md: 'none' },
              color: '#809BCE',
              alignSelf: 'center',
              height: '100%',
            }}
            onClick={toggleMenu}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>

      {menuOpen && (
        <Box
          sx={{
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            alignItems: 'flex-start',
            bgcolor: 'white',
            padding: '10px',
            position: 'absolute',
            top: '64px',
            left: 0,
            right: 0,
            zIndex: 1300,
          }}
        >
          <Button sx={{ color: '#809BCE' }} component={Link} to="/calendario" startIcon={<EventIcon />}>
            CALENDARIO
          </Button>
          <Button sx={{ color: '#809BCE' }} component={Link} to="/actividades" startIcon={<ListAltIcon />}>
            ACTIVIDADES
          </Button>
          {isSubscribed && (
              <Button
                sx={{ color: '#809BCE' }}
                component={Link}
                to="/reportes"
                startIcon={<ListAltIcon />}
              >
                REPORTES
              </Button>
            )}
          <Button sx={{ color: '#809BCE' }} component={Link} to="/notificaciones" startIcon={<NotificationsNoneIcon />}>
            NOTIFICACIONES
          </Button>
          {user ? (
            <>
              <Button
                sx={{ color: '#809BCE' }}
                onClick={() => handleProtectedNavigation('/perfil')}
                startIcon={<AccountCircleIcon />}
              >
                PERFIL
              </Button>
              <Button sx={{ color: '#809BCE' }} onClick={logout} startIcon={<ExitToAppIcon />}>
                SALIR
              </Button>
            </>
          ) : (
            <>
              <Button sx={{ color: '#809BCE' }} component={Link} to="/acceso" startIcon={<LoginIcon />}>
                ACCESO
              </Button>
              <Button sx={{ color: '#809BCE' }} component={Link} to="/registro" startIcon={<AppRegistrationIcon />}>
                REGISTRO
              </Button>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
