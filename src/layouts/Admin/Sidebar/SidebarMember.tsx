import { useAppDispatch, useAppSelector } from "hooks";
import { remove, remove as removeAlert } from "store/actions/alert"
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
    isNewUplaod,
    setshowModalUplaod,
    setIsShowFiles,
    setIsNewUplaod,
    setShowChat,
    setCurrentDocumentId,
  } = props;

  // Import the dispatch function from the Redux store
  const dispatch = useAppDispatch();

  // Use the useAppSelector hook to get values from the state
  const [files, getListFileSuccess] = useAppSelector((state) => [
    state.analysis.listFile,
    state.analysis.getListFileSuccess,
  ]);

  // Set the defaultValue based on the value of role using a switch statement
  let defaultValue: number;
  switch (role) {
    case 'super-admin':
      defaultValue = 490;
      break;
    case 'admin':
      defaultValue = 400;
      break;
    default:
      defaultValue = 210;
  }

  // Declare and initialize states using the useState hook
  const [heightMenu, setHeightMenu] = useState<number>(window.innerHeight - defaultValue)
  const [activeFile, setActiveFile] = useState<string>("");

  // Set up side effect using the useEffect hook to fetch list of files when component mounts
  useEffect(() => {
    dispatch(getListFile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set up side effect using the useEffect hook to handle the file selection logic when isNewUplaod or getListFileSuccess changes
  useEffect(() => {
    if (isNewUplaod && getListFileSuccess) {
      const findFile = files.find(file => file.analysis_status === 'running')
      if (findFile) {
        setActiveFile(files[0]?.uuid);
        setIsNewUplaod(false);
      }
    }
  }, [isNewUplaod, getListFileSuccess]);

  // Define a function called "handleShowFiles" that toggles the value of "isShowFiles"
  const handleShowFiles = () => {
    setIsShowFiles(!isShowFiles)
  }

  // Set up side effect using the useEffect hook to update the heightMenu state when window resizes
  useEffect(() => {
    window.addEventListener('resize', function () {
      setHeightMenu(window.innerHeight - defaultValue);
    });
  }, []);

  // Define a function called "showDetailFile" that dispatches remove action and updates states based on the selected fileId
  const showDetailFile = (fileId) => {
    dispatch(remove());
    setShowChat(false);
    setActiveFile(fileId);
    setCurrentDocumentId(fileId);
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

  // Return the following JSX
  return (
    <>
      <button
        className={classNames('btn-add-document', { 'btn-disabled': disableBtnNew() })}
        onClick={() => {
          dispatch(removeAlert())
          setshowModalUplaod(true)
        }}
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
        <p>
          <i
            className={`fa-solid fa-chevron-${isShowFiles ? 'up' : 'down'}`}
            onClick={handleShowFiles}
          />
          <span className="m-2 main-menu-title">Main</span>
        </p>
        {isShowFiles &&
          <div
            className="list-file"
            style={{ height: '84%' }}
          >
            {files.map((file) => {
              return (
                <button
                  className={classNames("mb-2", { "active-file": file.uuid === activeFile })}
                  key={file.uuid}
                  onClick={() => showDetailFile(file.uuid)}
                >
                  <i className="fa-regular fa-file-lines m-2" style={{ color: "#26adc9" }}></i>
                  <span data-tooltip-id={`tooltip-1-${file.uuid}`}>
                    {file.file_name?.length > 16 ? labelDisplay(file.file_name, 16) : file.file_name}
                  </span>
                  {file.file_name?.length > 16 &&
                    <ReactTooltip
                      id={`tooltip-1-${file.uuid}`}
                      content={file.file_name}
                      widthTooltip={220}
                    />}
                  <img src={getStatusFile(file.analysis_status)} className="icon-action" alt="" width="20px" />
                </button>
              )
            })}
          </div>
        }
      </div>}
    </>
  );
}
