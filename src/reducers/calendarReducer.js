import moment from 'moment'
import { types } from '../types/types';

const initialState = {
    events: [
        {
            id: new Date().getTime(),
            title: 'Fiesta Cumpleaños',
            start: moment().toDate(),
            end: moment().add(2, 'hour').toDate(),
            bcolor: '#fafafa',
            noter: 'Comprar el pastel',
            user: {
            _id: '123',
            name: 'Fernando'
            }
        }
    ],
    activeEvent: null

};

export const calendarReducer = (state = initialState, action ) => {


    switch (action.type) {
        case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return{
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventClearActiveEvent:
            return{
                ...state,
                activeEvent: null
            }
        case types.eventUpdated:
            return{
                ...state,
                // si el evento que viene por parametro es el mismo cuando llamamos la accion entonces actualizaremos el evento seleccionado, de lo contrario retornamos el mismo evento.
                events: state.events.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e
                )
            }
        case types.eventDeleted:
            return{
                ...state,
                // se filtraran todos los eventos que sean diferentes evento activo.
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id ) 
                ),
                // y limpiamos el evento activo.
                activeEvent: null
            }    

        default:
            return state;
    }
}