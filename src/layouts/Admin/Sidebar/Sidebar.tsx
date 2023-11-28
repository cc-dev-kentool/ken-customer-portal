import { PopupDialog } from "components/Modals/PopUpDialog";
import { useState } from "react";
import { useAppDispatch } from "hooks";
import { uploadPdf } from "store/actions/analysis";
import { remove as removeAlert } from "store/actions/alert"
import classNames from "classnames";
import UploadFile from "pages/Analyses/UploadFile";
import SidebarAdmin from "./SidebarAdmin";
import SidebarMember from "./SidebarMember";

// Export the Sidebar component as the default export
export default function Sidebar(props) {
  // Get the dispatch function from the useAppDispatch hook
  const dispatch = useAppDispatch();

  // Destructure the props object for easier access to its properties
  const {
    routeName,
    isShowFullSidebar,
    toggleMenu,
    setUrl,
    setShowChat,
    setIsShowFullChat,
    setShowPdf,
  } = props;

  // Parse the user object stored in localStorage
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // Define state variables
  const [showModalUplaod, setShowModalUplaod] = useState<boolean>(false);
  const [isShowFiles, setIsShowFiles] = useState<boolean>(true);
  const [file, setFile] = useState<File>();
  const [isEnableBtnAnalyze, setIsEnableBtnAnalyze] = useState<boolean>(true);
  const [isNewUplaod, setIsNewUplaod] = useState<boolean>(false);

  // Define a function called "getContentPopupArea" that returns some JSX
  const getContentPopupArea = () => {
    return (
      <UploadFile
        file={file}
        setFile={setFile}
        setEnableBtnAnalyze={setIsEnableBtnAnalyze}
      />
    )
  }

  // Define a function called "handleSubmitPupopUpload" that updates the URL and state variables
  const handleSubmitPupopUpload = () => {
    if (file) {
      setUrl(URL.createObjectURL(file));
      setShowModalUplaod(false);
      dispatch(uploadPdf(file));
    }
  }

  // Define a function called "handleClosePupopUpload" that resets state variables and dispatches an action
  const handleClosePupopUpload = () => {
    setIsEnableBtnAnalyze(true);
    setShowModalUplaod(false);
    dispatch(removeAlert());
  }

  // Render the following JSX
  return (
    <nav
      id="sidebar"
      className={classNames("sidebar bg-white", { "full-sidebar": isShowFullSidebar, "small-sidebar": !isShowFullSidebar })}
    >
      <div className="bg-white">
        <div className="logo">
          <a href="/">
            <p>KEN</p>
          </a>
          <span
            className={classNames("sidebar-toggle", { "expand-sidebar": !isShowFullSidebar })}
            onClick={() => {
              setIsShowFiles(!isShowFullSidebar)
              toggleMenu()
            }}
          >
            <i className={`fa fa-chevron-${isShowFullSidebar ? 'left' : 'right'}`} aria-hidden="true"></i>
          </span>
        </div>

        <div className="list-group">
          {/* Render SidebarAdmin component if user role is "admin" or "super-admin" */}
          {["admin", "super-admin"].includes(user.role) &&
            <SidebarAdmin routeName={routeName} isShowFullSidebar={isShowFullSidebar} />
          }

          {/* Render SidebarMember component if user role is "member" or ("admin" or "super-admin" and routeName is "analyses") */}
          {(user.role === "member" || (["admin", "super-admin"].includes(user.role) && routeName === "analyses")) &&
            <SidebarMember
              role={user.role}
              isShowFiles={isShowFiles}
              isShowFullSidebar={isShowFullSidebar}
              isNewUplaod={isNewUplaod}
              setUrl={setUrl}
              setShowChat={setShowChat}
              setIsShowFullChat={setIsShowFullChat}
              setShowPdf={setShowPdf}
              setshowModalUplaod={setShowModalUplaod}
              setIsNewUplaod={setIsNewUplaod}
            />}
        </div>
      </div>

      <p className={classNames("version", { "full-sidebar": isShowFullSidebar, "small-sidebar": !isShowFullSidebar })}>KEN &copy; 1.0.0.15</p>

      {/* Render PopupDialog component with specific props */}
      <PopupDialog
        isShow={showModalUplaod}
        title={"Upload Document"}
        content={getContentPopupArea()}
        firstLabelButon={"Cancel"}
        seconLabelButton={"Analyze"}
        handleFirstButtonCalback={handleClosePupopUpload}
        handleSeconButtonCalback={handleSubmitPupopUpload}
        enableSecondButton={isEnableBtnAnalyze}
      />
    </nav>
  );
}
