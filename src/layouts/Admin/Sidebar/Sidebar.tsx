import { PopupDialog } from "components/Modals/PopUpDialog";
import { useState } from "react";
import { useAppDispatch } from "hooks";
import { uploadPdf } from "store/actions/analysis";
import { remove as removeAlert } from "store/actions/alert"
import classNames from "classnames";
import UploadFile from "pages/Analyses/UploadFile";
import SidebarAdmin from "./SidebarAdmin";
import SidebarMember from "./SidebarMember";
import logo from "../../../assets/images/logo.png"
import icon_email from "../../../assets/icon/icon_email.svg";

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
    setValueSearch,
  } = props;

  // Parse the user object stored in localStorage
  const user = JSON.parse(localStorage.getItem('user') ?? '{}')

  // Define state variables
  const [showModalUplaod, setShowModalUplaod] = useState<boolean>(false);
  const [isShowFiles, setIsShowFiles] = useState<boolean>(true);
  const [file, setFile] = useState<any>(null);
  const [isEnableBtnAnalyze, setIsEnableBtnAnalyze] = useState<boolean>(false);

  // Define a function called "getContentPopupArea" that returns some JSX
  const getContentPopupArea = () => {
    return (
      <UploadFile
        file={file}
        setFile={setFile}
        setIsEnableBtnAnalyze={setIsEnableBtnAnalyze}
      />
    )
  }

  // Define a function called "handleSubmitPupopUpload" that updates the URL and state variables
  const handleSubmitPupopUpload = () => {
    if (file) {
      setUrl(URL.createObjectURL(file));
      setShowModalUplaod(false);
      setShowPdf(true);
      setShowChat(false);
      setIsShowFullChat(false);
      setFile(null);
      dispatch(uploadPdf(file));
    }
  }

  // Define a function called "handleClosePupopUpload" that resets state variables and dispatches an action
  const handleClosePupopUpload = () => {
    setFile(null);
    setShowModalUplaod(false);
    dispatch(removeAlert());
  }

  const handleShowPopupUplaod = () => {
    dispatch(removeAlert())
    setIsEnableBtnAnalyze(false);
    setShowModalUplaod(true)
  }

  // Render the following JSX
  return (
    <nav
      id="sidebar"
      className={classNames("sidebar bg-white", { "full-sidebar": isShowFullSidebar, "small-sidebar": !isShowFullSidebar })}
    >
      <div className="bg-white">
        <div className="logo">
          <a href={`${user.role === "member" ? "/analyses" : "/"}`}>
            <p className="mb-2"><img src={logo} alt="logo" width="70%" /></p>
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
          {(user.role === "member" || (["admin", "super-admin"].includes(user.role))) && routeName === "analyses" &&
            <SidebarMember
              role={user.role}
              isShowFiles={isShowFiles}
              isShowFullSidebar={isShowFullSidebar}
              setUrl={setUrl}
              setShowChat={setShowChat}
              setIsShowFullChat={setIsShowFullChat}
              setShowPdf={setShowPdf}
              setValueSearch={setValueSearch}
              handleShowPopupUplaod={handleShowPopupUplaod}
            />}
        </div>
      </div>

      <div className={classNames("footer", {
        "full-sidebar": isShowFullSidebar,
        "small-sidebar": !isShowFullSidebar
      })}>
        <a href="/analyses">
          <button className={`btn-contact ${!isShowFullSidebar && 'text-center'}`}>
            <img src={icon_email} alt="logo" width="15px" className="icon-contact" />
            {isShowFullSidebar && <span>Contact Administrator</span>}
          </button>
        </a>
        <p className="version">
          KEN &copy; 1.0.0.18
        </p>
      </div>

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
