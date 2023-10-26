import { analysisActionType } from "store/actionTypes";
import { setLoading } from "./app";
import { onError } from "./base";
import API from "service/api";

// Define a function to change password my account
export function getAnalysisData(file) {
  return async function (dispatch) {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append('file', file);

    await API({ url: "/analysis", method: "post", data: formData })
      .then((result) => {
        dispatch(setLoading(false));
        dispatch({
          type: analysisActionType.GET_DATA_ANALYTICS,
          payload: result.data.data,
        });
      })
      .catch((err) => dispatch(onError(err)));
  };
}