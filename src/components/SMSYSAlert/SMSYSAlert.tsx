// Importing useEffect hook from react module, useAppDispatch and useAppSelector custom hooks from our own hooks file
// and the remove function from alert actions
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { remove } from "store/actions/alert";

// Defining a function component called SMSYSAlert and passing props as an argument
export function SMSYSAlert(props) {
  const dispatch = useAppDispatch(); // Creating a dispatch function using custom useAppDispatch hook

  // Using custom useAppSelector hook to get type, show and message properties from the Redux state
  const [type, show, message, isFullScreen] = useAppSelector((state) => [
    state.alert.type,
    state.alert.show,
    state.alert.message,
    state.alert.isFullScreen,
  ]);

  // Using useEffect hook to handle side effects when the show or type values change
  useEffect(() => {
    if (show && type === "success") {
      // Checking if the alert should be removed automatically
      // Setting a timer to automatically remove the alert after 5 seconds
      const timer = setTimeout(() => {
        dispatch(remove()); // Removing the alert
        props.redirect && (window.location.href = props.redirect); // Redirecting the user if a redirect URL is passed in the props
      }, 5000);
      return () => clearTimeout(timer); // Clearing the timer when component unmounts or values change
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  // Creating clearAlert function to dispatch the remove action creator
  const clearAlert = () => {
    dispatch(remove());
  };

  // Returning JSX that will render and display the alert message
  return (
    <div
      className={`
        alert alert-${type} 
        ${props.isShowMenu ? "collapsed" : ""}
        ${isFullScreen ? "full-screen" : ""}
      `}
      style={show ? { display: "" } : { display: "none" }}
    >
      {/* Ternary operator to conditionally render a checkmark icon or an exclamation mark icon based on type */}
      {type === "success" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-check-circle align-middle me-2"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-alert-circle align-middle me-2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      )}
      {message} {/* Displays the alert message passed in as a prop */}
      {/* A span element that contains an icon that will remove the alert when clicked */}
      <span
        className="notification-close"
        onClick={() => clearAlert()}
        role="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-x align-middle me-2 pull-right"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    </div>
  );
}
