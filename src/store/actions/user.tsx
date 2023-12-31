import { userActionType } from "store/actionTypes";
import { setLoading } from "./app";
import { onError } from "./base";
import { add as addAlert } from "store/actions/alert";
import API from "service/api";

export function getListUser(loading = true) {
  return async function (dispatch) {
    loading && dispatch(setLoading(true));
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
        dispatch(onError(err));
      });
  };
}

export function updateUser(data) {
  return async function (dispatch) {
    // Set loading state to true
    dispatch(setLoading(true));
    // Make PUT request to API to update user settings profile
    await API({ url: `users/${data.user_id}`, method: "put", data })
      .then(() => {
        // Dispatch alert indicating successful update
        dispatch(
          addAlert("You have successfully updated password.", "success")
        );
        // Set loading state to false
        dispatch(getListUser(false));
        dispatch(setLoading(false));
      })
      .catch((err) => dispatch(onError(err)));
  };
}

export function createUser(data) {
  return async function (dispatch) {
    // Set loading state to true
    dispatch(setLoading(true));
    // Make PUT request to API to update user settings profile
    await API({ url: "users", method: "post", data })
      .then(() => {
        // Dispatch alert indicating successful update
        dispatch(addAlert("You have successfully create user.", "success"));
        // Set loading state to false
        dispatch(setLoading(false));
        dispatch(getListUser());
      })
      .catch((err) => dispatch(onError(err)));
  };
}

export function forceChangePw(id) {
  return async function (dispatch) {
    // Set loading state to true
    dispatch(setLoading(true));
    dispatch({
      type: userActionType.FORCE_CHANGE_PASSWORD_SUCCESS,
      payload: false,
    });
    // Make PUT request to API to update user settings profile
    await API({ url: `users/${id}/force_change_password`, method: "post"})
      .then(() => {
        // Dispatch alert indicating successful update
        dispatch(addAlert("Suspend account success.", "success"));
        // Set loading state to false
        dispatch(setLoading(false));
        dispatch(getListUser());
        dispatch({
          type: userActionType.FORCE_CHANGE_PASSWORD_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(onError(err));
        dispatch({
          type: userActionType.FORCE_CHANGE_PASSWORD_SUCCESS,
          payload: false,
        });
      });
  };
}

export function suspendAccount(id) {
  return async function (dispatch) {
    // Set loading state to true
    dispatch(setLoading(true));
    dispatch({
      type: userActionType.SUSPEND_ACCOUNT_SUCCESS,
      payload: false,
    });
    // Make PUT request to API to update user settings profile
    await API({ url: `users/${id}/suspend`, method: "post"})
      .then(() => {
        // Dispatch alert indicating successful update
        dispatch(addAlert("Change password success.", "success"));
        // Set loading state to false
        dispatch(setLoading(false));
        dispatch({
          type: userActionType.SUSPEND_ACCOUNT_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch(onError(err));
        dispatch({
          type: userActionType.SUSPEND_ACCOUNT_SUCCESS,
          payload: false,
        });
      });
  };
}

export function getLoginHistory(user_id) {
  return async function (dispatch) {
    dispatch({
      type: userActionType.GET_LOGIN_HISTORY,
      payload: [],
    });
    dispatch({
      type: userActionType.GET_LOGIN_HISTORY_SUCCESS,
      payload: false,
    });
    await API({ url: `/users/${user_id}/login_histories`, method: "GET" })
      .then((result) => {
        dispatch({
          type: userActionType.GET_LOGIN_HISTORY,
          payload: result.data.data.data,
        });
        dispatch({
          type: userActionType.GET_LOGIN_HISTORY_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: userActionType.GET_LOGIN_HISTORY_SUCCESS,
          payload: false,
        });
        dispatch(onError(err));
      });
  };
}
