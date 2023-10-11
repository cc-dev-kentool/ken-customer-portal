import { authActionType } from "../actionTypes"

// Defining defaultSizeData object with width, height and quantity properties.
const defaultSizeData = {
  width: "380",
  height: "204",
  quantity: "1"
}

// Defining initial state object with various properties.
const initialState = {
  token: "",
  refreshToken: "",
  rememberMe: false,
  isLoginSuccess: false,
  isRememberMe: false,
  isSendEmailForgotPasswordSuccess: false,
  isChangePasswordForgotPasswordSuccess: false,
  forgotPasswordData: {
    email: "",
    code: "",
    new_password: "",
  },
  errorLogin: "",
  errorSendEmailForgotPassword: "",
  errorChangePasswordForgotPassword: "",
  errorFirstTimeResetPassword: "",
  isFirstTimeResetPasswordSuccess: false,
  firstTimeResetPasswordData: {
    username: "",
    password: "",
    new_password: "",
    email: "",
    need_reset: false,
  },
  myAccount: {},
  isUpdateMyAccountSuccess: false,
  errorMyAccount: "",
  isChangePasswordMyAccountSuccess: false,
  errorChangePasswordMyAccount: "",

  registerSizeData: defaultSizeData,
  isAddSizeSuccess: false,
  isRegisterSizeSuccess: false,
  size: {},

  business: {},
  errorBusiness: "",
  isUpdateBusinessSuccess: false,
}

// Define auth reducer function with state and action as parameters.
const auth = (state = initialState, action) => {
  switch (action.type) {
    // Case for LOGIN action type.
    case authActionType.LOGIN:
      return {
        ...state,
      }
    // Case for LOGIN_SUCCESS action type.
    case authActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: action.payload,
      }
    // Case for REMEMBER_ME action type.
    case authActionType.REMEMBER_ME:
      return {
        ...state,
        isRememberMe: true,
      }
    // Case for SEND_EMAIL_FORGOT_PASSWORD_SUCCESS action type.
    case authActionType.SEND_EMAIL_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isSendEmailForgotPasswordSuccess: action.payload,
      }
    // Case for SET_FORGOT_PASSWORD_DATA action type.
    case authActionType.SET_FORGOT_PASSWORD_DATA:
      return {
        ...state,
        forgotPasswordData: action.payload,
      }
    // Case for CHANGE_PASSWORD_FORGOT_PASSWORD_SUCCESS action type.
    case authActionType.CHANGE_PASSWORD_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        isChangePasswordForgotPasswordSuccess: action.payload,
      }
    // Case for LOGOUT action type.
    case authActionType.LOGOUT:
      return {
        ...state,
        isLoginSuccess: false,
      }
    // Case for ERROR_LOGIN action type.
    case authActionType.ERROR_LOGIN:
      return {
        ...state,
        errorLogin: action.payload,
      }
    // Case for ERROR_SEND_EMAIL_FORGOT_PASSWORD action type.
    case authActionType.ERROR_SEND_EMAIL_FORGOT_PASSWORD:
      return {
        ...state,
        errorSendEmailForgotPassword: action.payload,
      }
    // Case for ERROR_CHANGE_PASSWORD_FORGOT_PASSWORD action type.
    case authActionType.ERROR_CHANGE_PASSWORD_FORGOT_PASSWORD:
      return {
        ...state,
        errorChangePasswordForgotPassword: action.payload,
      }
    // Case for CLEAR_ERROR_MESSAGE action type.
    case authActionType.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        errorLogin: "",
        errorRegister: "",
        errorSendEmailForgotPassword: "",
        errorChangePasswordForgotPassword: "",
        errorFirstTimeResetPassword: "",
      }
    // Case for SET_FIRST_TIME_RESET_PASSWORD_DATA action type.
    case authActionType.SET_FIRST_TIME_RESET_PASSWORD_DATA:
      return {
        ...state,
        firstTimeResetPasswordData: action.payload,
      }
    // Case for FIRST_TIME_RESET_PASSWORD_SUCCESS action type.
    case authActionType.FIRST_TIME_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isFirstTimeResetPasswordSuccess: action.payload,
      }
    // Case for ERROR_FIRST_TIME_RESET_PASSWORD action type.
    case authActionType.ERROR_FIRST_TIME_RESET_PASSWORD:
      return {
        ...state,
        errorFirstTimeResetPassword: action.payload,
      }
    // Case for GET_MY_ACCOUNT action type.
    case authActionType.GET_MY_ACCOUNT:
      return {
        ...state,
        myAccount: action.payload,
      }
    // Case for ERROR_MY_ACCOUNT action type.
    case authActionType.ERROR_MY_ACCOUNT:
      return {
        ...state,
        errorMyAccount: action.payload,
      }
    // Case for UPDATE_MY_ACCOUNT_SUCCESS action type.
    case authActionType.UPDATE_MY_ACCOUNT_SUCCESS:
      return {
        ...state,
        isUpdateMyAccountSuccess: action.payload,
      }
    // Case for CHANGE_PASSWORD_MY_ACCOUNT_SUCCESS action type.
    case authActionType.CHANGE_PASSWORD_MY_ACCOUNT_SUCCESS:
      return {
        ...state,
        isChangePasswordMyAccountSuccess: action.payload,
      }
    // Case for ERROR_CHANGE_PASSWORD_MY_ACCOUNT action type.
    case authActionType.ERROR_CHANGE_PASSWORD_MY_ACCOUNT:
      return {
        ...state,
        errorChangePasswordMyAccount: action.payload,
      }
    // Case for GET_SIZE_FOR_PRINT action type.
    case authActionType.GET_SIZE_FOR_PRINT:
      return {
        ...state,
        size: action.payload,
      }
    // Case for INIT_SIZE_DATA action type.
    case authActionType.INIT_SIZE_DATA:
      return {
        ...state,
        isRegisterSuccess: false,
        registerSizeData: defaultSizeData,
      }
    // Case for REGISTER_SIZE_DATA action type.
    case authActionType.REGISTER_SIZE_DATA:
      return {
        ...state,
        registerSizeData: action.payload,
      }
    // Case for REGISTER_SIZE_SUCCESS action type.
    case authActionType.REGISTER_SIZE_SUCCESS:
      return {
        ...state,
        isRegisterSizeSuccess: action.payload,
      }
    // Case for ERROR_REGISTER_SIZE action type.
    case authActionType.ERROR_REGISTER_SIZE:
      return {
        ...state,
        errorRegisterSize: action.payload,
      }
    // Default fallback case returns the current state.
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default auth
