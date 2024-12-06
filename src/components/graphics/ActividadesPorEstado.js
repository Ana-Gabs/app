import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title } from 'chart.js';

ChartJS.register(Tooltip, Legend, ArcElement, Title);

const ActividadesPorEstado = () => {
  const [chartData, setChartData] = useState(null); // Datos de la gráfica
  const [semanaSeleccionada, setSemanaSeleccionada] = useState(''); // Semana seleccionada
  const [semanasDisponibles, setSemanasDisponibles] = useState([]); // Lista de semanas disponibles
  const [todosLosDatos, setTodosLosDatos] = useState([]); // Todos los datos recibidos

  // Datos estáticos simulados
  const datosEstaticos = [
    { _id: { semana: 1, estado: 'Activo' }, total: 30 },
    { _id: { semana: 1, estado: 'Inactivo' }, total: 20 },
    { _id: { semana: 2, estado: 'Activo' }, total: 25 },
    { _id: { semana: 2, estado: 'Inactivo' }, total: 15 },
    { _id: { semana: 2, estado: 'Pendiente' }, total: 10 },
  ];

  // Simular la carga de datos al cargar el componente
  useEffect(() => {
    const semanas = [...new Set(datosEstaticos.map(item => item._id.semana))];
    setSemanasDisponibles(semanas);

    setTodosLosDatos(datosEstaticos);

    // Seleccionar automáticamente la primera semana
    const primeraSemana = semanas[0];
    setSemanaSeleccionada(primeraSemana);
    procesarDatosParaSemana(datosEstaticos, primeraSemana);
  }, []);

  // Procesar datos para una semana seleccionada
  const procesarDatosParaSemana = (datos, semana) => {
    if (!datos || datos.length === 0) return;

    // Filtrar los datos para la semana seleccionada
    const datosSemana = datos.filter(item => item._id.semana === parseInt(semana));

    // Extraer los estados y calcular totales
    const estados = [...new Set(datosSemana.map(item => item._id.estado))];
    const totalesPorEstado = estados.map(estado =>
      datosSemana
        .filter(item => item._id.estado === estado)
        .reduce((total, item) => total + item.total, 0)
    );

    // Generar colores dinámicos
    const colores = ['#36a2eb', '#cc65fe', '#ffce56', '#ff6384', '#4bc0c0', '#9966ff', '#c9cbcf'];

    // Configurar los datos para la gráfica
    setChartData({
      labels: estados,
      datasets: [
        {
          label: `Actividades en Semana ${semana}`,
          data: totalesPorEstado,
          backgroundColor: estados.map((_, index) => colores[index % colores.length]),
        },
      ],
    });
  };

  // Manejar cambios en la selección de semana
  const handleSemanaChange = (event) => {
    const nuevaSemana = event.target.value;
    setSemanaSeleccionada(nuevaSemana);

    // Filtrar los datos ya cargados para la nueva semana
    procesarDatosParaSemana(todosLosDatos, nuevaSemana);
  };

  if (!semanasDisponibles || semanasDisponibles.length === 0) {
    return <p>No se encontraron semanas disponibles.</p>;
  }

  if (!chartData) {
    return <p>No hay datos para mostrar en la gráfica.</p>;
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `Distribución de Actividades por Estado (Semana ${semanaSeleccionada})` },
    },
  };

  return (
    <div>
      <label htmlFor="semana-select">Selecciona la Semana:</label>
      <select id="semana-select" onChange={handleSemanaChange} value={semanaSeleccionada}>
        {semanasDisponibles.map(semana => (
          <option key={semana} value={semana}>Semana {semana}</option>
        ))}
      </select>

      <div>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ActividadesPorEstado;
