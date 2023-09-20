import { combineReducers } from "redux"
import auth from "./auth"
import app from "./app"
import alert from "./alert"
import modal from "./modal"
export default combineReducers({
  auth,
  app,
  alert,
  modal
})
