import axios from 'axios'

/*
* This code sets the base URL for Axios (a popular HTTP client library) to the API endpoint specified in the environment variables of the application.
*/

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT

/*
* This code adds an interceptor to Axios. Interceptors are functions that can modify HTTP requests and responses before they are sent or received. 
* In this case, the interceptor is used to add an Authorization header to every HTTP request made with Axios, using a Bearer token taken from localStorage.
*/

axios.interceptors.request.use(function (axios_config: any) {
    axios_config.headers.Authorization = "Bearer " + localStorage.getItem('token') // Add 'Authorization' header with Bearer token from local storage
    return axios_config // Return modified request configuration
}, function (error) {
    // Handle request error
    return Promise.reject(error) // Reject promise with error
})

export default axios // Export the modified Axios object for use in other modules
