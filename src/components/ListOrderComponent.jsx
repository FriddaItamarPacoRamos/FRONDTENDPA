import React, { useEffect, useState } from 'react';
import {deleteOrder, getAllOrders} from '../services/OrderService';
import { useNavigate } from 'react-router-dom';

const ListOrderComponent = () => {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listAllOrders();
    }, []);

    function listAllOrders() {
        getAllOrders().then((response) => {
            setOrders(response.data);
            console.log(response.data)
        }).catch(error => {
            console.error("Error fetching orders:", error);
        });
    }

    function updateOrder(id) {
        navigate(`/edit-order/${id}`);
    }

    function removeOrder(id) {
        if (window.confirm("Are you sure you want to delete this order?")) {
            deleteOrder(id).then(() => {
                listAllOrders();
            }).catch(error => {
                console.error("Error deleting order:", error);
            });
        }
    }

    return (
        <div className="container">
            <h2 className="text-center">List of Orders</h2>
            <button className="btn btn-primary mb-2" onClick={() => navigate('/create-order')}>Add Order</button>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Client ID</th>
                    <th>TotalProduct</th>
                    <th>TotalMont</th>
                    <th>Products</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {orders.map(order => (
                    <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.totalMont}</td>
                        <td>{order.totalProduct}</td>
                        <td>{order.clientId}</td>
                        <td>{order.productIds.join(', ')}</td>
                        <td>
                            <button className="btn btn-info" onClick={() => updateOrder(order.id)}>Update</button>
                            <button className="btn btn-danger" onClick={() => removeOrder(order.id)}
                                    style={{marginLeft: "10px"}}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListOrderComponent;


