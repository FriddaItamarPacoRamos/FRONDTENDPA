import React, { useState, useEffect } from 'react';
import { createOrder, getOrderById, updateOrder } from '../services/OrderService'; // Servicios de Order
import { listProducts } from '../services/ProductService';
import { getAllClients } from '../services/ClientService';
import { useNavigate, useParams } from 'react-router-dom';

const OrderComponent = () => {
    const [status, setStatus] = useState('');
    const [clientId, setClientId] = useState('');
    const [productIds, setProductIds] = useState([]);
    const [products, setProducts] = useState([]);
    const [clients, setClients] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();
//me l
    useEffect(() => {
        // Cargar todos los productos
        listProducts().then((response) => {
            setProducts(response.data);
        }).catch(error => {
            console.error("Error fetching products:", error);
        });

        // Cargar todos los clientes
        getAllClients().then((response) => {
            setClients(response.data);
        }).catch(error => {
            console.error("Error fetching clients:", error);
        });

        // Si es una edición de pedido, cargar los datos del pedido
        if (id) {
            getOrderById(id).then((response) => {
                setStatus(response.data.status);
                setClientId(response.data.clientId);
                setProductIds(response.data.productIds);  // Productos asociados al pedido
            }).catch(error => {
                console.error("Error fetching order:", error);
            });
        }
    }, [id]);

    const handleProductChange = (e) => {
        const selectedProducts = Array.from(e.target.selectedOptions, option => option.value);
        setProductIds(selectedProducts);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const order = {
            status,
            clientId,
            productIds
        };

        if (id) {
            updateOrder(id, order).then(() => {
                navigate('/orders');
            }).catch(error => {
                console.error("Error updating order:", error);
            });
        } else {
            createOrder(order).then(() => {
                navigate('/orders');
            }).catch(error => {
                console.error("Error creating order:", error);
            });
        }
    };

    const pageTitle = () => {
        return id ? <h2 className='text-center'>Update Order</h2> : <h2 className='text-center'>Add Order</h2>;
    };

    return (
        <div className='container'>
            <br />
            {pageTitle()}
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Order Status:</label>
                    <input
                        type='text'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='form-control'
                    />
                </div>

                <div className='form-group'>
                    <label>Client:</label>
                    <select
                        className='form-control'
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                    >
                        <option value=''>Select Client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>{client.firstName} {client.lastName}</option>
                        ))}
                    </select>
                </div>

                <div className='form-group'>
                    <label>Products:</label>
                    <select
                        multiple
                        className='form-control'
                        value={productIds}
                        onChange={handleProductChange}
                    >
                        {products.map(product => (
                            <option key={product.id} value={product.id}>{product.nameProduct}</option>
                        ))}
                    </select>
                </div>

                <button type='submit' className='btn btn-success mb-2'>Submit</button>
            </form>
        </div>
    );
};

export default OrderComponent;
