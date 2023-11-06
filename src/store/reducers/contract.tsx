import { contractActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  contracts: [],
  getContractsSuccess: false,
}

// Declaring the modal reducer function
const contractSetting = (state = initialState, action) => {
  switch (action.type) {
    // Case for GET_MASTER_DATA action type.
    case contractActionType.GET_CONTRACTS:
      return {
        ...state,
        contracts: action.payload
      }
    // Case for GET_MASTER_DATA_SUCCESS action type.
    case contractActionType.GET_CONTRACTS_SUCCESS:
      return {
        ...state,
        getContractsSuccess: action.payload,
      }
    // Default fallback case returns the current state.
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default contractSetting
