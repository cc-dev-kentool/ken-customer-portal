// Define initial state object with isLoading property set to false.
const initialState = {
  isLoading: false,
  masterData: {
    materials: [],
    test_groups: []
  }
}

// Define app reducer function with state and action as parameters.
const app = (state = initialState, action) => {
  switch (action.type) {
    // Case for SET_LOADING action type
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    // Case for SET_MASTER_DATA action type
    case 'SET_MASTER_DATA':
      return {
        ...state,
        masterData: action.payload
      }
    // Case for GET_MASTER_DATA_SUCCESS action type
    case 'GET_MASTER_DATA_SUCCESS':
      return {
        ...state,
        masterData: action.payload
      }
    // Default fallback case returns the current state.
    default:
      return state
  }
}

// Exporting app reducer function as default.
export default app