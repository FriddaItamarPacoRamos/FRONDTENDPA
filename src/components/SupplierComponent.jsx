import React, { useEffect, useState } from 'react';
import { createSupplier, getSupplierById, updateSupplier } from '../services/SupplierService.js';  // Asegúrate de usar los nombres correctos de las funciones
import { useNavigate, useParams } from 'react-router-dom';

const SupplierComponent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getSupplierById(id).then((response) => {
                setName(response.data.name);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    const saveOrUpdateSupplier = (e) => {
        e.preventDefault();

        const supplier = { name, email }; // No estamos usando 'lastName'

        if (id) {
            updateSupplier(id, supplier).then(() => {
                navigate('/suppliers');
            }).catch(error => {
                console.error(error);
                navigate('/suppliers');
            });
        } else {
            createSupplier(supplier).then(() => {
                navigate('/suppliers');
            }).catch(error => {
                console.error(error);
                navigate('/suppliers');
            });
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">{id ? 'Update Supplier' : 'Add Supplier'}</h2>
            <form onSubmit={saveOrUpdateSupplier}>
                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default SupplierComponent;
