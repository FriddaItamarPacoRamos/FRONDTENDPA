import axios from 'axios';

const INVOICE_REST_API_BASE_URL = 'http://localhost:8080/api/invoices'; // Ajusta esta URL según tu configuración

// Obtener todos los clientes
export const getAllInvoices = () => {
    return axios.get(INVOICE_REST_API_BASE_URL);
};

// Crear un nueva factura
export const createInvoice = (client) => {
    return axios.post(INVOICE_REST_API_BASE_URL, client);
};

// Obtener un FACTURA por ID
export const getInvoiceById = (invoiceId) => {
    return axios.get(`${INVOICE_REST_API_BASE_URL}/${invoiceId}`);
};

// Actualizar una factura existente
export const updateInvoice = (invoiceId, invoice) => {
    return axios.put(`${INVOICE_REST_API_BASE_URL}/${invoiceId}`, invoice);
};

// Eliminar una factura por ID
export const deleteInvoice = (invoiceId) => {
    return axios.delete(`${INVOICE_REST_API_BASE_URL}/${invoiceId}`);
};
