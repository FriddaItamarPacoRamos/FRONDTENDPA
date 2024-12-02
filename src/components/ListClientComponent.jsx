import React, { useEffect, useState } from 'react';
import { getAllClients, deleteClient } from '../services/ClientService';
import { useNavigate } from 'react-router-dom';

const ListClientComponent = () => {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadClients();
    }, []);

    const loadClients = () => {
        getAllClients().then(response => {
            setClients(response.data);
        }).catch(error => {
            console.error("There was an error fetching the clients!", error);
        });
    };

    const editClient = (id) => {
        navigate('/edit-client/${id}');
    };

    const removeClient = (id) => {
        deleteClient(id).then(() => {
            loadClients(); // Refresh the client list after deletion
        }).catch(error => {
            console.error("There was an error deleting the client!", error);
        });
    };

    return (
        <div className="container">
            <h2 className="text-center">List of Clients</h2>
            <button className="btn btn-primary mb-2" onClick={() => navigate('/add-client')}>Add Client</button>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Client Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {clients.map(client => (
                    <tr key={client.id}>
                        <td>{client.id}</td>
                        <td>{client.firstName}</td>
                        <td>{client.lastName}</td>
                        <td>{client.email}</td>
                        <td>
                            <button className="btn btn-info" onClick={() => editClient(client.id)}>Edit</button>
                            <button className="btn btn-danger" onClick={() => removeClient(client.id)} style={{ marginLeft: '10px' }}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListClientComponent;