import { authActionType } from "../actionTypes"

// Defining initial state object with various properties.
const initialState = {
  isLoginSuccess: false,
  errorLogin: "",

  otpConfirmSuccess: false,
  resendOtpSuccess: false,

  sendEmailForgotPasswordSuccess: false,
  sendNewPasswordSuccess: false,

  myAccount: {},
  updateMyAccountSuccess: false,
  errorUpdateMyAccount: "",
}

// Define auth reducer function with state and action as parameters.
const auth = (state = initialState, action) => {
  switch (action.type) {
    // Case for LOGIN_SUCCESS action type.
    case authActionType.LOGIN_SUCCESS:
      return {
        ...state,
        isLoginSuccess: action.payload,
      }
    // Case for ERROR_LOGIN action type.
    case authActionType.ERROR_LOGIN:
      return {
        ...state,
        errorLogin: action.payload,
      }
    // Case for LOGOUT action type.
    case authActionType.LOGOUT:
      return {
        ...state,
        isLoginSuccess: false,
      }
    // Case for OTP_CONFIRM_SUCCESS action type.
    case authActionType.OTP_CONFIRM_SUCCESS:
      return {
        ...state,
        otpConfirmSuccess: action.payload,
      }
    // Case for RESEND_OTP_SUCCESS action type.
    case authActionType.RESEND_OTP_SUCCESS:
      return {
        ...state,
        resendOtpSuccess: action.payload,
      }
    // Case for SEND_EMAIL_FORGOT_PASSWORD_SUCCESS action type.
    case authActionType.SEND_EMAIL_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        sendEmailForgotPasswordSuccess: action.payload,
      }
    // Case for SEND_NEW_PASSWORD_SUCCESS action type.
    case authActionType.SEND_NEW_PASSWORD_SUCCESS:
      return {
        ...state,
        sendNewPasswordSuccess: action.payload,
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
    // Default fallback case returns the current state.
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default auth
