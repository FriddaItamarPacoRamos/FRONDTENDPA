import { useEffect, useState } from 'react';
import { deleteProduct, listProducts } from '../services/ProductService.js';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from "../components/HeaderComponent.jsx";
import FooterComponent from "../components/FooterComponent.jsx";
import { getAllCategories } from '../services/CategoryService.js';
import CartComponent from "../components/CartComponent.jsx";

const ListProductComponent = () => {
    const [products, setProducts] = useState([]); // Almacenar los productos
    const [categories, setCategories] = useState([]); // Almacenar las categorías
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [newProduct, setNewProduct] = useState({
        nameProduct: '',
        stock: 0,
        price: 0,
        description: '',
        image: '',
        categoryId: ''
    });
    const [cartItems, setCartItems] = useState([]); // Carrito de compras
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Cargar productos y categorías al montar el componente
    useEffect(() => {
        loadProducts();
        loadCategories();
    }, []);

    // Cargar productos desde el servicio
    function loadProducts() {
        listProducts().then((response) => {
            setProducts(response.data);
        }).catch((error) => {
            console.error("Error al cargar los productos:", error);
            setError('Error al cargar los productos');
        });
    }

    // Cargar categorías desde el servicio
    function loadCategories() {
        getAllCategories().then((response) => {
            setCategories(response.data);
        }).catch((error) => {
            console.error("Error al cargar las categorías:", error);
            setError('Error al cargar las categorías');
        });
    }

    // Filtrar productos por categoría
    const filteredProducts = selectedCategoryId
        ? products.filter(product => String(product.categoryId) === String(selectedCategoryId))
        : products;

    // Agregar un producto al carrito
    const addProductToCart = (product, quantity) => {
        const existingProduct = cartItems.find(item => item.product.id === product.id);
        if (existingProduct) {
            alert('Este producto ya está en el carrito');
            return;
        }
        const newItem = { product, quantity, subTotal: product.price * quantity };
        setCartItems([...cartItems, newItem]);
    };

    // Eliminar un producto del carrito
    const removeItemFromCart = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1); // Eliminar el producto por índice
        setCartItems(newCartItems);
    };

    // Realizar la compra
    const handlePurchase = () => {
        if (cartItems.length > 0) {
            const orderDetails = cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity,
                subTotal: item.subTotal
            }));

            const newOrder = {
                code: "100", // Genera un código único o usa uno de prueba
                total: cartItems.reduce((total, item) => total + item.subTotal, 0),
                details: orderDetails
            };

            // Enviar la orden al backend
            createOrder(newOrder)
                .then(res => {
                    console.log(res);
                    setCartItems([]); // Limpiar el carrito después de la compra
                    alert('Compra realizada con éxito');
                })
                .catch(err => {
                    console.error(err);
                    alert('Hubo un error al realizar la compra');
                });
        } else {
            alert('Por favor, seleccione productos para comprar');
        }
    };

    // Agregar un nuevo producto
    const addNewProduct = (e) => {
        e.preventDefault();

        // Crear el nuevo producto dinámicamente
        const product = { ...newProduct };
        setProducts([...products, product]);

        // Limpiar los campos del formulario
        setNewProduct({
            nameProduct: '',
            stock: 0,
            price: 0,
            description: '',
            image: '',
            categoryId: ''
        });

        alert("Producto agregado");
    };

    // Actualizar un producto existente
    const updateProduct = (id) => {
        navigate(`/edit-product/${id}`);
    };

    // Eliminar un producto
    const removeProduct = (id) => {
        deleteProduct(id).then(() => {
            loadProducts(); // Recargar los productos después de eliminar
        }).catch((error) => {
            console.error("Error al eliminar el producto:", error);
            setError('Error al eliminar el producto');
        });
    };

    // Manejar el cambio de categoría seleccionada
    const handleCategoryChange = (e) => {
        setSelectedCategoryId(e.target.value);
    };

    // Manejar el cambio de los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({
            ...newProduct,
            [name]: value
        });
    };

    return (
        <div className="container">
            <HeaderComponent />
            <h2 className="text-center">Lista de Productos</h2>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            <div className="form-group">
                <label>Elige una categoría</label>
                <select
                    className="form-control"
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                >
                    <option value="">Todos</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.typeProduct}
                        </option>
                    ))}
                </select>
            </div>

            <CartComponent cartItems={cartItems} removeItem={removeItemFromCart} purchase={handlePurchase} />

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Stock</th>
                    <th>Precio</th>
                    <th>Descripción</th>
                    <th>Imagen</th>
                    <th>Acciones</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="text-center">
                            No se encontraron productos en esta categoría.
                        </td>
                    </tr>
                ) : (
                    filteredProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nameProduct}</td>
                            <td>{product.stock}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td>
                                <img
                                    style={{ maxWidth: "80px", height: "auto" }}
                                    src={product.image}
                                    alt={product.nameProduct}
                                />
                            </td>
                            <td>
                                <button className="btn btn-info" onClick={() => addProductToCart(product, 1)}>
                                    Agregar al carrito
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => removeProduct(product.id)}
                                    style={{ marginLeft: '10px' }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>

            <FooterComponent />
        </div>
    );
};

export default ListProductComponent;
