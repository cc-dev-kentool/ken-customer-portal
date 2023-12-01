import { useAppDispatch, useAppSelector } from "hooks";
import { remove } from "store/actions/alert"
import { labelDisplay } from "helpers/until";
import { ReactTooltip } from "components/Tooltip/ReactTooltip";
import { useEffect, useState } from "react";
import { getListFile } from "store/actions/analysis";
import icon_success from "assets/icon/icon_success.svg";
import icon_error from "assets/icon/icon_error.svg";
import icon_loading from "assets/icon/icon_loading.svg";
import classNames from "classnames";

// Export the function as a default export with name SidebarMember and import the required props.
export default function SidebarMember(props) {
  // Destructure the props object to get individual values
  const {
    role,
    isShowFiles,
    isShowFullSidebar,
    setUrl,
    setShowChat,
    setIsShowFullChat,
    setShowPdf,
    setValueSearch,
    handleShowPopupUplaod,
  } = props;

  // Import the dispatch function from the Redux store
  const dispatch = useAppDispatch();

  // Use the useAppSelector hook to get values from the state
  const [files] = useAppSelector((state) => [
    state.analysis.listFile,
  ]);

  // Set the defaultValue based on the value of role using a switch statement
  let defaultValue: number;
  switch (role) {
    case 'super-admin':
      defaultValue = 420;
      break;
    case 'admin':
      defaultValue = 380;
      break;
    default:
      defaultValue = 200;
  }

  // Declare and initialize states using the useState hook
  const [heightMenu, setHeightMenu] = useState<number>(window.innerHeight - defaultValue)
  const [activeFile, setActiveFile] = useState<string>("");
  const [isClickToFile, setIsClickToFile] = useState<boolean>(false);

  const queryStr = window.location.search
  useEffect(() => {
    if (queryStr.includes("fileId")) {
      const id = queryStr.slice(queryStr.indexOf("=") + 1);
      setActiveFile(id);
    }
  }, [queryStr])

  // Set up side effect using the useEffect hook to fetch list of files when component mounts
  useEffect(() => {
    dispatch(getListFile(files.length <= 0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set up side effect using the useEffect hook to update the heightMenu state when window resizes
  useEffect(() => {
    window.addEventListener('resize', function () {
      setHeightMenu(window.innerHeight - defaultValue - 40);
    });
  }, []);

  useEffect(() => {
    if (!isShowFullSidebar) {
      setHeightMenu(heightMenu + 40)
    } else {
      setHeightMenu(heightMenu - 40)
    }
  }, [isShowFullSidebar])

  const el: any = document.getElementById('activeFile');
  useEffect(() => {
    if (!isClickToFile) {
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [el]);

  // Define a function called "showDetailFile" that dispatches remove action and updates states based on the selected fileId
  const showDetailFile = (fileId) => {
    dispatch(remove());
    let newurl = window.location.protocol + "//" + window.location.host + '/analyses?fileId=' + fileId;
    window.history.pushState({ path: newurl }, '', newurl);

    setUrl("");
    setValueSearch("");
    setShowChat(false);
    setIsShowFullChat(false);
    setShowPdf(true);
    setIsClickToFile(true);
  }

  // Define a function called "getStatusFile" that returns an icon based on the status provided
  const getStatusFile = (status) => {
    let icon;
    switch (status) {
      case 'done':
        icon = icon_success;
        break;
      case 'error':
        icon = icon_error;
        break;
      case 'running':
        icon = icon_loading;
        break;
      default: return null;
    }
    return icon;
  }

  // Define a function called "disableBtnNew" that checks if there are any files with analysis_status set to 'running'
  const disableBtnNew = () => {
    const findIndex = files.findIndex(item => item.analysis_status === 'running');
    return findIndex >= 0;
  }

  const isActiveFile = (fileId) => {
    return fileId === activeFile;
  }

  // Return the following JSX
  return (
    <>
      <button
        className={classNames('btn-add-document', { 'btn-disabled': disableBtnNew() })}
        onClick={handleShowPopupUplaod}
        disabled={disableBtnNew()}
      >
        <i className="fa-regular fa-plus fs-1"></i><br />
        {isShowFullSidebar && <span>New Document</span>}
      </button>

      {files?.length > 0 && <div
        className={
          classNames("main-menu pr-0",
            { "main-menu-extended": (isShowFiles && !isShowFullSidebar) }
          )
        }
        style={{ height: heightMenu }}
      >
        <p className="main-menu-title">
          <i className="fa-solid fa-chevron-down" />
          <span className="m-2">Main</span>
        </p>
        <div
          className={classNames("list-file", { "none-file": !isShowFiles })}
          style={{ height: '84%' }}
        >
          {files.map((file) => {
            return (
              <button
                id={`${isActiveFile(file.uuid) ? 'activeFile' : ''}`}
                className={classNames("list-file-item", { "active-file": isActiveFile(file.uuid) })}
                key={file.uuid}
                onClick={() => !isActiveFile(file.uuid) && showDetailFile(file.uuid)}
              >
                <i className="fa-regular fa-file-lines m-2" style={{ color: "#26adc9" }}></i>
                <span data-tooltip-id={`tooltip-1-${file.uuid}`}>
                  {file.file_name?.length > 20 ? labelDisplay(file.file_name, 20) : file.file_name}
                </span>
                {file.file_name?.length > 20 &&
                  <ReactTooltip
                    id={`tooltip-1-${file.uuid}`}
                    content={file.file_name}
                    widthTooltip={220}
                  />}
                <img src={getStatusFile(file.analysis_status)} className="icon-action" alt="" width="15px" />
              </button>
            )
          })}
        </div>
      </div>}
    </>
  );
}
