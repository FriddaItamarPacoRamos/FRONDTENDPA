import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';

import ProductComponent from './components/ProductComponent.jsx';
import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListProductComponent from './ListComponets/ListProductComponent.jsx';
import ListCategoryComponent from './ListComponets/ListCategoryComponent.jsx';
import CategoryComponent from './components/CategoryComponent.jsx';
import ListOrderComponent from './ListComponets/ListOrderComponent.jsx';
import ListSupplierComponent from './ListComponets/ListSupplierComponent.jsx';
import SupplierComponent from './components/SupplierComponent.jsx';
import ListInvoiceComponent from './ListComponets/ListInvoiceComponent.jsx';
import InvoiceComponent from './components/InvoiceComponent.jsx';
import CartComponent from "./components/CartComponent.jsx";
import Home from "./ListComponets/Home.jsx";
import Login from './pages/Login';
import Cliente from './pages/Cliente';
import Proveedor from './pages/Proveedor';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <BrowserRouter>
            <Routes>
                {/* Redirige a login si no hay sesión */}
                <Route
                    path="/"
                    element={
                        isAuthenticated ? (
                            <Navigate to="/cliente" />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />

                {/* Login */}
                <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

                {/* Vistas según rol */}
                <Route path="/cliente" element={<Cliente />} />
                <Route path="/proveedor" element={<Proveedor />} />

                {/* Rutas protegidas: solo si está autenticado */}
                {isAuthenticated && (
                    <>
                        <Route path="/products" element={<ListProductComponent />} />
                        <Route path="/add-product" element={<ProductComponent />} />
                        <Route path="/edit-product/:id" element={<ProductComponent />} />
                        <Route path="/categories" element={<ListCategoryComponent />} />
                        <Route path="/add-category" element={<CategoryComponent />} />
                        <Route path="/edit-category/:id" element={<CategoryComponent />} />
                        <Route path="/orders" element={<ListOrderComponent />} />
                        <Route path="/suppliers" element={<ListSupplierComponent />} />
                        <Route path="/add-supplier" element={<SupplierComponent />} />
                        <Route path="/edit-supplier/:id" element={<SupplierComponent />} />
                        <Route path="/invoices" element={<ListInvoiceComponent />} />
                        <Route path="/create-invoice" element={<InvoiceComponent />} />
                        <Route path="/edit-invoice/:id" element={<InvoiceComponent />} />
                        <Route path="/cart" element={<CartComponent />} />
                        <Route path="/inicio" element={<Home />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
