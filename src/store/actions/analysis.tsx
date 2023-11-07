import { analysisActionType } from "store/actionTypes";
import { setLoading } from "./app";
import { onError } from "./base";
import API from "service/api";

// Define a function to change password my account
export function getAnalysisData(id) {
  return async function (dispatch) {
    await API({ url: `/analysis/${id}`, method: "get" })
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

// Define a function to change password my account
export function uploadPdf(file) {
  return async function (dispatch) {
    dispatch(setLoading(true));
    const formData = new FormData();
    formData.append('file', file);

    await API({ url: "/analysis", method: "post", data: formData })
      .then((result) => {
        dispatch({
          type: analysisActionType.UPLOAD_PDF,
          payload: result.data.data.file_upload_id,
        });
        dispatch(getAnalysisData(result.data.data.file_upload_id))
        dispatch({
          type: analysisActionType.UPLOAD_PDF_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch(onError(err));
        dispatch({
          type: analysisActionType.UPLOAD_PDF_SUCCESS,
          payload: false,
        });
      });
  };
}