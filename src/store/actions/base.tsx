import { setLoading } from 'store/actions/app'
import { add as addAlert, remove as removeAlert } from "store/actions/alert"
import { error, code } from "constants/error"

// Defining async function onError which will receive 'err' as argument
export function onError(err) {
  // Returns an async function which will receive dispatch as argument
  return async function (dispatch) {
    // Calling the setLoading function with argument false to set loading to false
    dispatch(setLoading(false))
    // Checking if err.data.code exists in error constant
    const msg = err?.data?.message in error ? error[err?.data?.message] : code["502"]
    // Calling the addAlert function with message and danger as arguments
    dispatch(addAlert(msg, "danger"))
    setTimeout(() => dispatch(removeAlert()), 5000)
  }
}