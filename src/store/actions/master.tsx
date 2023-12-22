import { masterActionType } from "store/actionTypes";
import { setLoading } from "./app";
import { onError } from "./base";
import API from "service/api";

export function getStatisticsUser() {
  return async function (dispatch) {
    dispatch(setLoading(true));
    await API({ url: "/statistic/user", method: "GET" })
      .then((result) => {
        dispatch(setLoading(false));
        dispatch({
          type: masterActionType.GET_STATISTICS_USER,
          payload: result.data.data,
        });
        dispatch({
          type: masterActionType.GET_STATISTICS_USER_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch({
          type: masterActionType.GET_STATISTICS_USER_SUCCESS,
          payload: false,
        });
        dispatch(onError(err))
      });
  };
}

export function getStatisticsContract(isLoading = true) {
  return async function (dispatch) {
    isLoading && dispatch(setLoading(true));
    await API({ url: "/statistic/contract", method: "GET" })
      .then((result) => {
        isLoading && dispatch(setLoading(false));
        dispatch({
          type: masterActionType.GET_STATISTICS_CONTRACT,
          payload: result.data.data,
        });
        dispatch({
          type: masterActionType.GET_STATISTICS_CONTRACT_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch({
          type: masterActionType.GET_STATISTICS_CONTRACT_SUCCESS,
          payload: false,
        });
        dispatch(onError(err))
      });
  };
}

export function getStatisticsEmber() {
  return async function (dispatch) {
    dispatch(setLoading(true));
    await API({ url: "/statistic/contract/questionmark", method: "GET" })
      .then((result) => {
        dispatch(setLoading(false));
        dispatch({
          type: masterActionType.GET_STATISTICS_QUESTIONMARK,
          payload: result.data.data,
        });
        dispatch({
          type: masterActionType.GET_STATISTICS_QUESTIONMARK_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch({
          type: masterActionType.GET_STATISTICS_QUESTIONMARK_SUCCESS,
          payload: false,
        });
        dispatch(onError(err))
      });
  };
}