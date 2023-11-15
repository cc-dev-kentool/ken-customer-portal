import { contractActionType } from "store/actionTypes";
import { setLoading } from "./app";
import { onError } from "./base";
import API from "service/api";

export function getContracts() {
  return async function (dispatch) {
    dispatch(setLoading(true));
    await API({ url: "/statistic/contracts", method: "GET" })
      .then((result) => {
        dispatch(setLoading(false));
        dispatch({
          type: contractActionType.GET_CONTRACTS,
          payload: result.data.data,
        });
        dispatch({
          type: contractActionType.GET_CONTRACTS_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch(setLoading(false));
        dispatch({
          type: contractActionType.GET_CONTRACTS_SUCCESS,
          payload: false,
        });
        dispatch(onError(err))
      });
  };
}

export function getContractDetail(id) {
  return async function (dispatch) {
    dispatch({
      type: contractActionType.GET_CONTRACT_DETAIL,
      payload: [],
    });
    dispatch({
      type: contractActionType.GET_CONTRACT_DETAIL_SUCCESS,
      payload: false,
    });
    await API({ url: `/analysis/${id}/questionmarks`, method: "GET" })
      .then((result) => {
        dispatch({
          type: contractActionType.GET_CONTRACT_DETAIL,
          payload: result.data.data,
        });
        dispatch({
          type: contractActionType.GET_CONTRACT_DETAIL_SUCCESS,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: contractActionType.GET_CONTRACT_DETAIL_SUCCESS,
          payload: false,
        });
        dispatch(onError(err))
      });
  };
}