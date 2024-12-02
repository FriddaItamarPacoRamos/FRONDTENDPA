import { useState, useEffect } from 'react'
import { createProduct, getProduct, updateProduct } from '../services/ProductService.js'
import { useNavigate, useParams } from 'react-router-dom';
import { getAllCategories } from '../services/CategoryService';
import { getAllOrders} from '../services/OrderService';
import { getAllClients} from '../services/ClientService';


const ProductComponent = () => {

    const [nameProduct, setnameProduct] = useState('')
    const [stock, setstock] = useState('')
    const [price, setprice] = useState('')
    const [description, setdescription] = useState('')
    const [image, setimage] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [categories, setCategories] = useState([])


    const [orders, setOrders] = useState([]);  // Estado para almacenar las órdenes
    const [orderIds, setOrderIds] = useState([]); // Estado para almacenar las IDs de las órdenes seleccionadas

    const [clients, setClients] = useState([]);  // Estado para almacenar los clientes
    const [clientId, setClientId] = useState('');  // Estado para el cliente

    useEffect(() => {
        getAllCategories().then((response) => {
            setCategories(response.data);
        }).catch(error => {
            console.error(error);
        })
        // Cargar todas las órdenes
        getAllOrders().then((response) => {
            setOrders(response.data);
        }).catch(error => {
            console.error(error);
        })
        getAllClients().then(response => {
            setClients(response.data);  // Cargar todos los clientes
        }).catch(error => {
            console.error(error);
        });
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
                setimage(response.data.image)
                setCategoryId(response.data.CategoryId)
                setOrderIds(response.data.orderIds || []); // Cargar las órdenes asociadas
                setClientId(response.data.clientId || '');
            }).catch(error => {
                console.error(error);
            })
        }

    }, [id])
//Order
    const handleOrderChange = (e) => {
        const selectedOrders = Array.from(e.target.selectedOptions, option => option.value);
        setOrderIds(selectedOrders);
    }
    //Order
    function saveOrUpdateProduct(e){
        e.preventDefault();

        if(validateForm()){

            const product = { nameProduct,stock,price,description,image, categoryId}
            console.log(product)

            if(id){
                updateProduct(id, product).then((response) => {
                    console.log(response.data);
                    navigator('/products');
                }).catch(error => {
                    console.error(error);
                })
            } else {
                createProduct(product).then((response) => {
                    console.log(response.data);
                    navigator('/products')
                }).catch(error => {
                    console.error(error);
                })
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
                                            <option key={category.id} value={category.id}> {category.typeProduct}</option>
                                        )
                                    }
                                </select>
                                {errors.category && <div className='invalid-feedback'> {errors.category} </div>}
                            </div>

                            {/* Selección de órdenes */}
                            <div className='form-group mb-2'>
                                <label className='form-label'>Select Orders:</label>
                                <select
                                    multiple
                                    className='form-control'
                                    value={orderIds}
                                    onChange={handleOrderChange}
                                >
                                    {orders.map(order => (
                                        <option key={order.id} value={order.id}>
                                            Order {order.id} - Status: {order.status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* Client Selection */}
                            <div className="form-group">
                                <label>Select Client</label>
                                <select className="form-control" value={clientId} onChange={(e) => setClientId(e.target.value)}>
                                    <option>Select Client</option>
                                    {clients.map(client => (
                                        <option key={client.id} value={client.id}>
                                            {client.firstName} {client.lastName} - {client.email}
                                        </option>
                                    ))}
                                </select>
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

