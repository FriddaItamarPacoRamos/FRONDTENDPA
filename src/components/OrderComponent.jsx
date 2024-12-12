import React, { useEffect, useState } from 'react';
import { createOrder, getOrderById, updateOrder } from '../services/OrderService';
import { listProducts } from '../services/ProductService';
import { getAllClients } from '../services/ClientService';
import { useNavigate, useParams } from 'react-router-dom';

const OrderComponent = () => {
    const [clientId, setClientId] = useState('');
    const [productIds, setProductIds] = useState([]);  // Productos seleccionados
    const [products, setProducts] = useState([]);  // Lista de productos disponibles
    const [clients, setClients] = useState([]);  // Lista de clientes disponibles
    const [quantities, setQuantities] = useState({}); // Cantidades seleccionadas para cada producto
    const [totalMont, setTotalMont] = useState(0);  // Total monto de la orden
    const [totalProduct, setTotalProduct] = useState(0); // Total cantidad de productos
    const { id } = useParams();  // Para saber si es una edición de un pedido existente
    const navigate = useNavigate();

    // Cargar productos y clientes al inicio
    useEffect(() => {
        listProducts().then((response) => {
            setProducts(response.data);
        }).catch(error => {
            console.error("Error fetching products:", error);
        });

        getAllClients().then((response) => {
            setClients(response.data);
        }).catch(error => {
            console.error("Error fetching clients:", error);
        });

        // Si estamos editando una orden, cargar los detalles de esa orden
        if (id) {
            getOrderById(id).then((response) => {
                setClientId(response.data.clientId);
                setProductIds(response.data.productIds || []);
                setQuantities(response.data.quantities || {});
                setTotalMont(response.data.totalMont);
                setTotalProduct(response.data.totalProduct);
            }).catch(error => {
                console.error("Error fetching order:", error);
            });
        }
    }, [id]);

    // Maneja el cambio de productos seleccionados
    const handleProductChange = (e) => {
        const selectedProducts = Array.from(e.target.selectedOptions, option => option.value);
        setProductIds(selectedProducts);
        recalculateTotal(selectedProducts);  // Recalcular el total cuando los productos cambian
    };

    // Maneja el cambio de cantidad para un producto específico
    const handleQuantityChange = (e, productId) => {
        const newQuantities = { ...quantities, [productId]: e.target.value };
        setQuantities(newQuantities);
        recalculateTotal(productIds);  // Recalcular el total cuando las cantidades cambian
    };

    // Función para calcular el total (monto total y cantidad total de productos)
    const recalculateTotal = (selectedProducts) => {
        let totalAmount = 0;
        let totalCount = 0;

        selectedProducts.forEach(productId => {
            const product = products.find(p => p.id === productId);
            if (product) {
                const quantity = quantities[productId] || 1;
                totalAmount += product.price * quantity;  // Calcular el monto total
                totalCount += quantity;  // Calcular el total de productos
            }
        });

        setTotalMont(totalAmount);
        setTotalProduct(totalCount);
    };

    // Maneja el envío del formulario para crear o actualizar la orden
    const handleSubmit = (e) => {
        e.preventDefault();

        const order = {
            clientId,
            productIds,  // Productos seleccionados
            quantities,  // Cantidades seleccionadas
            totalMont,
            totalProduct
        };

        if (id) {
            // Si existe id, actualizar la orden
            updateOrder(id, order).then(() => {
                navigate('/orders');
            }).catch(error => {
                console.error("Error updating order:", error);
            });
        } else {
            // Si no existe id, crear una nueva orden
            createOrder(order).then(() => {
                navigate('/orders');
            }).catch(error => {
                console.error("Error creating order:", error);
            });
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">{id ? 'Update Order' : 'Add Order'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Client:</label>
                    <select
                        className="form-control"
                        value={clientId}
                        onChange={(e) => setClientId(e.target.value)}
                    >
                        <option value=''>Select Client</option>
                        {clients.map(client => (
                            <option key={client.id} value={client.id}>
                                {client.firstName} {client.lastName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Products:</label>
                    <select
                        multiple
                        className="form-control"
                        value={productIds}
                        onChange={handleProductChange}
                    >
                        {products.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.nameProduct} - {product.price}$
                            </option>
                        ))}
                    </select>
                </div>

                {/* Cantidades de productos seleccionados */}
                {productIds.map((productId) => (
                    <div key={productId}>
                        <label>Quantity of {products.find(p => p.id === productId)?.nameProduct}:</label>
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

                <button type="submit" className="btn btn-success mb-2">Submit</button>
            </form>
        </div>
    );
};

export default OrderComponent;
