import { combineReducers } from "redux"
import auth from "./auth"
import app from "./app"
import alert from "./alert"
import modal from "./modal"
import analysis from "./analysis"
import userSetting from "./user"
import promptSetting from "./prompt"
export default combineReducers({
  auth,
  app,
  alert,
  modal,
  analysis,
  userSetting,
  promptSetting,
})
