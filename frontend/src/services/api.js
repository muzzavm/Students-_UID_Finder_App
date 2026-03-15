import axios from 'axios';
const API_URL = 'http://localhost:5000/api/students';

export const searchStudents = (query) => axios.get(`${API_URL}/search?query=${query}`);