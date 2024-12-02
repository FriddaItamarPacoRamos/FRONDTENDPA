import axios from 'axios';

const ORDER_API_URL = 'http://localhost:8080/api/orders';

export const getAllOrders = () => axios.get(ORDER_API_URL);

export const createOrder = (order) => axios.post(ORDER_API_URL, order);

export const getOrderById = (orderId) => axios.get(`${ORDER_API_URL}/${orderId}`);

export const updateOrder = (orderId, order) => axios.put(`${ORDER_API_URL}/${orderId}`, order);

export const deleteOrder = (orderId) => axios.delete(`${ORDER_API_URL}/${orderId}`);
