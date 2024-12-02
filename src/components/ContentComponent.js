import React from 'react';

const ContentComponent = () => {
    return (
        <div className="content">
            <div className="column">
                <img src="https://via.placeholder.com/300" alt="Medicinas" />
                <h2>Horarios médicos</h2>
                <p>Nuestra farmacia está siempre abierta para ti.</p>
            </div>
            <div className="column">
                <h2>Cuidado de la Salud</h2>
                <p>Estamos disponibles 24/7 para cuidar de ti.</p>
                <p><strong>Carmen Sandoval</strong></p>
            </div>
            <div className="column">
                <h2>La salud es nuestro mundo</h2>
                <p>Especialistas atentos a tus necesidades médicas.</p>
            </div>
        </div>
    );
};

export default ContentComponent;
