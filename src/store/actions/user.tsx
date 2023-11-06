import { userActionType } from "store/actionTypes";
import { setLoading } from "./app";
import { onError } from "./base";
import { add as addAlert } from 'store/actions/alert'
import API from "service/api";

export function getListUser() {
  return async function (dispatch) {
    dispatch(setLoading(true));
    await API({ url: "/users", method: "GET" })
      .then((result) => {
        dispatch(setLoading(false));
        dispatch({
          type: userActionType.GET_LIST_USER,
          payload: result.data.data,
        });
        dispatch({
          type: userActionType.GET_LIST_USER_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch({
          type: userActionType.GET_LIST_USER_SUCCESS,
          payload: false,
        });
        dispatch(onError(err))
      });
  };
}

export function updateUser(data) {
  return async function (dispatch) {
    // Set loading state to true
    dispatch(setLoading(true))
    // Make PUT request to API to update user settings profile
    await API({ url: "users/update-by-id", method: "put", data })
      .then(() => {
        // Dispatch alert indicating successful update
        dispatch(addAlert("You have successfully updated password.", "success"))
        // Set loading state to false
        dispatch(setLoading(false))
      })
      .catch((err) => dispatch(onError(err)))
  }
}

export function createUser(data) {
  return async function (dispatch) {
    // Set loading state to true
    dispatch(setLoading(true))
    // Make PUT request to API to update user settings profile
    await API({ url: "users", method: "post", data })
      .then(() => {
        // Dispatch alert indicating successful update
        dispatch(addAlert("You have successfully create user.", "success"))
        // Set loading state to false
        dispatch(setLoading(false))
        dispatch(getListUser());
      })
      .catch((err) => dispatch(onError(err)))
  }
}

export function getLoginHistory() {
  return async function (dispatch) {
    dispatch(setLoading(true));
    await API({ url: "/login_history", method: "GET" })
      .then((result) => {
        dispatch(setLoading(false));
        dispatch({
          type: userActionType.GET_LOGIN_HISTORY,
          payload: result.data.data,
        });
        dispatch({
          type: userActionType.GET_LOGIN_HISTORY_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch({
          type: userActionType.GET_LOGIN_HISTORY_SUCCESS,
          payload: false,
        });
        dispatch(onError(err))
      });
  };
}