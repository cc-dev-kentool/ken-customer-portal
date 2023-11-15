import { contractActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  contracts: [],
  getContractsSuccess: false,
  constractDetail: [],
  getContractDetailsSuccess: false,
}

// Declaring the modal reducer function
const contractSetting = (state = initialState, action) => {
  switch (action.type) {
    // Case for GET_CONTRACTS action type.
    case contractActionType.GET_CONTRACTS:
      return {
        ...state,
        contracts: action.payload
      }
    // Case for GET_CONTRACTS_SUCCESS action type.
    case contractActionType.GET_CONTRACTS_SUCCESS:
      return {
        ...state,
        getContractsSuccess: action.payload,
      }
    // Case for GET_CONTRACT_DETAIL action type.
    case contractActionType.GET_CONTRACT_DETAIL:
      return {
        ...state,
        constractDetail: action.payload
      }
    // Case for GET_CONTRACT_DETAIL_SUCCESS action type.
    case contractActionType.GET_CONTRACT_DETAIL_SUCCESS:
      return {
        ...state,
        getContractDetailsSuccess: action.payload,
      }
    // Default fallback case returns the current state.
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default contractSetting
