import { masterActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  statisticsUser: [],
  getStatisticsUserSuccess: false,
  statisticsContract: [],
  getStatisticsContractSuccess: false,
  statisticsQuestionmark: [],
  getStatisticsQuestionmarkSuccess: false,
}

// Declaring the modal reducer function
const masterSetting = (state = initialState, action) => {
  switch (action.type) {
    // Case for GET_STATISTICS_USER action type.
    case masterActionType.GET_STATISTICS_USER:
      return {
        ...state,
        statisticsUser: action.payload
      }
    // Case for GET_STATISTICS_USER_SUCCESS action type.
    case masterActionType.GET_STATISTICS_USER_SUCCESS:
      return {
        ...state,
        getStatisticsUserSuccess: action.payload,
      }
    // Case for GET_STATISTICS_USER action type.
    case masterActionType.GET_STATISTICS_CONTRACT:
      return {
        ...state,
        statisticsContract: action.payload
      }
    // Case for GET_STATISTICS_USER_SUCCESS action type.
    case masterActionType.GET_STATISTICS_CONTRACT_SUCCESS:
      return {
        ...state,
        getStatisticsContractSuccess: action.payload,
      }
    // Case for GET_STATISTICS_USER action type.
    case masterActionType.GET_STATISTICS_QUESTIONMARK:
      return {
        ...state,
        statisticsQuestionmark: action.payload
      }
    // Case for GET_STATISTICS_USER_SUCCESS action type.
    case masterActionType.GET_STATISTICS_QUESTIONMARK_SUCCESS:
      return {
        ...state,
        getStatisticsQuestionmarkSuccess: action.payload,
      }
    // Default fallback case returns the current state.
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default masterSetting
