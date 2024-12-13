import React, { useEffect, useState } from 'react';
import { getAllSuppliers, deleteSupplier } from '../services/SupplierService.js'; // Updated to SupplierService
import { useNavigate } from 'react-router-dom';
import FooterComponent from "../components/FooterComponent.jsx";
import HeaderComponent from "../components/HeaderComponent.jsx";

const ListSupplierComponent = () => {  // Changed to SupplierComponent
    const [suppliers, setSuppliers] = useState([]);  // Changed to Suppliers
    const navigate = useNavigate();

    useEffect(() => {
        loadSuppliers();  // Changed to Suppliers
    }, []);

    const loadSuppliers = () => {  // Changed to Suppliers
        getAllSuppliers().then(response => {  // Changed to Suppliers
            setSuppliers(response.data);  // Changed to Suppliers
        }).catch(error => {
            console.error("There was an error fetching the suppliers!", error);  // Changed to Suppliers
        });
    };

    const editSupplier = (id) => {  // Changed to Supplier
        navigate(`/edit-supplier/${id}`);  // Changed to Supplier
    };

    const removeSupplier = (id) => {  // Changed to Supplier
        deleteSupplier(id).then(() => {  // Changed to Supplier
            loadSuppliers(); // Refresh the supplier list after deletion  // Changed to Supplier
        }).catch(error => {
            console.error("There was an error deleting the supplier!", error);  // Changed to Supplier
        });
    };

    return (
        <div className="container">
            <HeaderComponent />
            <h2 className="text-center">List of Suppliers</h2>  {/* Changed to Suppliers */}
            <button className="btn btn-primary mb-2" onClick={() => navigate('/add-supplier')}>Add Supplier</button>  {/* Changed to Supplier */}
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Supplier Id</th>  {/* Changed to Supplier */}
                    <th>Name</th>  {/* Only showing 'Name' as 'lastName' has been removed */}
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {suppliers.map(supplier => (  // Changed to Suppliers
                    <tr key={supplier.id}>  {/* Changed to Supplier */}
                        <td>{supplier.id}</td>  {/* Changed to Supplier */}
                        <td>{supplier.name}</td> {/* Displaying 'name' instead of first and last name */}
                        <td>{supplier.email}</td>
                        <td>
                            <button className="btn btn-info" onClick={() => editSupplier(supplier.id)}>Edit</button>  {/* Changed to Supplier */}
                            <button className="btn btn-danger" onClick={() => removeSupplier(supplier.id)} style={{ marginLeft: '10px' }}>Delete</button>  {/* Changed to Supplier */}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <FooterComponent />
        </div>
    );
};

export default ListSupplierComponent;
