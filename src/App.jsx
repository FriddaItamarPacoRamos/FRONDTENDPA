import './App.css'

import ProductComponent from './components/ProductComponent.jsx'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListProductComponent from './components/ListProductComponent.jsx'
import ListCategoryComponent from "./components/ListCategoryComponent.jsx";
import CategoryComponent from "./components/CategoryComponent.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "./index.css"
function App() {

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
          <Routes>
            {/* // http://localhost:3000 */}
              <Route path='/' element = { <ListProductComponent />}></Route>
              {/* // http://localhost:3000/product */}
              <Route path='/products' element = { <ListProductComponent /> }></Route>
              {/* // http://localhost:3000/add-product */}
              <Route path='/add-product' element = { <ProductComponent />}></Route>

              {/* // http://localhost:3000/edit-product/1 */}
              <Route path='/edit-product/:id' element = { <ProductComponent /> }></Route>

              {/* // http://localhost:3000/departents */}
              <Route path='/categories' element = { <ListCategoryComponent />}></Route>

              {/* // http://localhost:3000/add-department */}
              <Route path='/add-category' element = { <CategoryComponent /> }></Route>

              <Route path='/edit-category/:id' element = { <CategoryComponent />}></Route>
          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
