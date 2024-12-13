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
    const [categoryId, setCategoryId] = useState('');  // Asegurarse de que el id de la categoría se capture
    const [categories, setCategories] = useState([]);  // Almacena las categorías
    const [errors, setErrors] = useState({
        nameProduct: '',
        stock: '',
        price: '',
        description: '',
        image: '',
        category: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();

    // Cargar categorías y si se está editando, cargar los datos del producto
    useEffect(() => {
        getAllCategories().then((response) => {
            setCategories(response.data);
        }).catch((error) => {
            console.error("Error al cargar categorías:", error);
        });

        // Si estamos editando un producto, cargar los detalles del producto
        if (id) {
            getProduct(id).then((response) => {
                setnameProduct(response.data.nameProduct);
                setstock(response.data.stock);
                setprice(response.data.price);
                setdescription(response.data.description);
                setimage(response.data.image);
                setCategoryId(response.data.categoryId);  // Establecer la categoría al cargar el producto
            }).catch((error) => {
                console.error("Error al cargar el producto:", error);
            });
        }
    }, [id]);

    // Manejar el cambio de los campos del formulario
    const handleChange = (setter) => (e) => setter(e.target.value);

    // Función para guardar o actualizar el producto
    const saveOrUpdateProduct = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const product = {
                nameProduct,
                stock: parseInt(stock, 10),  // Asegurarse de que el stock sea un número
                price: parseFloat(price),    // Asegurarse de que el precio sea un número
                description,
                image,
                categoryId  // Incluir el id de la categoría
            };

            if (id) {
                updateProduct(id, product).then((response) => {
                    console.log("Producto actualizado:", response.data);
                    navigate('/products');
                }).catch((error) => {
                    console.error("Error actualizando el producto:", error);
                });
            } else {
                createProduct(product).then((response) => {
                    console.log("Producto creado:", response.data);
                    navigate('/products');
                }).catch((error) => {
                    console.error("Error creando el producto:", error);
                });
            }
        }
    };

    // Función de validación para los campos del formulario
    const validateForm = () => {
        let valid = true;
        const errorsCopy = { ...errors };

        if (nameProduct.trim()) {
            errorsCopy.nameProduct = '';
        } else {
            errorsCopy.nameProduct = 'Name Product is required';
            valid = false;
        }

        // Verificación de stock como número
        if (stock && !isNaN(stock)) {
            errorsCopy.stock = '';
        } else {
            errorsCopy.stock = 'Stock is required and must be a number';
            valid = false;
        }

        if (price && !isNaN(price)) {
            errorsCopy.price = '';
        } else {
            errorsCopy.price = 'Price is required and must be a number';
            valid = false;
        }

        if (description.trim()) {
            errorsCopy.description = '';
        } else {
            errorsCopy.description = 'Description is required';
            valid = false;
        }

        if (image.trim()) {
            errorsCopy.image = '';
        } else {
            errorsCopy.image = 'Image is required';
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
    };

    // Título de la página
    const pageTitle = () => {
        return id ? <h2 className='text-center'>Update Product</h2> : <h2 className='text-center'>Add Product</h2>;
    };

    return (
        <div className='container'>
            <br />
            <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {pageTitle()}
                    <div className='card-body'>
                        <form onSubmit={saveOrUpdateProduct}>
                            {/* Campo para el nombre del producto */}
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

                            {/* Campo para el stock */}
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

                            {/* Campo para el precio */}
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

                            {/* Campo para la descripción */}
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

                            {/* Campo para la imagen */}
                            <div className='form-group mb-2'>
                                <label htmlFor="image" className='form-label'>Image:</label>
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

                            {/* Campo para la categoría */}
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

                            <button type="submit" className='btn btn-success'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductComponent;
