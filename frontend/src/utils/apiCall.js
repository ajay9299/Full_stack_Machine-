import axios from 'axios';

// Create an instance of Axios with custom configuration
const api = axios.create({
    timeout: 5000, // Set a timeout for requests (in milliseconds)
});

// Request interceptor to add an authentication token
api.interceptors.request.use((config) => {
    console.log("<<<config>>>", config)
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        // Successful response handling
        return response.data; // You may customize this based on your API response structure
    },
    (error) => {

        // Error response handling
        if (error.response) {
            alert(error.response.data.message)
            // The request was made, but the server responded with an error status code
            console.error('API Error:', error.response.status, error.response.data);
            return

        } else if (error.request) {
            // The request was made but no response was received
            console.error('Request Error:', error.request);
        } else {
            // Something happened in setting up the request that triggered an error
            console.error('Request Setup Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// Generic function for making HTTP requests
async function makeRequest(method, url, data = null) {
    try {
        console.log("?????", data)
        const response = await api.request({
            method, // 'get' or 'post'
            url, // URL for the request
            data, // Data for POST requests
        });
        return response;
    } catch (error) {
        // Handle errors here
        console.error('API Call Error:', error);
        return null;
    }
}

export default makeRequest;
