import { chatActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  conversation: [],
  getConversationSuccess: false,
  postConversationSuccess: false,
}

// Declaring the modal reducer function
const chatSetting = (state = initialState, action) => {
  switch (action.type) {
    // Case for GET_CONVERSATION action type.
    case chatActionType.GET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload
      }
    // Case for GET_CONVERSATION_SUCCESS action type.
    case chatActionType.GET_CONVERSATION_SUCCESS:
      return {
        ...state,
        getConversationSuccess: action.payload,
      }
    // Case for GET_USER action type.
    case chatActionType.POST_CONVERSATION_SUCCESS:
      return {
        ...state,
        postConversationSuccess: action.payload,
      }
    // Default fallback case returns the current state.
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default chatSetting
