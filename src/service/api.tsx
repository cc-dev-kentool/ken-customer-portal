import axios from "./axios"

/*
* This code exports a function called `API` that can be used to make HTTP requests. The function takes an object as its argument which has the following properties: url, method, responseType, data, cancelToken, params and headers.
*/

const API: any = async ({
  url,
  method,
  responseType,
  data,
  cancelToken,
  // baseUrlType,
  params,
  headers
}) => {

  // Constructs an axios request object based on the arguments provided.
  let axiosRequestObject = {
    method, // HTTP method (e.g. 'GET', 'POST')
    url, // URL to send the request to (e.g. https://example.com/api/users)
    // baseURL: getBaseUrl(baseUrlType), // Base URL for the request. This is not currently being used.
    data, // Data to be sent with the request (e.g. JSON payload)
    headers, // Additional headers to include in the request (e.g. Authorization token)
    responseType, // The desired response type (e.g. JSON, XML)
    params, // Query parameters to include in the request (e.g. ?name=John&age=30)
    ...(cancelToken ? { cancelToken } : ""), // Cancel token to use if the request needs to be cancelled
  }

  // Makes an HTTP request using the constructed axios request object and returns the response.
  let request = await axios.request(axiosRequestObject)
    .then(handleSuccessRequest) // Handles a successful response from the server
    .catch(handleErrorRequest) // Handles an error response from the server

  return request // Resolves the request promise with the response or rejection reason
}

// Function that handles a successful HTTP request by returning the response status and data.
const handleSuccessRequest = (response) => ({
  status: response.status,
  data: response.data
})

// Function that handles an error HTTP request by returning a rejection promise with the corresponding rejection reason.
const handleErrorRequest = (err) => {
  if (!err.response) {
    // No response was received from the server
    return Promise.reject()
  }
  else if (err.response?.data?.data === "Signature has expired") {
    // Token expired or invalid, redirect to login page and clear localStorage
    localStorage.clear()
    localStorage.setItem("isTokenExpired", "true")
    window.location.href = "/login?continue=" + encodeURIComponent(window.location.href); // Navigating to login page
    return Promise.reject()
  }
  else if (err.response?.status === 406) {
    // User must change password before continuing, redirect to login page and clear localStorage
    localStorage.clear()
    localStorage.setItem("isForceChangePassword", "true")
    window.location.href = "/login"
    return Promise.reject()
  } 
  else return Promise.reject(err.response) // Otherwise, return the error response as the rejection reason
}

export default API // Export the `API` function for use in other modules