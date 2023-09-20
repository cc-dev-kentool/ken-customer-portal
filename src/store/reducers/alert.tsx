import { appActionType } from "../actionTypes"

// Defining initial state object.
const initialState = {
  show: false,
  message: "",
  type: "success",
  reload_message: "",
  isFullScreen: false,
}

// App reducer function.
const app = (state = initialState, action) => {
  switch (action.type) {
    // Set alert action case.
    case appActionType.SET_ALERT:
      return {
        ...state,
        show: true,
        message: action.message,
        type: action.alertType || "success",
        isFullScreen: action.isFullScreen,
      }
    // Remove alert action case.
    case appActionType.REMOVE_ALERT:
      return {
        ...state,
        show: false,
        message: ""
      }
    // Reload message action case.
    case appActionType.RELOAD_MESSAGE:
      return {
        ...state,
        reload_message: action.payload,
      }
    // Default fallback case.
    default:
      return state
  }
}

// Exporting app reducer function as default.
export default app