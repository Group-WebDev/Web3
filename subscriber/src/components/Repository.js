import axios from "axios";
const BASE_URL = 'http://localhost:5000';

export function createUser(data) {
    return axios.post(`${BASE_URL}/subscribe`,
        { firstname: data.firstname, lastname:data.lastname, middlename:data.middlename, email: data.email, address: data.address }
    ).then(response => {
        window.console.log(response)
        return response.data
    })
        .catch(err => Promise.reject(err.message));
}

// export function getNotes() {
//     return axios.get(`${BASE_URL}/retrieve`)
//             .then(response => response.data);
// }

