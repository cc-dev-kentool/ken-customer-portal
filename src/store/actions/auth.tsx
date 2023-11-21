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
    dispatch(setLoading(true));
    // Make a post request to the login endpoint with provided data
    data = {
      email: data.username,
      password: data.password,
    }
    if (navigator.onLine) {
      await API({ url: "/login", method: "POST", data })
      .then((result) => {
        // Set loading state to false
        dispatch(setLoading(false));

        // Otherwise, set user information in local storage and set login success state
        localStorage.setItem("token", result.data.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.data.user));

        dispatch({
          type: authActionType.LOGIN_SUCCESS,
          payload: true,
        });
        dispatch({
          type: authActionType.ERROR_LOGIN,
          payload: "",
        });

        const role = result.data.data.user.role
        if ( role === "admin" || role === "super-admin") {
          window.location.href = "/";
        } else {
          window.location.href = "/analyses";
        }
      })
      .catch((err) => {
        // If there is an error, set loading state to false and set error message
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.ERROR_LOGIN,
          payload: "The email or password you entered is incorrect. Please try again!",
        });
      });
    } else {
      dispatch(setLoading(false));
      dispatch({
        type: authActionType.ERROR_LOGIN,
        payload: "Please check your Internet connection and try again.",
      });
    }
    
  };
}

// Define a function to log out a user
export function logout() {
  // Return an async function
  return async function (dispatch) {
    // Clear user information from local storage and set logout state
    dispatch({
      type: authActionType.LOGOUT,
    });
    await API({ url: "/logout", method: "post" })
      .then(() => {
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.LOGOUT,
          payload: false,
        }); 
        localStorage.clear();
      })
      .catch((err) => dispatch(onError(err)));
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