import React, { useEffect, useState } from 'react';
import { deleteOrder, getAllOrders, createOrder } from '../services/OrderService';
import { listProducts } from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from "../components/HeaderComponent.jsx";
import FooterComponent from "../components/FooterComponent.jsx";

const ListOrderComponent = () => {
    const [orders, setOrders] = useState([]);  // Almacenar los pedidos
    const [products, setProducts] = useState([]); // Almacenar los productos
    const [cart, setCart] = useState([]);  // Almacenar el carrito
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Cargar pedidos y productos al montar el componente
    useEffect(() => {
        listAllOrders();
        listAllProducts();
    }, []);

    // Función para cargar todos los pedidos
    function listAllOrders() {
        getAllOrders().then((response) => {
            setOrders(response.data);
        }).catch(error => {
            console.error("Error fetching orders:", error);
            setError('Error al cargar los pedidos');
        });
    }

    // Función para cargar todos los productos
    function listAllProducts() {
        listProducts().then((response) => {
            setProducts(response.data);
        }).catch(error => {
            console.error("Error fetching products:", error);
            setError('Error al cargar los productos');
        });
    }

    // Función para agregar un producto al carrito
    const addToCart = (product) => {
        const repeatedProduct = cart.find(item => item.product.id === product.id);
        if (repeatedProduct) {
            const updatedCart = cart.map(item =>
                item.product.id === product.id
                    ? { ...item, quantity: item.quantity + 1, subTotal: item.subTotal + product.price }
                    : item
            );
            setCart(updatedCart);
        } else {
            setCart([...cart, { product, quantity: 1, subTotal: product.price }]);
        }
    };

    // Función para eliminar un producto del carrito
    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    // Función para realizar la compra y crear un pedido
    const purchaseOrder = () => {
        if (cart.length > 0) {
            const order = {
                total: cart.reduce((acc, item) => acc + item.subTotal, 0),
                details: cart.map(item => ({
                    productId: item.product.id,
                    quantity: item.quantity,
                    subTotal: item.subTotal
                }))
            };

            // Crear el pedido en el backend
            createOrder(order)
                .then(response => {
                    console.log("Order created:", response);
                    setCart([]);  // Limpiar el carrito después de realizar la compra
                    listAllOrders();  // Recargar la lista de pedidos
                    alert('Compra realizada');
                })
                .catch(error => {
                    console.error("Error creating order:", error);
                    alert('Error al realizar la compra');
                });
        } else {
            alert('El carrito está vacío');
        }
    };

    // Función para eliminar una orden
    const removeOrder = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar este pedido?")) {
            deleteOrder(id).then(() => {
                listAllOrders();  // Recargar las órdenes después de eliminar
            }).catch(error => {
                console.error("Error al eliminar el pedido:", error);
                setError('Error al eliminar el pedido');
            });
        }
    };

    return (
        <div className="container">
            <HeaderComponent />
            <h2 className="text-center">Lista de Pedidos</h2>
            <button className="btn btn-primary mb-2" onClick={() => navigate('/create-order')}>Crear Pedido</button>

            {/* Carrito de compras */}
            <div id="cart">
                <h3>Carrito de compras</h3>
                <table className='table bg-dark'>
                    <thead>
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acción</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cart.map((item, index) => (
                        <tr key={index}>
                            <td>{item.product.nameProduct}</td>
                            <td>{item.product.price}</td>
                            <td>{item.quantity}</td>
                            <td>{item.subTotal}</td>
                            <td><button className='btn btn-danger' onClick={() => removeFromCart(index)}>Eliminar</button></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <button className='btn btn-success' onClick={purchaseOrder}>Comprar</button>
            </div>

            {/* Mostrar la lista de órdenes */}
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Código</th>
                    <th>Detalles</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {orders.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center">No se encontraron pedidos</td>
                    </tr>
                ) : (
                    orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.codigo}</td>
                            <td>
                                {order.detailsOrders && order.detailsOrders.length > 0 ? (
                                    order.detailsOrders.map(detail => {
                                        const product = products.find(p => p.id === detail.productId);
                                        return (
                                            <p key={detail.productId}>
                                                {product ? product.nameProduct : 'Producto no encontrado'} -
                                                {detail.quantity} x {product ? product.price : 'N/A'} = {detail.subTotal}
                                            </p>
                                        );
                                    })
                                ) : (
                                    <p>No hay detalles disponibles</p>
                                )}
                            </td>
                            <td>{order.totalMont}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => navigate(`/edit-order/${order.id}`)}>Actualizar</button>
                                <button className="btn btn-danger" onClick={() => removeOrder(order.id)} style={{ marginLeft: "10px" }}>Eliminar</button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default ListOrderComponent;
