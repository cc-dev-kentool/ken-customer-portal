import { chatActionType } from "store/actionTypes";
import { onError } from "./base";
import API from "service/api";

export function getConversation(id) {
  return async function (dispatch) {
    dispatch({
      type: chatActionType.GET_CONVERSATION,
      payload: [],
    });
    dispatch({
      type: chatActionType.GET_CONVERSATION_SUCCESS,
      payload: false,
    });
    await API({ url: `/analysis/${id}/chats`, method: "GET" })
      .then((result) => {
        dispatch({
          type: chatActionType.GET_CONVERSATION,
          payload: result.data.data.data,
        });
        dispatch({
          type: chatActionType.GET_CONVERSATION_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: chatActionType.POST_CONVERSATION_SUCCESS,
          payload: false,
        });
        dispatch(onError(err))
      });
  };
}

export function postConversation(id, message) {
  return async function (dispatch) {
    // Set loading state to true
    const data = {question: message}
    // Make PUT request to API to update user settings profile
    await API({ url: `/analysis/${id}/chat`, method: "post", data })
      .then(() => {
        // Dispatch alert indicating successful update
        dispatch({
          type: chatActionType.POST_CONVERSATION_SUCCESS,
          payload: true,
        });
        dispatch(getConversation(id))
      })
      .catch((err) => dispatch(onError(err)))
  }
}