import React, { useEffect, useState } from 'react';
import { createClient, getClientById, updateClient } from '../services/ClientService';
import { useNavigate, useParams } from 'react-router-dom';

const ClientComponent = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            getClientById(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    const saveOrUpdateClient = (e) => {
        e.preventDefault();

        const client = { firstName, lastName, email };

        if (id) {
            updateClient(id, client).then(() => {
                navigate('/clients');
            }).catch(error => {
                console.error(error);
            });
        } else {
            createClient(client).then(() => {
                navigate('/clients');
            }).catch(error => {
                console.error(error);
            });
        }
    };

    return (
        <div className="container">
            <h2 className="text-center">{id ? 'Update Client' : 'Add Client'}</h2>
            <form onSubmit={saveOrUpdateClient}>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
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

export default ClientComponent;
