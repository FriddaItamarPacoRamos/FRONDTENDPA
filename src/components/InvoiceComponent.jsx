import React, { useEffect, useState } from 'react';
import { createInvoice, getInvoiceById, updateInvoice } from '../services/InvoiceService';
import { useNavigate, useParams } from 'react-router-dom';

const InvoiceComponent = () => {

    const [totalMont, setTotalMont] = useState('');
    const [totalProduct, setTotalProduct] = useState('');
    const [nit, setNit] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getInvoiceById(id).then((response) => {
                setTotalMont(response.data.totalMont);
                settotalProduct(response.data.totalProduct);
                setnit(response.data.nit);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    const saveOrUpdateInvoice = (e) => {
        e.preventDefault();

        const invoice = { totalMont, totalProduct, nit };

        if (id) {
            updateInvoice(id, invoice).then(() => {
                navigate('/invoices');
            }).catch(error => {
                console.error(error);
            });
        } else {
            createInvoice(invoice).then(() => {
                navigate('/invoices');
            }).catch(error => {
                console.error(error);
            });
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">{id ? 'Update Invoice' : 'Add Invoice'}</h2>
            <form onSubmit={saveOrUpdateInvoice}>
                <div className="form-group">
                    <label>Total Mont</label>
                    <input type="text" className="form-control" value={totalMont} onChange={(e) => settotalMont(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Total Product</label>
                    <input type="text" className="form-control" value={totalProduct} onChange={(e) => settotalProduct(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Nit</label>
                    <input type="nit" className="form-control" value={nit} onChange={(e) => setnit(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default InvoiceComponent;
