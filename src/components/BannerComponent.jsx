import React from 'react';

const BannerComponent = () => {
    return (
        <div className="banner">
            <img src="https://via.placeholder.com/1200x400" alt="Banner" />
            <div className="text">
                <h1>Farmacia</h1>
                <p>Proveedores de servicios de salud</p>
                <button>Aprende más</button>
            </div>
        </div>
    );
};

export default BannerComponent;
