import { modalActionType } from "../actionTypes"

// Initial state of Modal
const initialState = {
  isModalAddBarcodeShow: false,
  isModalOptionSizeShow: false,
  isModalConfirmRefreshShow: false,
}

// Declaring the modal reducer function
const modal = (state = initialState, action) => {
  switch (action.type) {
    // Case for SET_MODAL_ADD_BARCODE_SHOW action type.
    case modalActionType.SET_MODAL_ADD_BARCODE_SHOW:
      return {
        ...state,
        isModalAddBarcodeShow: action.payload
      }
    // Case for SET_MODAL_OPTION_SIZE_SHOW action type.
      case modalActionType.SET_MODAL_OPTION_SIZE_SHOW:
        return {
          ...state,
          isModalOptionSizeShow: action.payload
        }
    // Case for SET_MODAL_OPTION_SIZE_SHOW action type.
      case modalActionType.SET_MODAL_CONFIRM_REFRESH_SHOW:
        return {
          ...state,
          isModalConfirmRefreshShow: action.payload
        }
    // Default fallback case returns the current state.
    default:
      return state
  }
}

// Exporting auth reducer function as default.
export default modal
