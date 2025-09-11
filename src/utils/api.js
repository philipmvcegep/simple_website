import axios from 'axios';

const API = "http://localhost:8585/";

export const getPerson = async() => {
    const response = await axios.get(`/persons`);
    return response.data;
}

export const searchPersons = async (query) => {
    const response = await axios.get(`/persons/search`, {params : {query}});
    return response.data
    }