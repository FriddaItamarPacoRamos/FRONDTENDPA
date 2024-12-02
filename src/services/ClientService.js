import axios from 'axios';

const CLIENT_REST_API_BASE_URL = 'http://localhost:8080/api/clients'; // Ajusta esta URL según tu configuración

// Obtener todos los clientes
export const getAllClients = () => {
    return axios.get(CLIENT_REST_API_BASE_URL);
};

// Crear un nuevo cliente
export const createClient = (client) => {
    return axios.post(CLIENT_REST_API_BASE_URL, client);
};

// Obtener un cliente por ID
export const getClientById = (clientId) => {
    return axios.get(`${CLIENT_REST_API_BASE_URL}/${clientId}`);
};

// Actualizar un cliente existente
export const updateClient = (clientId, client) => {
    return axios.put(`${CLIENT_REST_API_BASE_URL}/${clientId}`, client);
};

// Eliminar un cliente por ID
export const deleteClient = (clientId) => {
    return axios.delete(`${CLIENT_REST_API_BASE_URL}/${clientId}`);
};








