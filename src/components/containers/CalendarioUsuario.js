import React, { useState, useEffect } from 'react';
import {WEBSERVICE_IP} from '../../functions/roots/webserviceIP';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import EditarActividadModal from '../modals/EditarActividad';
import AgregarActividad from '../modals/AgregarActividad';

moment.locale('es');
const localizer = momentLocalizer(moment);

const CalendarioUsuario = () => {
  const [events, setEvents] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [usuarioId] = useState(sessionStorage.getItem('usuarioId'));

  const fetchActividades = async () => {
    if (!usuarioId) {
      console.error('No se encontró el ID de usuario en sessionStorage');
      return;
    }

    try {
      const response = await fetch(`${WEBSERVICE_IP}/actividades/usuario/${usuarioId}`);
      if (response.ok) {
        const data = await response.json();
        const mappedEvents = data.map(actividad => ({
          id: actividad._id.toString(),  // Convertir a string el _id si es necesario
          start: new Date(actividad.fechaInicio),
          end: new Date(actividad.fechaFin),
          title: actividad.nombreActividad,
        }));
        setEvents(mappedEvents);
      } else {
        console.error('Error al obtener actividades:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener las actividades:', error);
    }
  };

  useEffect(() => {
    fetchActividades();
  }, [usuarioId]);

  const handleEventClick = async (event) => {
    try {
      const response = await fetch(`${WEBSERVICE_IP}/actividades/${event.id}`);
      if (response.ok) {
        const actividadCompleta = await response.json();
        if (actividadCompleta._id) {
          actividadCompleta._id = String(actividadCompleta._id);
          setSelectedEvent(actividadCompleta);
          setOpenEditModal(true);
        } else {
          console.error('La actividad seleccionada no tiene un ID válido');
        }
      } else {
        console.error('Error al obtener los detalles de la actividad:', response.statusText);
      }
    } catch (error) {
      console.error('Error al obtener los detalles de la actividad:', error);
    }
  };

  const handleDateClick = (date) => {
    setSelectedDate(date.start);
    setOpenAddModal(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600, margin: '50px' }}
        views={['month', 'week', 'day']}
        defaultView="month"
        onSelectEvent={handleEventClick}
        onSelectSlot={handleDateClick}
        selectable={true}
      />

      {selectedEvent && (
        <EditarActividadModal
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          actividad={selectedEvent}
          onSubmit={() => {
            fetchActividades(); 
            setOpenEditModal(false);
          }}
        />
      )}

      <AgregarActividad
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        usuarioId={usuarioId}
        fechaSeleccionada={selectedDate}
        onSubmit={() => {
          fetchActividades();
          setOpenAddModal(false);
        }}
      />
    </div>
  );
};

export default CalendarioUsuario;
