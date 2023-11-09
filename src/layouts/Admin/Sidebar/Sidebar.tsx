import { PopupDialog } from "components/Modals/PopUpDialog";
import { useState } from "react";
import { useAppDispatch } from "hooks";
import { uploadPdf } from "store/actions/analysis";
import { remove as removeAlert } from "store/actions/alert"
import { getListPrompt } from "store/actions/prompt";
import classNames from "classnames";
import UploadFile from "pages/Analyses/UploadFile";
import SidebarAdmin from "./SidebarAdmin";
import SidebarMember from "./SidebarMember";

// Define a function called "Sidebar" which receives a single parameter called "props"
export default function Sidebar(props) {
  const dispatch = useAppDispatch();
  const {
    routeName,
    isShowFullSidebar,
    toggleMenu,
    setUrl,
    setShowPdf,
    setDataAnalysis,
    setShowChat,
  } = props;

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // Define state variables
  const [showModalUplaod, setShowModalUplaod] = useState<boolean>(false);
  const [isShowFiles, setIsShowFiles] = useState<boolean>(true);
  const [file, setFile] = useState<File>();
  const [isEnableBtnAnalyze, setIsEnableBtnAnalyze] = useState<boolean>(true);

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
      setShowPdf(true);
      setShowChat(false);
      setDataAnalysis([]);
      dispatch(getListPrompt());
      dispatch(uploadPdf(file));
    }
  }

  const handleClosePupopUpload = () => {
    setIsEnableBtnAnalyze(true);
    setShowModalUplaod(false);
    dispatch(removeAlert());
  }

  // Return the following JSX
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
          {["admin", "super-admin"].includes(user.role) &&
            <SidebarAdmin routeName={routeName} isShowFullSidebar={isShowFullSidebar} />
          }

          {(user.role === "member" || (user.role === "admin" && routeName === "analyses")) &&
            <SidebarMember
              role={user.role}
              routeName={routeName}
              isShowFiles={isShowFiles}
              isShowFullSidebar={isShowFullSidebar}
              setshowModalUplaod={setShowModalUplaod}
              setIsShowFiles={setIsShowFiles}
              setShowChat={setShowChat}
            />}
        </div>
      </div>

      <p className={classNames("version", { "full-sidebar": isShowFullSidebar, "small-sidebar": !isShowFullSidebar })}>KEN &copy; 1.0.0.8</p>

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
