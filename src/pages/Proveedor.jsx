import { useState } from 'react';
import Inventario from './proveedor/Inventario';
import RegistroProducto from './proveedor/RegistroProducto';
import PedidosCliente from './proveedor/PedidosCliente';

function Proveedor() {
    const [pestanaActiva, setPestanaActiva] = useState('inventario');

    const renderContenido = () => {
        switch (pestanaActiva) {
            case 'inventario':
                return <Inventario />;
            case 'registro':
                return <RegistroProducto />;
            case 'pedidos':
                return <PedidosCliente />;
            default:
                return <Inventario />;
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center text-danger mb-4">Panel del Proveedor</h2>

            <div className="d-flex justify-content-center mb-4">
                <button
                    className={`btn btn-outline-dark mx-2 ${pestanaActiva === 'inventario' && 'active'}`}
                    onClick={() => setPestanaActiva('inventario')}
                >
                    Inventario
                </button>
                <button
                    className={`btn btn-outline-dark mx-2 ${pestanaActiva === 'registro' && 'active'}`}
                    onClick={() => setPestanaActiva('registro')}
                >
                    Registrar Producto
                </button>
                <button
                    className={`btn btn-outline-dark mx-2 ${pestanaActiva === 'pedidos' && 'active'}`}
                    onClick={() => setPestanaActiva('pedidos')}
                >
                    Pedidos de Clientes
                </button>
            </div>

            <div>{renderContenido()}</div>
        </div>
    );
}

export default Proveedor;
