import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductComponent from './components/ProductComponent.jsx';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListProductComponent from './components/ListProductComponent.jsx';
import ListCategoryComponent from './components/ListCategoryComponent.jsx';
import CategoryComponent from './components/CategoryComponent.jsx';
import OrderComponent from './components/OrderComponent.jsx';
import ListOrderComponent from './components/ListOrderComponent.jsx';
import ListClientComponent from './components/ListClientComponent.jsx';
import ClientComponent from './components/ClientComponent.jsx';
import ListInvoiceComponent from './components/ListInvoiceComponent.jsx';
import InvoiceComponent from './components/InvoiceComponent.jsx';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    {/* Página principal */}
                    <Route
                        path="/"
                        element={
                            <div>
                                <HeaderComponent />
                                <div className="banner">
                                    <img src="https://img.freepik.com/foto-gratis/retrato-farmaceutica-que-trabaja-farmacia_23-2151684854.jpg" alt="Banner" />
                                    <div className="text">
                                        <h1>BIENVENIDO A FARMACIA DON TITO</h1>
                                        <p>Donde la salud se encuentra con el corazón</p>
                                        <button>Aprende más</button>
                                    </div>
                                </div>

                                {/* Sección de contenido */}
                                <div className="content">
                                    <div className="content-column">
                                        <img src="https://th.bing.com/th/id/R.b7e2f02d457b88defff7950a7ee9b2cc?rik=2ic2QXnPwJRniw&pid=ImgRaw&r=0" alt="Cuidado de la salud" />
                                        <h2>Cuidado de la Salud</h2>
                                        <p>En Farmacia Don Tito, estamos comprometidos con tu bienestar. Ofrecemos productos y servicios para ayudarte a mantener un estilo de vida saludable. Estamos disponibles las 24 horas, los 7 días de la semana, brindándote el mejor servicio médico a través de nuestros profesionales y productos especializados.</p>
                                    </div>

                                    <div className="content-column">
                                        <img src="https://th.bing.com/th/id/OIP.HkfvTgn6YXkq1YrCF9JKmAHaE8?rs=1&pid=ImgDetMain" alt="Consultas médicas" />
                                        <h2>Consultas Médicas</h2>
                                        <p>Contamos con un equipo de médicos altamente calificados para atender tus necesidades de salud. Ya sea que necesites una consulta para controlar tu salud o asesoramiento sobre medicamentos, estamos aquí para ayudarte.</p>
                                    </div>

                                    <div className="content-column">
                                        <img src="https://th.bing.com/th/id/R.0a87f756a1d26eb9027e1baaf46cfbdc?rik=Oiy9Yn6fjU40Vw&pid=ImgRaw&r=0" alt="Farmacia" />
                                        <h2>Farmacia en Línea</h2>
                                        <p>Compra productos de salud y cuidado personal de forma fácil y rápida a través de nuestra tienda en línea. Contamos con un amplio catálogo de medicamentos y productos de bienestar para ti y tu familia. ¡Haz tu pedido hoy y recibe en la comodidad de tu hogar.</p>
                                    </div>
                                </div>

                                <FooterComponent />
                            </div>
                        }
                    />

                    {/* Rutas para productos */}
                    <Route path="/products" element={<ListProductComponent />} />
                    <Route path="/add-product" element={<ProductComponent />} />
                    <Route path="/edit-product/:id" element={<ProductComponent />} />

                    {/* Rutas para categorías */}
                    <Route path="/categories" element={<ListCategoryComponent />} />
                    <Route path="/add-category" element={<CategoryComponent />} />
                    <Route path="/edit-category/:id" element={<CategoryComponent />} />

                    {/* Rutas para órdenes */}
                    <Route path="/orders" element={<ListOrderComponent />} />
                    <Route path="/create-order" element={<OrderComponent />} />
                    <Route path="/edit-order/:id" element={<OrderComponent />} />

                    {/* Rutas para clientes */}
                    <Route path="/clients" element={<ListClientComponent />} />
                    <Route path="/add-client" element={<ClientComponent />} />
                    <Route path="/edit-client/:id" element={<ClientComponent />} />

                    {/* Rutas para facturas */}
                    <Route path="/invoices" element={<ListInvoiceComponent />} />
                    <Route path="/create-invoice" element={<InvoiceComponent />} />
                    <Route path="/edit-invoice/:id" element={<InvoiceComponent />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;



// import './App.css'
// import ProductComponent from './components/ProductComponent.jsx'
// import FooterComponent from './components/FooterComponent'
// import HeaderComponent from './components/HeaderComponent'
// import ListProductComponent from './components/ListProductComponent.jsx'
// import ListCategoryComponent from "./components/ListCategoryComponent.jsx";
// import CategoryComponent from "./components/CategoryComponent.jsx";
// import {BrowserRouter, Routes, Route} from 'react-router-dom'
// import "./index.css"
// import OrderComponent from "./components/OrderComponent.jsx";
// import ListOrderComponent from "./components/ListOrderComponent.jsx";
// import ListClientComponent from "./components/ListClientComponent.jsx";
// import ClientComponent from "./components/ClientComponent.jsx"
// import ListInvoiceComponent from "./components/ListInvoiceComponent.jsx";
// import InvoiceComponent from "./components/InvoiceComponent.jsx";
// function App() {
//
//     return (
//         <>
//             <BrowserRouter>
//                 <HeaderComponent />
//                 <Routes>
//                     {/* // http://localhost:3000 */}
//                     {<Route path='/' element = { <ListProductComponent />}></Route>}
//
//                     {/* // http://localhost:3000/product */}
//                     <Route path='/products' element = { <ListProductComponent /> }></Route>
//                     {/* // http://localhost:3000/add-product */}
//                     <Route path='/add-product' element = { <ProductComponent />}></Route>
//
//                     {/* // http://localhost:3000/edit-product/1 */}
//                     <Route path='/edit-product/:id' element = { <ProductComponent /> }></Route>
//
//                     {/* // http://localhost:3000/departents */}
//                     <Route path='/categories' element = { <ListCategoryComponent />}></Route>
//
//                     {/* // http://localhost:3000/add-department */}
//                     <Route path='/add-category' element = { <CategoryComponent /> }></Route>
//
//                     <Route path='/edit-category/:id' element = { <CategoryComponent />}></Route>
//
//
//                     {/* Rutas para el manejo de órdenes */}
//                     <Route path='/orders' element={<ListOrderComponent />} />  {/* Lista todas las órdenes */}
//                     <Route path='/create-order' element={<OrderComponent />} />  {/* Crea una nueva orden */}
//                     <Route path='/edit-order/:id' element={<OrderComponent />} />  {/* Edita una orden existente */}
//
//
//                     {/* Nuevas rutas para Cliente */}
//                     <Route path='/clients' element={<ListClientComponent />} />  {/* Lista de clientes */}
//                     <Route path='/add-client' element={<ClientComponent />} />  {/* Crear cliente */}
//                     <Route path='/edit-client/:id' element={<ClientComponent />} />  {/* Editar cliente */}
//
//                     {/* Nuevas rutas para invoice */}
//                     <Route path='/invoices' element={<ListInvoiceComponent />} />  {/* Lista de facturas */}
//                     <Route path='/create-invoice' element={<InvoiceComponent />} />  {/* Crear factura */}
//                     <Route path='/edit-invoice/:id' element={<InvoiceComponent />} />  {/* Editar factura */}
//
//
//                 </Routes>
//                 <FooterComponent />
//             </BrowserRouter>
//         </>
//     )
// }
//
// export default App


