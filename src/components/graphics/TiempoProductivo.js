import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TiempoProductivo = () => {
  //const usuarioId = sessionStorage.getItem('usuarioId');
  const data = {
    labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
    datasets: [
      {
        label: 'Horas Productivas',
        data: [5, 6, 7, 8, 6, 5, 4], 
        borderColor: '#f87887',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        pointBackgroundColor: '#f87887',
        pointBorderColor: '#f87887',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Tiempo Productivo Durante la Semana' },
    },
  };

  return <Line data={data} options={options} />;
};

export default TiempoProductivo;
