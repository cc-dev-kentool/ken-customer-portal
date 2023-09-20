// This function exports an action creator that sets whether the add barcode modal is shown or not
export const setModalAddBarcodeShow = (isModalAddBarcodeShow) => ({
  type: 'SET_MODAL_ADD_BARCODE_SHOW',
  payload: isModalAddBarcodeShow
})

// This function exports an action creator that sets whether the option size modal is shown or not
export const setModalOptionSizeShow = (isModalOptionSizeShow) => ({
  type: 'SET_MODAL_OPTION_SIZE_SHOW',
  payload: isModalOptionSizeShow
})

export const setModalCofirmRefreshShow = (isModalConfirmRefreshShow) => ({
  type: 'SET_MODAL_CONFIRM_REFRESH_SHOW',
  payload: isModalConfirmRefreshShow
})