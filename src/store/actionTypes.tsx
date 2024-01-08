export const authActionType = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  ERROR_LOGIN: "ERROR_LOGIN",
  LOGOUT: "LOGOUT",

  OTP_CONFIRM_SUCCESS: "OTP_CONFIRM_SUCCESS",
  RESEND_OTP_SUCCESS: "RESEND_OTP_SUCCESS",

  SEND_EMAIL_FORGOT_PASSWORD_SUCCESS: "SEND_EMAIL_FORGOT_PASSWORD_SUCCESS",
  SEND_NEW_PASSWORD_SUCCESS: "SEND_NEW_PASSWORD_SUCCESS",
  
  GET_MY_ACCOUNT: "GET_MY_ACCOUNT",
  ERROR_MY_ACCOUNT: "ERROR_MY_ACCOUNT",
  UPDATE_MY_ACCOUNT_SUCCESS: "UPDATE_MY_ACCOUNT_SUCCESS",
}

export const appActionType = {
  SET_LOADING: "SET_LOADING",
  SET_ALERT: "SET_ALERT",
  REMOVE_ALERT: "REMOVE_ALERT",
  RELOAD_MESSAGE: "RELOAD_MESSAGE",
}

export const modalActionType = {
  SET_MODAL_ADD_BARCODE_SHOW: "SET_MODAL_ADD_BARCODE_SHOW",
  SET_MODAL_OPTION_SIZE_SHOW: "SET_MODAL_OPTION_SIZE_SHOW",
  SET_MODAL_CONFIRM_REFRESH_SHOW: "SET_MODAL_CONFIRM_REFRESH_SHOW",
}

export const analysisActionType = {
  GET_DATA_ANALYTICS: "GET_DATA_ANALYTICS",
  GET_DATA_ANALYTICS_SUCCESS: "GET_DATA_ANALYTICS_SUCCESS",
  HAS_PERMISSION: "HAS_PERMISSION",
  UPLOAD_PDF: "UPLOAD_PDF",
  UPLOAD_PDF_SUCCESS: "UPLOAD_PDF_SUCCESS",
  SET_FILE_PATH: "SET_FILE_PATH",
  GET_LIST_FILE: "GET_LIST_FILE",
  GET_LIST_FILE_SUCCESS: "GET_LIST_FILE_SUCCESS",
}

export const userActionType = {
  GET_LIST_USER: "GET_LIST_USER",
  GET_LIST_USER_SUCCESS: "GET_LIST_USER_SUCCESS",
  GET_LOGIN_HISTORY: "GET_LOGIN_HISTORY",
  GET_LOGIN_HISTORY_SUCCESS: "GET_LOGIN_HISTORY_SUCCESS",
  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
}

export const topicsActionType = {
  GET_LIST_TOPICS: "GET_LIST_TOPICS",
  GET_LIST_TOPICS_SUCCESS: "GET_LIST_TOPICS_SUCCESS",
  CREATE_TOPICS_SUCCESS: "CREATE_TOPICS_SUCCESS",
  UPDATE_TOPICS_SUCCESS: "UPDATE_TOPICS_SUCCESS",
}

export const masterActionType = {
  GET_STATISTICS_USER: "GET_STATISTICS_USER",
  GET_STATISTICS_USER_SUCCESS: "GET_STATISTICS_USER_SUCCESS",
  GET_STATISTICS_CONTRACT: "GET_STATISTICS_CONTRACT",
  GET_STATISTICS_CONTRACT_SUCCESS: "GET_STATISTICS_CONTRACT_SUCCESS",
  GET_STATISTICS_QUESTIONMARK: "GET_STATISTICS_QUESTIONMARK",
  GET_STATISTICS_QUESTIONMARK_SUCCESS: "GET_STATISTICS_QUESTIONMARK_SUCCESS",
}

export const contractActionType = {
  GET_CONTRACTS: "GET_CONTRACTS",
  GET_CONTRACTS_SUCCESS: "GET_CONTRACTS_SUCCESS",
  GET_CONTRACT_DETAIL: "GET_CONTRACT_DETAIL",
  GET_CONTRACT_DETAIL_SUCCESS: "GET_CONTRACT_DETAIL_SUCCESS",
}

export const chatActionType = {
  GET_CONVERSATION: "GET_CONVERSATION",
  GET_CONVERSATION_SUCCESS: "GET_CONVERSATION_SUCCESS",
  POST_CONVERSATION_SUCCESS: "POST_CONVERSATION_SUCCESS",
}

export const utilitiesActionType = {
  GET_UTILITIES: "GET_UTILITIES",
  GET_UTILITIES_SUCCESS: "GET_UTILITIES_SUCCESS",
}
