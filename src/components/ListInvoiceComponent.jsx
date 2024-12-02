import React, { useEffect, useState } from 'react';
import {deleteInvoice, getAllInvoices} from '../services/InvoiceService';
import { useNavigate } from 'react-router-dom';

const ListInvoiceComponent = () => {
    const [invoices, setInvoices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        listAllInvoices();
    }, []);

    function listAllInvoices() {
        getAllInvoices().then((response) => {
            setInvoices(response.data);
        }).catch(error => {
            console.error("Error fetching invoices:", error);
        });
    }

    function updateInvoice(id) {
        navigate(`/edit-invoice/${id}`);
    }

    function removeInvoice(id) {
        if (window.confirm("Are you sure you want to delete this invoice?")) {
            deleteInvoice(id).then(() => {
                listAllInvoices();
            }).catch(error => {
                console.error("Error deleting invoice:", error);
            });
        }
    }

    return (
        <div className="container">
            <h2 className="text-center">List of Invoices</h2>
            <button className="btn btn-primary mb-2" onClick={() => navigate('/create-invoice')}>Add Invoice</button>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Invoice ID</th>
                    <th>Nit</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {invoices.map(invoice => (
                    <tr key={invoice.id}>
                        <td>{invoice.id}</td>
                        <td>{invoice.nit}</td>
                        <td>{invoice.productIds.join(', ')}</td>
                        <td>
                            <button className="btn btn-info" onClick={() => updateInvoice(invoice.id)}>Update</button>
                            <button className="btn btn-danger" onClick={() => removeInvoice(invoice.id)}
                                    style={{marginLeft: "10px"}}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListInvoiceComponent;


