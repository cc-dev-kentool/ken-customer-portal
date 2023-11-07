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