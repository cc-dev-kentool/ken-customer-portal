import { analysisActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  dataAnalysis: [],
  filePath: "",
  uploadPdf: "",
  uploadPdfSuccess: false,
  listFile: [],
  getListFileSuccess: false,
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
    case analysisActionType.UPLOAD_PDF:
      return {
        ...state,
        uploadPdf: action.payload
      }
    case analysisActionType.UPLOAD_PDF_SUCCESS:
      return {
        ...state,
        uploadPdfSuccess: action.payload
      }
    case analysisActionType.GET_LIST_FILE:
      return {
        ...state,
        listFile: action.payload
      }
    case analysisActionType.GET_LIST_FILE_SUCCESS:
      return {
        ...state,
        getListFileSuccess: action.payload,
      }
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default getAnalysisData
