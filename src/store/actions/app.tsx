//Defining a 'setLoading' function which takes a boolean parameter called 'isLoading'.
export const setLoading = (isLoading) => ({
  //Returning an object with type 'SET_LOADING' and payload as the value of isLoading passed.
  type: 'SET_LOADING',
  payload: isLoading
})

//Defining a 'setStatus' function which takes two parameters- type and status.
export const setStatus = (type, status) => ({
  //Returning an object with type equal to 'type' parameter's value and payload as the value of status passed.
  type: type,
  payload: status
})