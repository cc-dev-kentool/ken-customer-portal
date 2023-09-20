import { authActionType } from "../actionTypes";
import { add as addAlert } from "store/actions/alert";
import { setLoading, setStatus } from "store/actions/app";
import { error, code } from "constants/error";
import { onError } from "./base";
import API from "service/api";

// Define a function to log in a user
export function login(data) {
  // Return an async function
  return async function (dispatch) {
    // Set loading state to true
    console.log(data)
    dispatch(setLoading(true));
    localStorage.setItem("token", "demo");
    localStorage.setItem("refresh_token", "demo");
    localStorage.setItem("user", JSON.stringify(data));
    dispatch({
      type: authActionType.LOGIN_SUCCESS,
      payload: true,
    });
    dispatch({
      type: authActionType.REMEMBER_ME,
    });
    dispatch({
      type: authActionType.ERROR_LOGIN,
      payload: "",
    });
  };
}

// Define a function to log out a user
export function logout() {
  // Return an async function
  return async function (dispatch) {
    // Clear user information from local storage and set logout state
    localStorage.clear();
    dispatch({
      type: authActionType.LOGOUT,
    });
  };
}

// Define a function to clear error messages
export function clearErrorMessage() {
  // Return an async function
  return async function (dispatch) {
    // Set error message state to empty string
    dispatch({
      type: authActionType.CLEAR_ERROR_MESSAGE,
      payload: "",
    });
  };
}

// Define a function to send email when forgot password
export function sendEmailForgotPassword(email, type = "sent") {
  return async function (dispatch) {
    dispatch(setLoading(true));
    dispatch({
      type: authActionType.ERROR_CHANGE_PASSWORD_FORGOT_PASSWORD,
      payload: "",
    });
    dispatch({
      type: authActionType.SEND_EMAIL_FORGOT_PASSWORD_SUCCESS,
      payload: false,
    });
    const data = {
      email,
    };
    await API({ url: "/auth/forgot-password", method: "post", data })
      .then(() => {
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.SEND_EMAIL_FORGOT_PASSWORD_SUCCESS,
          payload: true,
        });
        dispatch({
          type: authActionType.SET_FORGOT_PASSWORD_DATA,
          payload: {
            email,
          },
        });
        dispatch({
          type: authActionType.ERROR_SEND_EMAIL_FORGOT_PASSWORD,
          payload: "",
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        const errMsg =
          err.data.code in error ? error[err.data.code] : code["502"];
        dispatch({
          type:
            type === "sent"
              ? authActionType.ERROR_SEND_EMAIL_FORGOT_PASSWORD
              : authActionType.ERROR_CHANGE_PASSWORD_FORGOT_PASSWORD,
          payload: errMsg,
        });
      });
  };
}

// Define a function to set forgot password data
export function setForgotPasswordData(data) {
  return async function (dispatch) {
    dispatch({
      type: authActionType.SET_FORGOT_PASSWORD_DATA,
      payload: data,
    });
  };
}

// Define a function to change password forgot password
export function changePasswordForgotPassword(code, password) {
  return async function (dispatch, getState) {
    dispatch(setLoading(true));
    dispatch({
      type: authActionType.SEND_EMAIL_FORGOT_PASSWORD_SUCCESS,
      payload: false,
    });
    dispatch({
      type: authActionType.CHANGE_PASSWORD_FORGOT_PASSWORD_SUCCESS,
      payload: false,
    });
    const email = getState().auth.forgotPasswordData.email;
    const data = {
      email,
      code,
      password,
    };
    await API({ url: "/auth/confirm-forgot-password", method: "post", data })
      .then(() => {
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.CHANGE_PASSWORD_FORGOT_PASSWORD_SUCCESS,
          payload: true,
        });
        dispatch({
          type: authActionType.SEND_EMAIL_FORGOT_PASSWORD_SUCCESS,
          payload: false,
        });
        dispatch({
          type: authActionType.ERROR_CHANGE_PASSWORD_FORGOT_PASSWORD,
          payload: "",
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        const errMsg =
          err.data.code in error ? error[err.data.code] : code["502"];
        dispatch({
          type: authActionType.ERROR_CHANGE_PASSWORD_FORGOT_PASSWORD,
          payload: errMsg,
        });
      });
  };
}

// Define a function to reset a user's password for the first time
export function firstTimeResetPassword(data) {
  // Return an async function
  return async function (dispatch) {
    // Set loading state to true
    dispatch(setLoading(true));
    // Make a post request to the first time reset password endpoint with provided data
    await API({ url: "/auth/first-time-reset-password", method: "post", data })
      .then(() => {
        // If reset was successful, set first time reset password success state
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.FIRST_TIME_RESET_PASSWORD_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        // If there is an error, set loading state to false and set error message
        dispatch(setLoading(false));
        const errMsg =
          err.data.code in error ? error[err.data.code] : code["502"];
        dispatch({
          type: authActionType.ERROR_FIRST_TIME_RESET_PASSWORD,
          payload: errMsg,
        });
      });
  };
}

