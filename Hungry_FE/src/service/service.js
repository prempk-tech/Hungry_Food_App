import axios from "axios";

var base_url = "http://localhost:3002/api/";
var token = localStorage.getItem('token')

export function get(url) {
    return axios({
        method: 'GET',
        url: `${base_url}${url}`,
        headers: {
            'Content-Type': 'application/json',
            // "Authorization": `Bearer ${token}`
        }
    }).then((response) => {
        return response.data
    }).catch(err => console.log(err))
}

export function post(url, data) {
    return axios({
        method: 'POST',
        url: `${base_url}${url}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }).then((response) => {
        return response.data
    }).catch(err => console.log(err))
}

// For GET requests
axios.interceptors.request.use(
    (req) => {
        // Add configurations here
        return req;
    },
    (err) => {
        return Promise.reject(err);
    }
);

// For POST requests
axios.interceptors.response.use(
    (res) => {
        // Add configurations here
        if (res.status === 201) {
            console.log('Posted Successfully');
        }
        return res;
    },
    (err) => {
        return Promise.reject(err);
    }
);