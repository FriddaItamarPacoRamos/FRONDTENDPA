import React, { useEffect, useState } from 'react';
import { deleteOrder, getAllOrders } from '../services/OrderService.js';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from "../components/HeaderComponent.jsx";

const ListOrderComponent = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    // Cargar las órdenes cuando el componente se monta
    useEffect(() => {
        listAllOrders();
    }, []);

    // Función para cargar todas las órdenes
    function listAllOrders() {
        getAllOrders().then((response) => {
            setOrders(response.data);  // Establecer las órdenes obtenidas en el estado
            console.log(response.data); // Para depuración
        }).catch(error => {
            console.error("Error fetching orders:", error);  // Si hay un error al obtener las órdenes
        });
    }

    // Función para navegar a la página de actualización de una orden
    function updateOrder(id) {
        navigate(`/edit-order/${id}`);  // Corregir la sintaxis para la ruta
    }

    // Función para eliminar una orden
    function removeOrder(id) {
        if (window.confirm("Are you sure you want to delete this order?")) {
            deleteOrder(id).then(() => {
                listAllOrders(); // Recargar las órdenes después de eliminar
            }).catch(error => {
                console.error("Error deleting order:", error);  // Si hay un error al eliminar la orden
            });
        }
    }

    return (
        <div className="container">
            <HeaderComponent />
            <h2 className="text-center">List of Orders</h2>
            <button className="btn btn-primary mb-2" onClick={() => navigate('/create-order')}>Add Order</button>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Client</th>
                    <th>Total Products</th>
                    <th>Total Amount</th>
                    <th>Products</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.clientId}</td>
                        <td>{order.totalProduct}</td>
                        <td>{order.totalMont}</td>
                        <td>
                            {order.products.map(product => (
                                <p key={product.id}>
                                    {product.nameProduct} - {product.quantity} x {product.price} = {product.price * product.quantity}
                                </p>
                            ))}
                        </td>
                        <td>
                            <button className="btn btn-info" onClick={() => updateOrder(order.id)}>Update</button>
                            <button className="btn btn-danger" onClick={() => removeOrder(order.id)} style={{marginLeft: "10px"}}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOrderComponent;
