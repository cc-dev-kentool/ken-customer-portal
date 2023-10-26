import { combineReducers } from "redux"
import auth from "./auth"
import app from "./app"
import alert from "./alert"
import modal from "./modal"
import analysis from "./analysis"
import users from "./user"
export default combineReducers({
  auth,
  app,
  alert,
  modal,
  analysis,
  users,
})
