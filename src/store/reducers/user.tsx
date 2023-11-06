import { userActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  listUser: [],
  getListUserSuccess: false,
  user: {},
  getUserSuccess: false,
  createUserSuccess: false,
  editUserSuccess: false,
  loginHistory: [],
  getLoginHistorySuccess: false,
}

// Declaring the modal reducer function
const userSetting = (state = initialState, action) => {
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
    // Case for GET_USER action type.
    case userActionType.CREATE_USER_SUCCESS:
      return {
        ...state,
        createUserSuccess: action.payload,
      }
    // Case for CREATE_USER_SUCCESS action type.
    case userActionType.EDIT_USER_SUCCESS:
      return {
        ...state,
        editUserSuccess: action.payload,
      }
    // Case for GET_LIST_USER action type.
    case userActionType.GET_LOGIN_HISTORY:
      return {
        ...state,
        loginHistory: action.payload
      }
    // Case for GET_LIST_USER_SUCCESS action type.
    case userActionType.GET_LOGIN_HISTORY_SUCCESS:
      return {
        ...state,
        getLoginHistorySuccess: action.payload,
      }
    // Default fallback case returns the current state.
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default userSetting
