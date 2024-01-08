import { authActionType } from "../actionTypes";
import { add as addAlert } from "store/actions/alert";
import { setLoading, setStatus } from "store/actions/app";
import { error } from "constants/error";
import { onError } from "./base";
import API from "service/api";

// Define a function to log in a user
export function login(data) {
  // Return an async function
  return async function (dispatch) {
    // Set loading state to true
    dispatch(setLoading(true));

    dispatch({
      type: authActionType.LOGIN_SUCCESS,
      payload: false,
    });

    dispatch({
      type: authActionType.SEND_NEW_PASSWORD_SUCCESS,
      payload: false,
    });

    fetch('https://example.com', {
      mode: 'no-cors'
    }).then(async () => {
      // Make a post request to the login endpoint with provided data
      data = {
        email: data.username,
        password: data.password,
      }

      await API({ url: "/login", method: "POST", data })
        .then(() => {
          // Set loading state to false
          dispatch(setLoading(false));
          dispatch({
            type: authActionType.LOGIN_SUCCESS,
            payload: true,
          });
          dispatch({
            type: authActionType.ERROR_LOGIN,
            payload: "",
          });
        })
        .catch((err) => {
          // If there is an error, set loading state to false and set error message
          dispatch(setLoading(false));
          dispatch({
            type: authActionType.ERROR_LOGIN,
            payload: "The email or password you entered is incorrect. Please try again!",
          });
        });
    }).catch(() => {
      dispatch(setLoading(false));
      dispatch({
        type: authActionType.ERROR_LOGIN,
        payload: "Please check your Internet connection and try again.",
      });
    });
  };
}

// Define a function to log out a user
export function otpConfirm(data) {
  // Return an async function
  return async function (dispatch) {
    dispatch(setLoading(true));

    dispatch({
      type: authActionType.OTP_CONFIRM_SUCCESS,
      payload: false,
    });

    await API({ url: "/login/otp", method: "post", data })
      .then((result) => {
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.OTP_CONFIRM_SUCCESS,
          payload: true,
        });

        localStorage.setItem("token", result.data.data.token);
        localStorage.setItem("user", JSON.stringify(result.data.data.user));

        const role = result.data.data.user.role
        if (role === "admin" || role === "super-admin") {
          window.location.href = "/";
        } else {
          window.location.href = "/analyses";
        }
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(onError(err));
        dispatch({
          type: authActionType.OTP_CONFIRM_SUCCESS,
          payload: false,
        });
      });
  };
}

// Define a function to log out a user
export function resendOtp(data) {
  // Return an async function
  return async function (dispatch) {
    dispatch(setLoading(true));

    dispatch({
      type: authActionType.RESEND_OTP_SUCCESS,
      payload: false,
    });
    await API({ url: "/resend_otp", method: "post", data })
      .then(() => {
        dispatch(
          addAlert("Re-send OTP success.", "success")
        );
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.RESEND_OTP_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(onError(err))
        dispatch({
          type: authActionType.RESEND_OTP_SUCCESS,
          payload: false,
        });
      });
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

// Define a function to log out a user
export function sendMailForgotPassword(email) {
  // Return an async function
  return async function (dispatch) {
    dispatch(setLoading(true));

    dispatch({
      type: authActionType.SEND_EMAIL_FORGOT_PASSWORD_SUCCESS,
      payload: false,
    });
    const data = {email: email}
    await API({ url: "/forgot_password/send_mail", method: "post", data })
      .then(() => {
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.SEND_EMAIL_FORGOT_PASSWORD_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(onError(err))
        dispatch({
          type: authActionType.SEND_EMAIL_FORGOT_PASSWORD_SUCCESS,
          payload: false,
        });
      });
  };
}

// Define a function to log out a user
export function sendNewPassWord(data) {
  // Return an async function
  return async function (dispatch) {
    dispatch(setLoading(true));

    dispatch({
      type: authActionType.SEND_NEW_PASSWORD_SUCCESS,
      payload: false,
    });
    await API({ url: "/forgot_password/reset", method: "post", data })
      .then(() => {
        dispatch(
          addAlert("Reset password success!", "success")
        );
        dispatch(setLoading(false));
        dispatch({
          type: authActionType.SEND_NEW_PASSWORD_SUCCESS,
          payload: true,
        });
        dispatch({
          type: authActionType.SEND_EMAIL_FORGOT_PASSWORD_SUCCESS,
          payload: false,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(onError(err))
        dispatch({
          type: authActionType.SEND_NEW_PASSWORD_SUCCESS,
          payload: false,
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