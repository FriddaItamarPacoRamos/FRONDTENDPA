import React, { useState, useEffect } from 'react';
import { createOrder, getOrderById, updateOrder } from '../services/OrderService'; // Servicios de Order
import { listProducts } from '../services/ProductService';
import { getAllClients } from '../services/ClientService';
import { useNavigate, useParams } from 'react-router-dom';

const OrderComponent = () => {
    const [clientId, setClientId] = useState('');
    const [productIds, setProductIds] = useState([]);  // Aquí almacenamos los productos seleccionados
    const [products, setProducts] = useState([]);  // Lista de productos disponibles
    const [clients, setClients] = useState([]);  // Lista de clientes
    const [quantities, setQuantities] = useState({}); // Cantidades de los productos seleccionados
    const [totalMont, setTotalMont] = useState('');
    const [totalProduct, setTotalProduct] = useState('');

    const { id } = useParams();  // Obtiene el ID del pedido si es una edición
    const navigate = useNavigate();

    // Se ejecuta cuando el componente se monta o el id del pedido cambia
    useEffect(() => {
        // Cargar todos los productos disponibles
        listProducts().then((response) => {
            setProducts(response.data);
        }).catch(error => {
            console.error("Error fetching products:", error);
        });

        // Cargar todos los clientes disponibles
        getAllClients().then((response) => {
            setClients(response.data);
        }).catch(error => {
            console.error("Error fetching clients:", error);
        });

        // Si es una edición de pedido, cargar los datos del pedido
        if (id) {
            getOrderById(id).then((response) => {
                setClientId(response.data.clientId);
                setProductIds(response.data.productIds);  // Establece los productos asociados al pedido
                setQuantities(response.data.quantities || {});
                setTotalMont(response.data.totalMont);
                setTotalProduct(response.data.totalProduct);
            }).catch(error => {
                console.error("Error fetching order:", error);
            });
        }
    }, [id]);

    // Maneja el cambio en los productos seleccionados
    const handleProductChange = (e) => {
        const selectedProducts = Array.from(e.target.selectedOptions, option => option.value);
        setProductIds(selectedProducts);  // Actualiza el estado con los productos seleccionados
    };

    // Maneja el cambio en las cantidades
    const handleQuantityChange = (e, productId) => {
        const newQuantities = { ...quantities, [productId]: e.target.value };
        setQuantities(newQuantities);
        calculateTotalAmount(newQuantities); // Recálculo del total
    };

    // Cálculo del total de la orden
    const calculateTotalAmount = (newQuantities) => {
        let total = 0;
        productIds.forEach(productId => {
            const product = products.find(p => p.id === productId);
            total += product.price * newQuantities[productId];  // Multiplica por la cantidad
        });
        setTotalMont(total);
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        const order = {
            clientId,
            productIds,  // Lista de IDs de productos
            quantities,  // Cantidades asociadas a cada producto
            totalMont,   // Total calculado
            totalProduct // Total de productos
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

    // Título de la página dependiendo de si es creación o edición
    const pageTitle = () => {
        return id ? <h2 className='text-center'>Update Order</h2> : <h2 className='text-center'>Add Order</h2>;
    };

    return (
        <div className='container'>
            <br />
            {pageTitle()}
            <form onSubmit={handleSubmit}>
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

                {/* Mostrar cantidad seleccionada */}
                {productIds.map((productId) => (
                    <div key={productId}>
                        <label>Quantity of {products.find(product => product.id === productId).nameProduct}:</label>
                        <input
                            type="number"
                            value={quantities[productId] || 1}
                            onChange={(e) => handleQuantityChange(e, productId)}
                        />
                    </div>
                ))}

                <div className="form-group">
                    <label>Total Mont</label>
                    <input type="text" className="form-control" value={totalMont} disabled />
                </div>

                <div className="form-group">
                    <label>Total Product</label>
                    <input type="text" className="form-control" value={totalProduct} disabled />
                </div>

                <button type='submit' className='btn btn-success mb-2'>Submit</button>
            </form>
        </div>
    );
};

export default OrderComponent;