// Define a function to get my account
export function getMyAccount(isLoading = true) {
  return async function (dispatch) {
    isLoading && dispatch(setLoading(true));
    await API({ url: "/auth/user", method: "get" })
      .then((result) => {
        isLoading && dispatch(setLoading(false));
        dispatch({
          type: authActionType.GET_MY_ACCOUNT,
          payload: result.data,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.ERROR_MY_ACCOUNT,
          payload: "BadRequest",
        });
      });
  };
}

// Define a function to clear update account status
export function clearUpdateAccountStatus() {
  return async function (dispatch) {
    dispatch({
      type: authActionType.UPDATE_MY_ACCOUNT_SUCCESS,
      payload: false,
    });
  };
}

// Define a function to update my account
export function updateMyAccount(data) {
  return async function (dispatch, getState) {
    dispatch(setLoading(true));
    await API({ url: "/auth/user", method: "put", data })
      .then(() => {
        dispatch(
          addAlert("You have successfully updated your profile.", "success")
        );
        const currentData = getState().auth.myAccount;
        dispatch({
          type: authActionType.GET_MY_ACCOUNT,
          payload: {
            ...currentData,
            name: data.name,
            phone_number: data.phone_number,
          },
        });
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        const newName = data.name;
        const newUser = {
          ...user,
          name: newName,
        };
        localStorage.setItem("user", JSON.stringify(newUser));
        dispatch(setLoading(false));
        dispatch(setStatus(authActionType.UPDATE_MY_ACCOUNT_SUCCESS, true));
      })
      .catch((err) => dispatch(onError(err)));
  };
}

// Define a function to change password my account
export function changePasswordMyAccount(data) {
  return async function (dispatch) {
    dispatch(setLoading(true));
    await API({ url: "/auth/change-password", method: "post", data })
      .then(() => {
        dispatch(
          addAlert("You have successfully changed your password.", "success")
        );
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.CHANGE_PASSWORD_MY_ACCOUNT_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => dispatch(onError(err)));
  };
}

// Define a function to get the size for printing
export function getSizeForPrint(isSetLoading = true) {
  // Return an async function
  return async function (dispatch) {
    // If loading is set, set loading state to true
    isSetLoading && dispatch(setLoading(true));
    // Make a get request to the settings endpoint to retrieve size information
    await API({ url: "/auth/settings", method: "get" })
      .then((result) => {
        const defaultSizeData = {
          width: "380",
          height: "204",
          quantity: "1",
        };
        // If successful, set size for print state and set loading state to false if loading is set
        dispatch({
          type: authActionType.GET_SIZE_FOR_PRINT,
          payload: result.data ? result.data : defaultSizeData,
        });
        isSetLoading && dispatch(setLoading(false));
      })
      .catch(() => {
        // If there is an error, set size for print state to empty object and set loading state to false if loading is set
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.GET_SIZE_FOR_PRINT,
          payload: {},
        });
      });
  };
}

// Define a function to set register size data
export function setRegisterSizeData(data) {
  // Return an async function
  return async function (dispatch) {
    // Set register size data state
    dispatch({
      type: authActionType.REGISTER_SIZE_DATA,
      payload: data,
    });
  };
}

// Define a function to initialize register project data
export function initRegisterProjectData() {
  // Return an async function
  return async function (dispatch) {
    // Initialize size data state
    dispatch({
      type: authActionType.INIT_SIZE_DATA,
    });
  };
}

// Define a function to add size for printing
export function addSizeForPrint(data) {
  // Return an async function
  return async function (dispatch) {
    // Set loading state to true and make a post request to the settings endpoint with provided data
    dispatch(setLoading(true));
    await API({ url: "/auth/settings", method: "post", data })
      .then(() => {
        // If successful, set register size success state and set loading state to false
        dispatch({
          type: authActionType.REGISTER_SIZE_SUCCESS,
          payload: true,
        });
        dispatch(setLoading(false));
      })
      .catch((err) => {
        // If there is an error, set loading state to false and set error message state to error code
        dispatch(setLoading(false));
        const { code } = err.data;
        dispatch({
          type: authActionType.ERROR_REGISTER_SIZE,
          payload: code,
        });
      });
  };
}

// Define a function to get business
export function getBusiness() {
  return async function (dispatch) {
    dispatch(setLoading(true));
    await API({ url: "/auth/business", method: "get" })
      .then((result) => {
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.GET_BUSINESS,
          payload: result.data,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.ERROR_BUSINESS,
          payload: "BadRequest",
        });
      });
  };
}

// Define a function to update business
export function updateBusiness(data) {
  return async function (dispatch) {
    dispatch(setLoading(true));
    await API({ url: "/auth/business", method: "put", data })
      .then((result) => {
        dispatch({
          type: authActionType.UPDATE_BUSINESS_SUCCESS,
          payload: true,
        });
        dispatch(
          addAlert(
            "You have successfully updated your Business Account.",
            "success"
          )
        );
        dispatch(setLoading(false));
      })
      .catch((err) => dispatch(onError(err)));
  };
}
