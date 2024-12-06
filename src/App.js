import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import InicioSesion from './pages/InicioSesion';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Inicio from './pages/Inicio';
import Calendario from './pages/Calendario';
import Registro from './pages/Registro';
import Suscripcion from './pages/Suscripcion';
import Reportes from './pages/Reportes';
import Sugerencias from './pages/Sugerencias';
import Perfil from './pages/Perfil';
import Recuperarc from './pages/Recuperarc';
import Verificacionc from './pages/Verificacionc';
import Acticvidades from './pages/Actividades';
import Notificaciones from './pages/Notificaciones';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3}>
          <Router>
            <div>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/inicio-sesion" element={<InicioSesion />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/calendario" element={<Calendario />} />
                <Route path="/actividades" element={<Acticvidades />} />
                <Route path="/notificaciones" element={<Notificaciones />} />
                <Route path="/suscripcion" element={<Suscripcion />} />
                <Route path="/reportes" element={<Reportes />} />
                <Route path="/sugerencias" element={<Sugerencias />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/recuperarc" element={<Recuperarc />} />
                <Route path="/restablecer/:token" element={<Recuperarc />} />
                <Route path="/verificar/:token" element={<Verificacionc />} />
                </Routes>
            </div>
          </Router>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
export default App;
