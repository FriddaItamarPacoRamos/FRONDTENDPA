import React, { useEffect, useState } from 'react'
import { createCategory, getCategoryById, updateCategory } from '../services/CategoryService';
import { useNavigate, useParams } from 'react-router-dom';

const CategoryComponent = () => {

  const [TypeProduct, setTypeProduct] = useState('')
  const [Description, setDescription] = useState('')

  const {id} = useParams();

  const navigator = useNavigate();

  useEffect(() => {

    getCategoryById(id).then((response) => {
      setDescription(response.data.Description);
      setTypeProduct(response.data.TypeProduct);
    }).catch(error => {
      console.error(error);
    })

  }, [id])

  function saveOrUpdateCategory(e){
    e.preventDefault();

    const category = { typeProduct:TypeProduct,description: Description }

    console.log(category);

    if(id){
      updateCategory(id, category).then((response) => {
        console.log(response.data);
        navigator('/categories');
      }).catch(error => {
        console.error(error);
      })
    }else {
      createCategory(category).then((response) => {
        console.log(response.data);
        navigator('/categories')
      }).catch(error => {
        console.error(error);
      })
    }

  }

  function pageTitle(){
    if(id){
        return <h2 className='text-center'>Update Category</h2>
    } else {
        return <h2 className='text-center'>Add Category</h2>
    }
  }

  return (
    <div className='container'><br /><br />
      <div className='row'>
          <div className='card col-md-6 offset-md-3 offset-md-3'>
              {
                pageTitle()
              }

              <div className='card-body'>
                  <form>
                      <div className='form-group mb-2'>
                          <label className='form-label'>Category Name:</label>
                          <input
                            type='text'
                            name='TypeProduct'
                            placeholder='Enter Type Product Name'
                            className='form-control'
                            value={TypeProduct}
                            onChange={(e) => setTypeProduct(e.target.value)}

                          >
                          </input>
                      </div>

                      <div className='form-group mb-2'>
                          <label className='form-label'>Product Description:</label>
                          <input
                            type='text'
                            name='Description'
                            placeholder='Enter Description'
                            value={Description}
                            onChange={(e) => setDescription(e.target.value)}
                            className='form-control'
                          >
                          </input>
                      </div>
                      <button className='btn btn-success mb-2' onClick={(e) => saveOrUpdateCategory(e)}>Submit</button>
                  </form>

              </div>
          </div>

      </div>

    </div>
  )
}

export default CategoryComponent