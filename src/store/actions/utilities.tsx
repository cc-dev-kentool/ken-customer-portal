import { utilitiesActionType } from "store/actionTypes";
import { setLoading } from "./app";
import { onError } from "./base";
import API from "service/api";

export function getResultUtilities(dataPrompt) {
  return async function (dispatch) {
    // Set loading state to true
    dispatch(setLoading(true));
    dispatch({
      type: utilitiesActionType.GET_UTILITIES,
      payload: "",
    });
    dispatch({
      type: utilitiesActionType.GET_UTILITIES_SUCCESS,
      payload: false,
    });

    const data = { "prompt": dataPrompt.prompt}
    // Make PUT request to API to update user settings profile
    await API({ url: `/utilities/prompt/${dataPrompt.file_id}`, method: "post", data})
      .then((result) => {
        // Set loading state to false
        dispatch(setLoading(false));
        dispatch({
          type: utilitiesActionType.GET_UTILITIES,
          payload: result.data.data,
        });
        dispatch({
          type: utilitiesActionType.GET_UTILITIES_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: utilitiesActionType.GET_UTILITIES_SUCCESS,
          payload: false,
        });
        dispatch(onError(err))
      });
  };
}