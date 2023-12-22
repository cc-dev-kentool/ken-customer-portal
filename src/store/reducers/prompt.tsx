import { topicsActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  topics: [],
  getTopicsSuccess: false,
  createTopicSuccess: false,
  editTopicSuccess: false,
}

// Declaring the modal reducer function
const promptSetting = (state = initialState, action) => {
  switch (action.type) {
    // Case for GET_LIST_PROMPT action type.
    case topicsActionType.GET_LIST_TOPICS:
      return {
        ...state,
        topics: action.payload
      }
    // Case for GET_LIST_PROMPT_SUCCESS action type.
    case topicsActionType.GET_LIST_TOPICS_SUCCESS:
      return {
        ...state,
        getTopicsSuccess: action.payload,
      }
    // Case for GET_PROMPT action type.
    case topicsActionType.CREATE_TOPICS_SUCCESS:
      return {
        ...state,
        createTopicSuccess: action.payload,
      }
    // Case for CREATE_PROMPT_SUCCESS action type.
    case topicsActionType.UPDATE_TOPICS_SUCCESS:
      return {
        ...state,
        editTopicSuccess: action.payload,
      }
    // Default fallback case returns the current state.
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default promptSetting
