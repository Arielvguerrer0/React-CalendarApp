import React from 'react'

export const NavBar = () => {
  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
        <span className='navbar-brand'>
            Pedro
        </span>

        <button className='btn btn-outline-danger'>
            {/* boton de salir con font-awesome */}
            <i className='fas fa-sign-out-alt'></i>
            <span> Salir</span>
        </button>

    </div>
  )
}
