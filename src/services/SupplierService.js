import axios from 'axios';

const SUPPLIER_REST_API_BASE_URL = 'http://localhost:8080/api/suppliers'; // Ajusta esta URL según tu configuración

// Obtener todos los proveedores
export const getAllSuppliers = () => {
    return axios.get(SUPPLIER_REST_API_BASE_URL);
};

// Crear un nuevo proveedor
export const createSupplier = (supplier) => {
    return axios.post(SUPPLIER_REST_API_BASE_URL, supplier);
};

// Obtener un proveedor por ID
export const getSupplierById = (supplierId) => {
    return axios.get(`${SUPPLIER_REST_API_BASE_URL}/${supplierId}`);
};

// Actualizar un proveedor existente
export const updateSupplier = (supplierId, supplier) => {
    return axios.put(`${SUPPLIER_REST_API_BASE_URL}/${supplierId}`, supplier);
};

// Eliminar un proveedor por ID
export const deleteSupplier = (supplierId) => {
    return axios.delete(`${SUPPLIER_REST_API_BASE_URL}/${supplierId}`);
};







