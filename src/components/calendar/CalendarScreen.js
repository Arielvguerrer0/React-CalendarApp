import React, { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'


import { NavBar } from '../ui/NavBar'
import { messages } from '../../helpers/calendar-messager-esp'
import { CalendarEvent } from './CalendarEvent'
import { CalendarModal } from './CalendarModal'

//Acciones
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events'

//botones
import { AddNewFab } from '../ui/AddNewFab'
import { DeleteEventFab } from '../ui/DeleteEventFab'

//Estilo del calendario
//https://jquense.github.io/react-big-calendar/examples/index.html?path=/story/about-big-calendar--page DOCUMENTACION
import 'react-big-calendar/lib/css/react-big-calendar.css'
//importacion para configurar el idioma de local.
import 'moment/locale/es';
// cambiamos el nombre de las fechas a español
moment.locale('es');

const localizer = momentLocalizer(moment); // or globalizeLocalizer

export const CalendarScreen = () => {

  const dispatch = useDispatch()

  // desde el store extraemos los events
  const { events, activeEvent } = useSelector( state => state.calendar );


  const [lastView, setlastView] = useState(localStorage.getItem('lastView') || 'month'  );

  const onDobleClick = (e) => {
    // hacemos el dispatch de la accion
    dispatch( uiOpenModal() );
  };

  const onSelectEvent = (e) => {
    dispatch( eventSetActive(e) );
  };

  const onViewChange = (e) => {
    setlastView(e);
    localStorage.setItem('lastView', e);
  };

  const onSelectSlot = (e) => {
    dispatch( eventClearActiveEvent() );
  }


  const eventStyleGetter = ( events, start, end, isSelected ) => {
    //console.log(events, start, end, isSelected);
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: '0px',
      opacity: 0.8,
      display: 'block',
      color: 'white'
    }

    return {
      style
    }
  };


  return (
    <div className='calendar-screen'>
        <NavBar />
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          messages={messages}
          eventPropGetter={eventStyleGetter}
          onDoubleClickEvent={ onDobleClick }
          onSelectEvent={onSelectEvent}
          onView={onViewChange}
          onSelectSlot={ onSelectSlot }
          selectable={ true }
          view={ lastView }
          components={{
            event: CalendarEvent
          }}
        />

      
        <AddNewFab />
        {
          // si el activeEvent es diferente a null mostramos el boton 
          ( activeEvent ) && <DeleteEventFab />
        }

        <CalendarModal />
    </div>
  )
}
