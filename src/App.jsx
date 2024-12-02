import './App.css'
import ProductComponent from './components/ProductComponent.jsx'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListProductComponent from './components/ListProductComponent.jsx'
import ListCategoryComponent from "./components/ListCategoryComponent.jsx";
import CategoryComponent from "./components/CategoryComponent.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import "./index.css"
import OrderComponent from "./components/OrderComponent.jsx";
import ListOrderComponent from "./components/ListOrderComponent.jsx";
import ListClientComponent from "./components/ListClientComponent.jsx";
import ClientComponent from "./components/ClientComponent.jsx"
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


              {/* Rutas para el manejo de órdenes */}
              <Route path='/orders' element={<ListOrderComponent />} />  {/* Lista todas las órdenes */}
              <Route path='/create-order' element={<OrderComponent />} />  {/* Crea una nueva orden */}
              <Route path='/edit-order/:id' element={<OrderComponent />} />  {/* Edita una orden existente */}


              {/* Nuevas rutas para Cliente */}
              <Route path='/clients' element={<ListClientComponent />} />  {/* Lista de clientes */}
              <Route path='/add-client' element={<ClientComponent />} />  {/* Crear cliente */}
              <Route path='/edit-client/:id' element={<ClientComponent />} />  {/* Editar cliente */}

              {/* Nuevas rutas para Cliente */}
              <Route path='/invoices' element={<ListInvoiceComponent />} />  {/* Lista de facturas */}
              <Route path='/add-invoice' element={<InvoiceComponent />} />  {/* Crear factura */}
              <Route path='/edit-invoice/:id' element={<InvoiceComponent />} />  {/* Editar factura */}


          </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
