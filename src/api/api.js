import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8001",  // Matching your working backend port
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        if (error.code === 'ECONNABORTED') {
            console.log('Request timeout - LLM model may be loading');
        } else if (error.response) {
            console.log('Response Error:', error.response.status, error.response.data);
        } else {
            console.log('Network Error:', error.message);
        }
        return Promise.reject(error);
    }
);

export default api;
