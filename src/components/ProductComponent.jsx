import { useState, useEffect } from 'react'
import { createProduct, getProduct, updateProduct } from '../services/ProductService.js'
import { useNavigate, useParams } from 'react-router-dom';
import {getAllCategories} from "../services/CategoryService.js";


const ProductComponent = () => {

    const [nameProduct, setnameProduct] = useState('')
    const [stock, setstock] = useState('')
    const [price, setprice] = useState('')
    const [description, setdescription] = useState('')
    const [image, setimage] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])



    useEffect(() => {
        getAllCategories().then((response) => {
            setCategories(response.data);
        }).catch(error => {
            console.error(error);
        })

    }, [])

    const {id} = useParams();
    const [errors, setErrors] = useState({
        nameProduct: '',
        stock: '',
        price: '',
        description: '',
        image: ''
    })

    const navigator = useNavigate();

    useEffect(() => {
        if(id){
            getProduct(id).then((response) => {
                setnameProduct(response.data.nameProduct);
                setstock(response.data.stock);
                setprice(response.data.price);
                setdescription(response.data.description);
                setimage(response.data.image);
                setCategoryId(response.data.CategoryId);  // Verifica que esta propiedad es correcta.
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id]);

    function saveOrUpdateProduct(e) {
        e.preventDefault();

        if(validateForm()) {
            const product = {nameProduct, stock, price, description, image, categoryId};
            if(id) {
                updateProduct(id, product).then((response) => {
                    console.log("Producto actualizado:", response.data);
                    navigator('/products');
                }).catch(error => {
                    console.error("Error actualizando el producto:", error);
                });
            } else {
                createProduct(product).then((response) => {
                    console.log("Producto creado:", response.data);
                    navigator('/products');
                }).catch(error => {
                    console.error("Error creando el producto:", error);
                });
            }
        }
    }
    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(nameProduct.trim()){
            errorsCopy.nameProduct = '';
        } else {
            errorsCopy.nameProduct = 'Name Product is required';
            valid = false;
        }

        if(stock.trim()){
            errorsCopy.stock = '';
        } else {
            errorsCopy.stock = 'Stock is required';
            valid = false;
        }

        if(price.trim()){
            errorsCopy.price = '';
        } else {
            errorsCopy.price = 'Price is required';
            valid = false;
        }

        if(image.trim()){
            errorsCopy.image = '';
        } else {
            errorsCopy.image = 'Image is required';
            valid = false;
        }

        //if(email.trim()){
        //  const validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        //if(!validEmail.test(email)){
        //  errorsCopy.email = 'Email is not correct';}
        // }

        if(description.trim()){
            errorsCopy.description = ''
        }else {
            errorsCopy.description = 'Select Categories'
            valid = false
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Product</h2>
        }else{
            return <h2 className='text-center'>Add Product</h2>
        }
    }

    return (
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>name Product:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Product Name Product'
                                    name='nameProduct'
                                    value={nameProduct}
                                    className={`form-control ${errors.nameProduct ? 'is-invalid' : ''}`}
                                    onChange={(e) => setnameProduct(e.target.value)}
                                >
                                </input>
                                {errors.nameProduct && <div className='invalid-feedback'> {errors.nameProduct} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Stock:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Product Stock'
                                    name='stock'
                                    value={stock}
                                    className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                                    onChange={(e) => setstock(e.target.value)}
                                >
                                </input>
                                {errors.stock && <div className='invalid-feedback'> {errors.stock} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>price:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Product Price'
                                    name='price'
                                    value={price}
                                    className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                                    onChange={(e) => setprice(e.target.value)}
                                >
                                </input>
                                {errors.price && <div className='invalid-feedback'> {errors.price} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>description:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Product Description'
                                    name='description'
                                    value={description}
                                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                    onChange={(e) => setdescription(e.target.value)}
                                >
                                </input>
                                {errors.description && <div className='invalid-feedback'> {errors.description} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>image:</label>
                                <input
                                    type='text'
                                    placeholder='Enter Product Image'
                                    name='image'
                                    value={image}
                                    className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                                    onChange={(e) => setimage(e.target.value)}
                                >
                                </input>
                                {errors.image && <div className='invalid-feedback'> {errors.image} </div>}
                            </div>

                            <div className='form-group mb-2'>
                                <label className='form-label'>Select Category:</label>
                                <select
                                    className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                    value={categoryId}
                                    onChange={(e) => setCategoryId(e.target.value)}
                                >
                                    <option value="Select Category">Select Category</option>
                                    {
                                        categories.map(category =>
                                            <option key={category.id}
                                                    value={category.id}> {category.typeProduct}</option>
                                        )
                                    }
                                </select>

                                {errors.category && <div className='invalid-feedback'> {errors.category} </div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateProduct}>Submit</button>
                        </form>

                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProductComponent

