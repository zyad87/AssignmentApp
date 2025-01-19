import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getPersons = () => axios.get(`${API_BASE_URL}/People`);
export const addPerson = (person) => axios.post(`${API_BASE_URL}/People`, person);
export const editPerson = (id, person) => axios.put(`${API_BASE_URL}/People/${id}`, person);
export const getPersonById = (id) => axios.get(`${API_BASE_URL}/People/${id}`);
