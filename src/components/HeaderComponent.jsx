import React from 'react'
import { NavLink } from 'react-router-dom'

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className='d-flex align-content-center navbar navbar-expand-lg navbar-dark bg-dark'>
                    <a className="navbar-brand" >FARMACIA FYK</a>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/products'>Products</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink className='nav-link' to='/categories'>Categories</NavLink>
                            </li>

                            {/* Nuevo enlace para Orders */}
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/orders'>Orders</NavLink>
                            </li>

                            {/* Nuevo enlace para Clients */}
                            <li className="nav-item">
                                <NavLink className='nav-link' to='/clients'>Clients</NavLink>
                            </li>
                        </ul>
                    </div>

                </nav>
            </header>

        </div>
    )
}

export default HeaderComponent

