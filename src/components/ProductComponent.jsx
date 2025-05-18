import { useState, useEffect } from 'react';
import { createProduct, getProduct, updateProduct } from '../services/ProductService.js';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCategories } from "../services/CategoryService.js";

const ProductComponent = () => {
    const [nameProduct, setnameProduct] = useState('');
    const [stock, setstock] = useState('');
    const [price, setprice] = useState('');
    const [description, setdescription] = useState('');
    const [image, setimage] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({
        nameProduct: '',
        stock: '',
        price: '',
        description: '',
        image: '',
        category: ''
    });

    const { id } = useParams();
    const navigator = useNavigate();

    // Cargar categorías al montar el componente
    useEffect(() => {
        getAllCategories().then((response) => {
            setCategories(response.data);
        }).catch((error) => {
            console.error("Error fetching categories:", error);
        });
    }, []);

    // Si es edición, cargar datos del producto
    useEffect(() => {
        if (id) {
            getProduct(id).then((response) => {
                setnameProduct(response.data.nameProduct);
                setstock(response.data.stock);
                setprice(response.data.price);
                setdescription(response.data.description);
                setimage(response.data.image);
                setCategoryId(response.data.categoryId);
            }).catch((error) => {
                console.error("Error fetching product:", error);
            });
        }
    }, [id]);

    // Manejar cambios en los inputs
    const handleChange = (setter) => (e) => setter(e.target.value);

    // Validación del formulario
    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (nameProduct.trim()) {
            errorsCopy.nameProduct = '';
        } else {
            errorsCopy.nameProduct = 'Product name is required';
            valid = false;
        }

        if (stock.trim()) {
            errorsCopy.stock = '';
        } else {
            errorsCopy.stock = 'Stock is required';
            valid = false;
        }

        if (price.trim()) {
            errorsCopy.price = '';
        } else {
            errorsCopy.price = 'Price is required';
            valid = false;
        }

        if (image.trim()) {
            errorsCopy.image = '';
        } else {
            errorsCopy.image = 'Image is required';
            valid = false;
        }

        if (description.trim()) {
            errorsCopy.description = '';
        } else {
            errorsCopy.description = 'Description is required';
            valid = false;
        }

        if (categoryId) {
            errorsCopy.category = '';
        } else {
            errorsCopy.category = 'Category is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    // Guardar o actualizar producto
    function saveOrUpdateProduct(e) {
        e.preventDefault();

        if (validateForm()) {
            const product = { nameProduct, stock, price, description, image, categoryId };
            if (id) {
                updateProduct(id, product).then((response) => {
                    console.log("Producto actualizado:", response.data);
                    navigator('/products');
                }).catch((error) => {
                    console.error("Error actualizando el producto:", error);
                    alert("Error al actualizar el producto: " + error.response?.data?.message || error.message);
                });
            } else {
                createProduct(product).then((response) => {
                    console.log("Producto creado:", response.data);
                    navigator('/products');
                }).catch((error) => {
                    console.error("Error creando el producto:", error);
                    alert("Error al crear el producto: " + error.response?.data?.message || error.message);
                });
            }
        }
    }

    // Título según si es crear o editar
    function pageTitle() {
        return id ? <h2 className='text-center'>Update Product</h2> : <h2 className='text-center'>Add Product</h2>;
    }

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label htmlFor="nameProduct" className='form-label'>Name Product:</label>
                                <input
                                    id="nameProduct"
                                    type='text'
                                    placeholder='Enter Product Name'
                                    name='nameProduct'
                                    value={nameProduct}
                                    className={`form-control ${errors.nameProduct ? 'is-invalid' : ''}`}
                                    onChange={handleChange(setnameProduct)}
                                />
                                {errors.nameProduct && <div className='invalid-feedback'>{errors.nameProduct}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label htmlFor="stock" className='form-label'>Stock:</label>
                                <input
                                    id="stock"
                                    type='number'
                                    placeholder='Enter Product Stock'
                                    name='stock'
                                    value={stock}
                                    className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                                    onChange={handleChange(setstock)}
                                />
                                {errors.stock && <div className='invalid-feedback'>{errors.stock}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label htmlFor="price" className='form-label'>Price:</label>
                                <input
                                    id="price"
                                    type='number'
                                    placeholder='Enter Product Price'
                                    name='price'
                                    value={price}
                                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                    onChange={handleChange(setprice)}
                                />
                                {errors.price && <div className='invalid-feedback'>{errors.price}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label htmlFor="description" className='form-label'>Description:</label>
                                <input
                                    id="description"
                                    type='text'
                                    placeholder='Enter Product Description'
                                    name='description'
                                    value={description}
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    onChange={handleChange(setdescription)}
                                />
                                {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label htmlFor="image" className='form-label'>Image URL:</label>
                                <input
                                    id="image"
                                    type='text'
                                    placeholder='Enter Product Image URL'
                                    name='image'
                                    value={image}
                                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                    onChange={handleChange(setimage)}
                                />
                                {errors.image && <div className='invalid-feedback'>{errors.image}</div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label htmlFor="categoryId" className='form-label'>Select Category:</label>
                                <select
                                    id="categoryId"
                                    className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                    value={categoryId}
                                    onChange={handleChange(setCategoryId)}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.typeProduct}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && <div className='invalid-feedback'>{errors.category}</div>}
                            </div>

                            <button className='btn btn-success' onClick={saveOrUpdateProduct}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductComponent;
