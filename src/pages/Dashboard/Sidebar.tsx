import { PopupDialog } from "components/Modals/PopUpDialog";
import { useState } from "react";
import UploadFile from "./UploadFile";
import classNames from "classnames";

// Define a function called "Sidebar" which receives a single parameter called "props"
export default function Sidebar(props) {
  const { isShowFullSidebar, toggleMenu, setUrl, setShowPdf } = props;

  // Define state variables
  const [showModalUplaod, setshowModalUplaod] = useState<boolean>(false);
  const [isShowFiles, setIsShowFiles] = useState<boolean>(true);
  const [file, setFile] = useState<File>();

  // Define an array of file names
  const fileNames = [
    "TemplatePDF.pdf",
    "Sharefile.pdf",
    "Jerry2020-torm.pdf",
  ]

  // Define a function called "getContentPopupArea" that returns some JSX
  const getContentPopupArea = () => {
    return <UploadFile file={file} setFile={setFile} />
  }

  // Define a function called "handleSubmitPupopUpload" that updates the URL and state variables
  const handleSubmitPupopUpload = () => {
    file && setUrl(URL.createObjectURL(file));
    setshowModalUplaod(false);
    setShowPdf(true);
  }

  // Define a function called "handleShowFiles" that toggles the value of "isShowFiles"
  const handleShowFiles = () => {
    setIsShowFiles(!isShowFiles)
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
          <button className="btn-add-document" onClick={() => setshowModalUplaod(true)}>
            <i className="fa-regular fa-plus fs-1"></i>
            {isShowFullSidebar && <span><br />New Document</span>}
          </button>
          <div className={classNames("main-menu", { "main-menu-extended": (isShowFiles && !isShowFullSidebar) })}>
            <p>
              <i
                className={`fa-solid fa-chevron-${isShowFiles ? 'up' : 'down'}`}
                onClick={handleShowFiles}
              />
              <span className="m-2">Main</span>
            </p>
            {isShowFiles &&
              <div className="m-2">
                {fileNames.map((item, index) => {
                  return (
                    <p className={classNames("", { "active-file": index === fileNames.length - 1 })} key={index}>
                      <i className="fa-regular fa-file-lines m-2" style={{ color: "#26adc9" }}></i>
                      <span>{item}</span>
                      <i className="fa-solid fa-ellipsis icon-action"></i>
                    </p>
                  )
                })}
              </div>
            }
          </div>
        </div>
      </div>
      <PopupDialog
        isShow={showModalUplaod}
        title={"Upload Document"}
        content={getContentPopupArea()}
        firstLabelButon={"Cancel"}
        seconLabelButton={"Analyze"}
        handleFirstButtonCalback={() => setshowModalUplaod(false)}
        handleSeconButtonCalback={handleSubmitPupopUpload}
        enableSecondButton={true}
      />
    </nav>
  );
}
