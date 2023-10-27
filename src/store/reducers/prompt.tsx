import { promptActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  listPrompt: [],
  getListPromptSuccess: false,
  prompt: {},
  getPromptSuccess: false,
  createPromptSuccess: false,
  editPromptSuccess: false,
}

// Declaring the modal reducer function
const promptSetting = (state = initialState, action) => {
  switch (action.type) {
    // Case for GET_LIST_PROMPT action type.
    case promptActionType.GET_LIST_PROMPT:
      return {
        ...state,
        listPrompt: action.payload
      }
    // Case for GET_LIST_PROMPT_SUCCESS action type.
    case promptActionType.GET_LIST_PROMPT_SUCCESS:
      return {
        ...state,
        getListPromptSuccess: action.payload,
      }
    // Case for GET_PROMPT action type.
    case promptActionType.CREATE_PROMPT_SUCCESS:
      return {
        ...state,
        createPromptSuccess: action.payload,
      }
    // Case for CREATE_PROMPT_SUCCESS action type.
    case promptActionType.EDIT_PROMPT_SUCCESS:
      return {
        ...state,
        editPromptSuccess: action.payload,
      }
    // Default fallback case returns the current state.
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default promptSetting
