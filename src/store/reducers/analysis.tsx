import { analysisActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  dataAnalysis: [],
}

// Declaring the modal reducer function
const getAnalysisData = (state = initialState, action) => {
  if (action.type === analysisActionType.GET_DATA_ANALYTICS) {
    return {
      ...state,
      dataAnalysis: action.payload
    }
  } else return state
}

// Exporting auth reducer function as default.
export default getAnalysisData
