import axios from "axios";
const BASE_URL = 'http://localhost:3000';

export function createUser(data) {
    return axios.post(`${BASE_URL}/subscribe`,
        { username: data.username, email: data.email, address: data.address }
    ).then(response => {
        return response.data
    })
        .catch(err => Promise.reject(err.message));
}

export function getNotes() {
    return axios.get(`${BASE_URL}/retrieve`)
            .then(response => response.data);
}

