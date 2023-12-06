import { analysisActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  dataAnalysis: [],
  getDataAnalysisSuccess: false,
  hasPermission: true,
  filePath: "",
  uploadPdf: "",
  uploadPdfSuccess: false,
  listFile: [],
  getListFileSuccess: false,
}

// Declaring the modal reducer function
const getAnalysisData = (state = initialState, action) => {
  switch (action.type) {
    case analysisActionType.GET_DATA_ANALYTICS:
      return {
        ...state,
        dataAnalysis: action.payload
      }
    case analysisActionType.GET_DATA_ANALYTICS_SUCCESS:
      return {
        ...state,
        getDataAnalysisSuccess: action.payload
      }
    case analysisActionType.HAS_PERMISSION:
      return {
        ...state,
        hasPermission: action.payload
      }
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
