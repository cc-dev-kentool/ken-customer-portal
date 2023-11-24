import { combineReducers } from "redux"
import auth from "./auth"
import app from "./app"
import alert from "./alert"
import modal from "./modal"
import analysis from "./analysis"
import users from "./user"
import prompts from "./prompt"
import masterData from "./master"
import contracts from "./contract"
import conversation from "./chatGpt"
import utilities from "./utilities"
export default combineReducers({
  auth,
  app,
  alert,
  modal,
  analysis,
  users,
  prompts,
  masterData,
  contracts,
  conversation,
  utilities,
})
