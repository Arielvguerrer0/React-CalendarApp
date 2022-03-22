import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';



import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2'

//acciones
import { uiCloseModal } from '../../actions/ui';
import { eventAddNew, eventClearActiveEvent, eventUpdated } from '../../actions/events';

/* estilo para centrar el modal */
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');

  const now = moment().minute(0).second(0).add(1,'hours');
  // se clona la fecha y se le suma una hora.
  const nowPlus1 = now.clone().add(1, 'hours');

  const initialEvent = {
        title: '',
        notes: '',
        start: now.toDate(),
        end: nowPlus1.toDate()
  }


export const CalendarModal = () => {

    const dispatch = useDispatch();

    // useSelector para estar pendiente de el estado especifidado de la store
    const { modalOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );

    const [dateStart, setdateStart] = useState(now.toDate())
    const [dateEnd, setdateEnd] = useState(nowPlus1.toDate())
    const [titleValid, settitleValid] = useState(true)

    const [formValues, setformValues] = useState(initialEvent);

    //desesctructuramos del state para utilizaros en el formulario.
    const { notes, title, start, end  } = formValues;

    useEffect(() => {
        // si existe un evento activo mostramos los datos del objeto
        if( activeEvent ) {
            setformValues( activeEvent )
        } else {
            setformValues( initialEvent )
        }
    }, [activeEvent, setformValues])
    

    const handleInputChange = ({ target }) => {
        setformValues({
            //operador spread para tomar todo el arreglo
            ...formValues,
            // y solo cambiar el que viene por argumento.
            [target.name]: target.value            
        })
    }

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        setformValues( initialEvent );
    }

    const handleStartDateChange = (e) => {
        setdateStart( e );
        setformValues({
            ...formValues,
            start: e
        })
    }
    const handleEndtDateChange = (e) => {
        setdateEnd( e );
        setformValues({
            ...formValues,
            end: e
        })
    }

    // enviar formulario.
    const handleSubmit = (e) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        /* Validaciones */
        // la fecha inicial no puede ser despues que la final.
        if( momentStart.isSameOrAfter( momentEnd ) ) {
            Swal.fire('Error', 'La fecha fin debe ser mayor a la fecha inicial.','error');
        }

        if( title.trim().length < 2 ){
            return settitleValid( false );
        }

        // si existe un evento activo entonces actualizaremos su data.
        if( activeEvent ) {
            dispatch( eventUpdated(formValues) );
        // de lo contrario agregaremos un nuevo evento.
        } else {
            dispatch( eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    name: 'Fernando',
                    clave: 12312
                }
            }) );
        }
    
        // seteamos el titulo en true para que la caja de texto a normal.
        settitleValid(true);
        closeModal();

    }


  return (
    <Modal
        isOpen={ modalOpen }
        //onAfterOpen={afterOpenModal}
        onRequestClose={ closeModal }
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
    >
        
        <h1> { (activeEvent) ? 'Editar Evento' : 'Nuevo Evento'  } </h1>
        <hr />
        <form
            className="container"
            onSubmit={ handleSubmit }

        >

            <div className="form-group">
                <label>Fecha y hora inicio</label>
                <DateTimePicker onChange={ handleStartDateChange }
                 value={dateStart}
                 className="form-control" />
            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker onChange={ handleEndtDateChange }
                 value={dateEnd}
                 //Propiedad para fijar una fecha minima. la fecha final no puede ser menor a la del comienzo del evento.
                 minDate={ dateStart }
                 className="form-control" />
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text"
                    // si el titulo es invalido mostraremos la caja de texto en rojo is-invalid
                    className={`form-control ${!titleValid && 'is-invalid' }  `}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ title }
                    onChange={handleInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ notes }
                    onChange={handleInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
    </Modal>
  )
}
