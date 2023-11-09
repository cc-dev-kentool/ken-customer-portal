import { promptActionType } from "store/actionTypes";
import { setLoading } from "./app";
import { onError } from "./base";
import { add as addAlert } from 'store/actions/alert'
import API from "service/api";

export function getListPrompt(isLoading = true) {
  return async function (dispatch) {
    isLoading && dispatch(setLoading(true));
    await API({ url: "/prompts", method: "GET" })
      .then((result) => {
        isLoading && dispatch(setLoading(false));
        dispatch({
          type: promptActionType.GET_LIST_PROMPT,
          payload: result.data.data,
        });
        dispatch({
          type: promptActionType.GET_LIST_PROMPT_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        isLoading && dispatch(setLoading(false));
        dispatch({
          type: promptActionType.GET_LIST_PROMPT_SUCCESS,
          payload: false,
        });
        dispatch(onError(err))
      });
  };
}

export function updatePrompt(data) {
  return async function (dispatch) {
    // Set loading state to true
    dispatch(setLoading(true))
    // Make PUT request to API to update Prompy settings profile
    await API({ url: "/prompts/update-by-id", method: "put", data })
      .then(() => {
        // Dispatch alert indicating successful update
        dispatch(addAlert("You have successfully updated prompt.", "success"))
        // Set loading state to false
        dispatch(setLoading(false))
        dispatch({
          type: promptActionType.EDIT_PROMPT_SUCCESS,
          payload: true,
        });
        dispatch(getListPrompt());
      })
      .catch((err) => dispatch(onError(err)))
  }
}

export function createPrompt(data) {
  return async function (dispatch) {
    // Set loading state to true
    dispatch(setLoading(true))
    // Make PUT request to API to update user settings profile
    await API({ url: "/topics", method: "post", data })
      .then(() => {
        // Dispatch alert indicating successful update
        dispatch(addAlert("You have successfully create prompt.", "success"))
        // Set loading state to false
        dispatch(setLoading(false))
        dispatch(getListPrompt());
        dispatch({
          type: promptActionType.CREATE_PROMPT_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => dispatch(onError(err)))
  }
}