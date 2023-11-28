import { analysisActionType } from "store/actionTypes";
import { setLoading } from "./app";
import { onError } from "./base";
import API from "service/api";

// Define a function to change password my account
export function getAnalysisData(id, isLoading = false) {
  return async function (dispatch) {
    isLoading && dispatch(setLoading(true));
    await API({ url: `/analysis/${id}`, method: "get" })
      .then((result) => {
        isLoading && dispatch(setLoading(false));
        dispatch({
          type: analysisActionType.GET_DATA_ANALYTICS,
          payload: result.data.data,
        });
      })
      .catch((err) => {
        isLoading && dispatch(setLoading(false));
        dispatch(onError(err));
      });
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

export function getListFile(isLoading=true) {
  return async function (dispatch) {
    isLoading && dispatch(setLoading(true));
    dispatch({
      type: analysisActionType.GET_LIST_FILE_SUCCESS,
      payload: false,
    });
    await API({ url: "/analysises", method: "GET" })
      .then((result) => {
        isLoading && dispatch(setLoading(false));
        dispatch({
          type: analysisActionType.GET_LIST_FILE,
          payload: result.data.data,
        });
        dispatch({
          type: analysisActionType.GET_LIST_FILE_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        isLoading && dispatch(setLoading(false));
        dispatch({
          type: analysisActionType.GET_LIST_FILE_SUCCESS,
          payload: false,
        });
        dispatch(onError(err))
      });
  };
}