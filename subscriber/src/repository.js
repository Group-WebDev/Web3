import axios from 'axios'
const BASE_URL = 'http://localhost:5000';

export function getItem(){
    return axios.get(`${BASE_URL}/api/item/list`)
        .then(response => response.data)
}
export function deleteItem(id){
    return axios.post(`${BASE_URL}/api/item/delete/${id}`)
            .then(response => response.data)
            .catch(err => Promise.reject(err.message));
}
export function createItem(data) {
    return axios.post(`${BASE_URL}/api/item/create`, 
    { Event: data.event, Address: data.address, Description: data.description, Category: data.category, Image: data.file }
    )      .then(response => {
                    return response.data
            })
            .catch(err => Promise.reject(err.message));
}

export function updateItem(data, id) {
    return axios.post(`${BASE_URL}/api/item/update/${id}`, { data })
            .then(response => {
                    return response.data
            })
            .catch(err => Promise.reject(err.message));
}