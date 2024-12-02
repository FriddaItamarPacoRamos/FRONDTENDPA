import {useEffect, useState} from 'react'
import { deleteProduct, listProducts } from '../services/ProductService.js'
import { useNavigate } from 'react-router-dom'
import HeaderComponent from "./HeaderComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";

const ListProductComponent = () => {

    const [products, setProducts] = useState([])

    const navigator = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, [])

    function getAllProducts() {
        listProducts().then((response) => {
            setProducts(response.data);
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
    function addNewProducts(){
        navigator('/add-product')
    }

    function updateProducts(id) {
        navigator(`/edit-product/${id}`)
    }

    function removeProduct(id){
        console.log(id);

        deleteProduct(id).then(() =>{
            getAllProducts();
        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container'>
<HeaderComponent/>
        <h2 className='text-center'>List of Products</h2>
        <button className='btn btn-primary mb-2' onClick={addNewProducts}>Add Product</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th className="text-center">Name product</th>
                    <th className="text-center">Stock</th>
                    <th className="text-center">Precio</th>
                    <th className="text-center">Descripcion</th>
                    <th className="text-center">Image</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map(product =>
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nameProduct}</td>
                            <td>{product.stock}</td>
                            <td>{product.price}</td>
                            <td>{product.description}</td>
                            <td><img style={{maxWidth:"80%"}} src={product.image}/></td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateProducts(product.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeProduct(product.id)}
                                    style={{marginLeft: '10px'}}
                                >Delete</button>
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
        <FooterComponent/>
    </div>
  )
}

export default ListProductComponent