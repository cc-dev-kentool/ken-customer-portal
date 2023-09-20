import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

export function SMSYSToast({ show, message, redirect }) {
  useEffect(() => {
    if (show && message) {
      toast.dismiss();
      toast.success(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => redirect && (window.location.href = redirect),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, message]);

  return (
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
    />
  );
}
