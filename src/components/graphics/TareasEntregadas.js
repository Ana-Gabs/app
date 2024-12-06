import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { WEBSERVICE_IP } from '../../functions/roots/webserviceIP';

// Registrar los elementos de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TareasSemanal = () => {
  const [semanalData, setSemanalData] = useState({ semanas: [], entregadas: [], noEntregadas: [] });
  const usuarioId = sessionStorage.getItem('usuarioId');
  //console.log(usuarioId);

  // Fetch de datos del backend
  useEffect(() => {
    fetch(`${WEBSERVICE_IP}/reportes/conteo-actividades-semanal`)
      .then(response => response.json())
      .then(data => {
        const semanas = data.map(item => `Semana ${item._id}`); // Etiquetas de las semanas
        const entregadas = data.map(item => item.entregadas);
        const noEntregadas = data.map(item => item.noEntregadas);

        setSemanalData({ semanas, entregadas, noEntregadas });
      })
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  // Datos para la gráfica
  const data = {
    labels: semanalData.semanas,
    datasets: [
      {
        label: 'Entregadas',
        data: semanalData.entregadas,
        backgroundColor: '#b6d89c', // Color para tareas entregadas
      },
      {
        label: 'No Entregadas',
        data: semanalData.noEntregadas,
        backgroundColor: '#f87887', // Color para tareas no entregadas
      },
    ],
  };

  // Opciones de configuración para la gráfica
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true }, // Mostrar la leyenda de la gráfica
      title: { display: true, text: 'Tareas Entregadas vs No Entregadas por Semana' },
    },
  };

  // Renderizar la gráfica
  return <Bar data={data} options={options} />;
};

export default TareasSemanal;
