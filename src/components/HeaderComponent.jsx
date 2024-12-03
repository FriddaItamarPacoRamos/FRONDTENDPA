import React from 'react';
import { NavLink } from 'react-router-dom';

const HeaderComponent = () => {
    return (
        <header>
            <div>
                <h1>MediClinic</h1>
            </div>
            <nav>

                <NavLink to="/">Inicio</NavLink>
                <NavLink to="/products">Product</NavLink>
                <NavLink to="/categories">Categories</NavLink>
                <NavLink to="/orders">Orders</NavLink>
                <NavLink to="/invoices">Invoices</NavLink>
                <NavLink to="/clients">Clients</NavLink>
            </nav>
        </header>
    );
};

export default HeaderComponent;


