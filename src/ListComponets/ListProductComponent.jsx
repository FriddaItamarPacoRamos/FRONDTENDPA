import { useEffect, useState } from 'react';
import { deleteProduct, listProducts } from '../services/ProductService.js';
import { useNavigate } from 'react-router-dom';
import HeaderComponent from "../components/HeaderComponent.jsx";
import FooterComponent from "../components/FooterComponent.jsx";
import { getAllCategories } from '../services/CategoryService.js';

const ListProductComponent = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
        getCategories();
    }, []);

    function getAllProducts() {
        listProducts().then((response) => {
            setProducts(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function getCategories() {
        getAllCategories().then((response) => {
            setCategories(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    const filteredProducts = selectedCategoryId
        ? products.filter(product => String(product.categoryId) === String(selectedCategoryId))
        : products;

    function addNewProducts() {
        navigate('/add-product');
    }

    function updateProducts(id) {
        navigate(`/edit-product/${id}`);
    }

    function removeProduct(id) {
        deleteProduct(id).then(() => {
            getAllProducts();
        }).catch(error => {
            console.error(error);
        });
    }

    function handleCategoryChange(e) {
        setSelectedCategoryId(e.target.value);
    }

    return (
        <div className='container'>
            <HeaderComponent />
            <h2 className='text-center'>List of Products</h2>

            <div className="form-group">
                <label>Choose a category</label>
                <select
                    className="form-control"
                    value={selectedCategoryId}
                    onChange={handleCategoryChange}
                >
                    <option value="">All</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.typeProduct}
                        </option>
                    ))}
                </select>
            </div>

            <button className="btn btn-primary" onClick={addNewProducts}>Add Product</button>

            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredProducts.length === 0 ? (
                    <tr><td colSpan="7">No products found in this category.</td></tr>
                ) : (
                    filteredProducts.map(product => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nameProduct}</td>
                            <td>{product.stock}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td><img style={{ maxWidth: "80%" }} src={product.image} alt={product.nameProduct} /></td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateProducts(product.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeProduct(product.id)} style={{ marginLeft: '10px' }}>Delete</button>
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

