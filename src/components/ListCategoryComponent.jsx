import React, { useEffect, useState } from 'react'
import { deleteCategory, getAllCategories } from '../services/CategoryService';
import { Link, useNavigate } from 'react-router-dom';
import HeaderComponent from "./HeaderComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";

const ListCategoryComponent = () => {

    const [categories, setCategories] = useState([]);

    const navigator = useNavigate();

    useEffect( () => {
       listOfCategories();
    }, [])

    function listOfCategories(){
        getAllCategories().then((response) => {
            console.log(response.data);
            setCategories(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    function updateCategory(id){
        navigator(`/edit-category/${id}`)
    }


    function removeCategory(id){
        deleteCategory(id).then((response) => {
            console.log(response.data);
            listOfCategories();
        }).catch(error => {
            console.error(error);
        })
    }
  return (
    <div className='container'>
        <HeaderComponent />
        <h2 className='text-center'>List of Categories</h2>
        <Link to='/add-category' className='btn btn-primary mb-2'>Add category</Link>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Category Id</th>
                    <th>Type Product </th>
                    <th> Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    categories.map( category =>
                            <tr key={category.id}>
                                <td> {category.id} </td>
                                <td> {category.typeProduct} </td>
                                <td> {category.description} </td>
                                <td>
                                    <button onClick={() => updateCategory(category.id)} className='btn btn-info'>Update</button>
                                    <button onClick={() => removeCategory(category.id)} className='btn btn-danger'
                                        style={{marginLeft: "10px"}}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                }
            </tbody>
        </table>
        <FooterComponent />
    </div>
  )
}

export default ListCategoryComponent