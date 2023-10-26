import { userActionType } from "store/actionTypes";
import { setLoading } from "./app";
import { onError } from "./base";
import API from "service/api";

// Define a function to change password my account
export function getListUser() {
  return async function (dispatch) {
    dispatch(setLoading(true));
    await API({ url: "/users", method: "GET" })
      .then((result) => {
        dispatch(setLoading(false));
        dispatch({
          type: userActionType.GET_LIST_USER,
          payload: result.data,
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