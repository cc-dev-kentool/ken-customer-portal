/*
* This code defines and exports an object containing API endpoint URLs used for authentication related requests.
* The URLs are organized under the 'auth' property of the object, with each URL assigned to a specific key.
*/

const API_ENDPOINTS = {
	auth: {
		REGISTER: '/auth/register' // Register endpoint URL
	}
}

export default API_ENDPOINTS // Export the API endpoint object for use in other modules