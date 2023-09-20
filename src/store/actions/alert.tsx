import { appActionType } from "store/actionTypes"

// Defining an 'add' function which takes a message and alertType as parameters, with a default value of 'success' for alertType.
export const add = (message, alertType = "success", isFullScreen = false) => ({
  // Returning an object with type 'SET_ALERT', message as it's value and alertType as it's another value.
  type: 'SET_ALERT',
  message,
  alertType,
  isFullScreen
})

// Defining a 'remove' function 
export const remove = () => ({
  // Returning an object with type 'REMOVE_ALERT'
  type: 'REMOVE_ALERT'
})

// Defining a 'reloadMessage' function which takes a message as a parameter.
export const reloadMessage = (message) => ({
  // Returning an object with type 'appActionType.RELOAD_MESSAGE' and payload as the message passed.
  type: appActionType.RELOAD_MESSAGE,
  payload: message
})

// Defining a 'clearReloadMessage' function.
export const clearReloadMessage = () => ({
  // Returning an object with type 'appActionType.RELOAD_MESSAGE' and an empty string as the payload.
  type: appActionType.RELOAD_MESSAGE,
  payload: ''
})