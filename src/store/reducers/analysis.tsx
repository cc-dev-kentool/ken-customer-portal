import { analysisActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  dataAnalysis: [],
  filePath: ""
}

// Declaring the modal reducer function
const getAnalysisData = (state = initialState, action) => {
  switch (action.type) {
    // Set alert action case.
    case analysisActionType.GET_DATA_ANALYTICS:
      return {
        ...state,
        dataAnalysis: action.payload
      }
    // Remove alert action case.
    case analysisActionType.SET_FILE_PATH:
      return {
        ...state,
        filePath: action.payload
      }
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default getAnalysisData
