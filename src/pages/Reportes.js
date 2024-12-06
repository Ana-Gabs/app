// ./pages/Resportes.js
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useNotifications from '../functions/hooks/useNotifications';
import TareasEntregadas from '../components/graphics/TareasEntregadas';
//import TiempoCategorias from '../components/graphics/TiempoCategorias';
//import TiempoProductivo from '../components/graphics/TiempoProductivo';
import ActividadesPorEstado from '../components/graphics/ActividadesPorEstado';

const Stadistics = () => {
  const usuarioId = sessionStorage.getItem('usuarioId');
  useNotifications(usuarioId);
  // Definimos el objeto de estilos
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      backgroundColor: '#f4f6f8',
      minHeight: '100vh', // Ocupa toda la altura de la pantalla
    },
    header: {
      fontSize: '26px',
      marginBottom: '30px',
      color: '#333',
      fontWeight: 'bold',
    },
    chartsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px',
      width: '100%',
      maxWidth: '1200px',
    },
    chart: {
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s ease',
    },
    chartHover: {
      transform: 'translateY(-5px)', // Efecto al hacer hover
    },
  };

  return (
    <div style={{ backgroundColor: '#F4F6FA', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div style={styles.container}>
        <h1 style={styles.header}>Estadísticas de Productividad</h1>
        <div style={styles.chartsContainer}>
          <div
            style={styles.chart}
            onMouseEnter={(e) => (e.currentTarget.style.transform = styles.chartHover.transform)}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
          >
            <TareasEntregadas />
          </div>
          {/*
          <div
            style={styles.chart}
            onMouseEnte r={(e) => (e.currentTarget.style.transform = styles.chartHover.transform)}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
          >
            <TiempoCategorias />
          </div>
          <div
            style={styles.chart}
            onMouseEnter={(e) => (e.currentTarget.style.transform = styles.chartHover.transform)}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
          >
            <TiempoProductivo />

          </div>
*/}
          <div
            style={styles.chart}
            onMouseEnter={(e) => (e.currentTarget.style.transform = styles.chartHover.transform)}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
          >
            <ActividadesPorEstado />
          </div>
        </div>
      </div>
      <Footer />
    </div >
  );
};

export default Stadistics;
