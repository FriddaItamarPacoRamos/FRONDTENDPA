import { useEffect, useState } from 'react';
import { deleteProduct, listProducts } from '../services/ProductService.js';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from "./HeaderComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import { getAllCategories } from '../services/CategoryService.js';

const ListProductComponent = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(''); // Estado para la categoría seleccionada
    const navigate = useNavigate();

    // Cargar productos y categorías al montar el componente
    useEffect(() => {
        getAllProducts();
        getCategories(); // Ahora llamamos correctamente a la función getCategories()
    }, []);

    // Función para obtener todos los productos
    function getAllProducts() {
        listProducts().then((response) => {
            setProducts(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    // Función para obtener todas las categorías
    function getCategories() {
        getAllCategories().then((response) => {
            setCategories(response.data); // Guardamos las categorías en el estado
        }).catch(error => {
            console.error(error);
        });
    }

    // Filtrar productos por categoría seleccionada
    const filteredProducts = selectedCategoryId
        ? products.filter(product => product.categoryId === selectedCategoryId)
        : products;

    // Función para agregar un nuevo producto
    function addNewProducts() {
        navigate('/add-product');
    }

    // Función para actualizar un producto
    function updateProducts(id) {
        navigate(`/edit-product/${id}`);
    }

    // Función para eliminar un producto
    function removeProduct(id) {
        console.log(id);
        deleteProduct(id).then(() => {
            getAllProducts(); // Actualizamos la lista de productos después de eliminar uno
        }).catch(error => {
            console.error(error);
        });
    }

    // Función para manejar el cambio de categoría seleccionada
    function handleCategoryChange(e) {
        setSelectedCategoryId(e.target.value);
    }

    return (
        <div className='container'>
            <HeaderComponent />
            <h2 className='text-center'>List of Products</h2>

            {/* Filtro de Categoría */}
            <div className="form-group">
                <label>Choose a category</label>
                <select
                    className="form-control"
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.typeProduct}
                        </option>
                    ))}
                </select>
            </div>

            {/* Botón para agregar un nuevo producto */}
            <button className='btn btn-primary mb-2' onClick={addNewProducts}>Add Product</button>

            {/* Tabla de productos */}
            <table className='table table-striped table-bordered'>
                <thead>
                <tr>
                    <th>Id</th>
                    <th className="text-center">Name product</th>
                    <th className="text-center">Stock</th>
                    <th className="text-center">Price</th>
                    <th className="text-center">Description</th>
                    <th className="text-center">Image</th>
                    <th className="text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.map(product => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.nameProduct}</td>
                        <td>{product.stock}</td>
                        <td>{product.price}</td>
                        <td>{product.description}</td>
                        <td><img style={{ maxWidth: "80%" }} src={product.image} alt={product.nameProduct} /></td>
                        <td>
                            <button className='btn btn-info' onClick={() => updateProducts(product.id)}>Update</button>
                            <button className='btn btn-danger' onClick={() => removeProduct(product.id)}
                                    style={{ marginLeft: '10px' }}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <FooterComponent />
        </div>
    );
}

export default ListProductComponent;

