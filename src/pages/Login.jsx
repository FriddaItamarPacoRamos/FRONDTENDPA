import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/gfix-logo.png';

function Login({ onLogin }) {
    const [nombre, setNombre] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('cliente');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre && password) {
            onLogin();
            navigate(`/${rol}`);
        }
    };

    const textoColor = '#8B0000';

    return (
        <div className="d-flex vh-100">
            {/* LADO IZQUIERDO */}
            <div
                className="d-flex flex-column justify-content-center align-items-center w-50"
                style={{
                    backgroundColor: '#121212',
                    color: '#fff',
                    fontFamily: 'Segoe UI, Roboto, sans-serif'
                }}
            >
                <img
                    src={logo}
                    alt="Logo G-Fix"
                    style={{ width: '820px', marginBottom: '20px' }}
                />
                <h2 className="fw-bold mb-3">G-Fix</h2>
                <p
                    className="text-center"
                    style={{ maxWidth: '380px', fontSize: '16px', lineHeight: '1.5' }}
                >
                    Sistema de gestión de cotizaciones y órdenes de trabajo para mantenimiento industrial.
                </p>
            </div>

            {/* LADO DERECHO */}
            <div className="d-flex align-items-center justify-content-center w-50" style={{ backgroundColor: '#7a0000' }}>
                <div
                    className="bg-white p-4 rounded shadow"
                    style={{
                        width: '100%',
                        maxWidth: '400px',
                        borderTop: `5px solid ${textoColor}`,
                        fontFamily: 'Segoe UI, Roboto, sans-serif'
                    }}
                >
                    <h4 className="text-center mb-3 fw-bold" style={{ color: textoColor }}>
                        Iniciar Sesión
                    </h4>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label" style={{ color: textoColor }}>Nombre</label>
                            <input
                                type="text"
                                className="form-control border-danger"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label" style={{ color: textoColor }}>Contraseña</label>
                            <input
                                type="password"
                                className="form-control border-danger"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label" style={{ color: textoColor }}>Tipo de Usuario</label>
                            <select
                                className="form-select border-danger"
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                            >
                                <option value="cliente">Cliente</option>
                                <option value="proveedor">Proveedor</option>
                            </select>
                        </div>

                        <button type="submit" className="btn btn-dark w-100">Ingresar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
