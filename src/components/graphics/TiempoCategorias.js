import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const TiempoCategorias = () => {
  //const usuarioId = sessionStorage.getItem('usuarioId');
  const data = {
    labels: ['Trabajo', 'Estudio', 'Ejercicio', 'Ocio', 'Otros'],
    datasets: [
      {
        data: [35, 15, 5, 10, 3], // Reemplaza estos valores con datos dinámicos si es necesario
        backgroundColor: ['#92ccb6', '#f87887', '#f3d597', '#9e6b7c', '#b6d89c'],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Distribución del Tiempo Dedicado en la Semana' },
    },
  };

  return <Pie data={data} options={options} />;
};

export default TiempoCategorias;
