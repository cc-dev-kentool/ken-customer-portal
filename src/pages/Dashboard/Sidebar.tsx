import { PopupDialog } from "components/Modals/PopUpDialog";
import { useState } from "react";
import UploadFile from "./UploadFile";
import logo from "assets/images/logo.png";

// Define a function called "Dashboard" which receives a single parameter called "props"
export default function Sidebar(props) {
  const {isShowMenu, toggleMenu, setUrl} = props;

  const [showModalUplaod, setshowModalUplaod] = useState(false)
  const [file, setFile] = useState<any>(null);

  const getContentPopupArea = () => {
    return <UploadFile file={file} setFile={setFile}/>                                                       
  }

  const handleSubmitPupopUpload = () => {
    file && setUrl(URL.createObjectURL(file));
    setshowModalUplaod(false);
  }
  

  // Return the following JSX
  return (
    <nav
      id="sidebar"
      className={`sidebar js-sidebar ${isShowMenu ? "" : "collapsed"}`}
    >
      <div className="sidebar-content js-simplebar">
        <div className="logo">
          <a href="/" className="d-inline">
            <img src={logo} alt="logo" className="logo-sidebar m-3"/>
          </a>
          <span
            className="sidebar-toggle js-sidebar-toggle"
            onClick={() => toggleMenu()}
          >
            <i className="fa fa-chevron-left icon-toggle" aria-hidden="true"></i>
          </span>
        </div>
        <ul className="list-group">
          <li>
            <button className="btn-add-document" onClick={() => setshowModalUplaod(true)}> 
              <i className="fa-regular fa-plus fs-1"></i> 
              <br /> New Document
            </button>
          </li>
          <li className="main-menu">
            <p>
              <i className="fa-solid fa-chevron-down"></i>
              {' '}Main
            </p>
            <div>
              <p className="p-1">
                <i className="fa-regular fa-file-lines m-2" style={{ color: "#26adc9" }}></i>
                <span>TemplatePDF.pdf</span>
                <i className="fa-solid fa-ellipsis icon-action"></i>
              </p>
              <p className="p-1">
                <i className="fa-regular fa-file-lines m-2" style={{ color: "#26adc9" }}></i>
                Sharefile.pdf
                <i className="fa-solid fa-ellipsis icon-action"></i>
              </p>
              <p className="active-file p-1">
                <i className="fa-regular fa-file-lines m-2" style={{ color: "#26adc9" }}></i>
                Jerry2020-torm.pdf
                <i className="fa-solid fa-ellipsis icon-action"></i>
              </p>
            </div>
          </li>
        </ul>
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
