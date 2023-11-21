import { utilitiesActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  result: "",
  getResultSuccess: false,
}

// Declaring the modal reducer function
const promptSetting = (state = initialState, action) => {
  switch (action.type) {
    // Case for GET_UTILITIES action type.
    case utilitiesActionType.GET_UTILITIES:
      return {
        ...state,
        result: action.payload
      }
    // Case for GET_UTILITIES_SUCCESS action type.
    case utilitiesActionType.GET_UTILITIES_SUCCESS:
      return {
        ...state,
        getResultSuccess: action.payload,
      }
    // Default fallback case returns the current state.
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default promptSetting
