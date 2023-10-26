import { userActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  listUser: [],
  getListUserSuccess: false,
}

// Declaring the modal reducer function
const getAnalysisData = (state = initialState, action) => {
  switch (action.type) {
    // Case for GET_LIST_USER action type.
    case userActionType.GET_LIST_USER:
      return {
        ...state,
        listUser: action.payload
      }
    // Case for GET_LIST_USER_SUCCESS action type.
    case userActionType.GET_LIST_USER_SUCCESS:
      return {
        ...state,
        getListUserSuccess: action.payload,
      }
    // Default fallback case returns the current state.
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default getAnalysisData
