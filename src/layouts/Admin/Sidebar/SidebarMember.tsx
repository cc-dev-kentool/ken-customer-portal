import { useAppDispatch, useAppSelector } from "hooks";
import { remove as removeAlert } from "store/actions/alert"
import { labelDisplay } from "helpers/until";
import { ReactTooltip } from "components/Tooltip/ReactTooltip";
import { useEffect, useState } from "react";
import { getAnalysisData, getListFile } from "store/actions/analysis";
import { getListPrompt } from "store/actions/prompt";
import icon_success from "assets/icon/icon_success.svg";
import icon_error from "assets/icon/icon_error.svg";
import icon_loading from "assets/icon/icon_loading.svg";
import classNames from "classnames";

// Define a function called "Sidebar" which receives a single parameter called "props"
export default function SidebarMember(props) {
  const {
    role,
    isShowFiles,
    isShowFullSidebar,
    setshowModalUplaod,
    setIsShowFiles,
    setShowChat,
  } = props;

  const dispatch = useAppDispatch();

  const [files] = useAppSelector((state) => [
    state.analysis.listFile,
  ]);

  // Sets up side effect using async `getListUser()` action creator to fetch user settings from backend API
  useEffect(() => {
    dispatch(getListFile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const defaultValue = role === 'admin' ? 440 : 210
  const [heightMenu, setHeightMenu] = useState<number>(window.innerHeight - defaultValue)
  const [activeFile, setActiveFile] = useState<number>();

  // Define a function called "handleShowFiles" that toggles the value of "isShowFiles"
  const handleShowFiles = () => {
    setIsShowFiles(!isShowFiles)
  }

  useEffect(() => {
    window.addEventListener('resize', function () {
      setHeightMenu(window.innerHeight - defaultValue);
    });
  }, []);

  const showDetailFile = (fileId) => {
    setShowChat(false);
    setActiveFile(fileId)
    dispatch(getListPrompt(false));
    dispatch(getAnalysisData(fileId));
  }

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

  const disableBtnNew = () => {
    const findIndex = files.findIndex(item  => item.analysis_status === 'running');
    return findIndex >= 0;
  }

  // Return the following JSX
  return (
    <>
      <button
        className={classNames('btn-add-document', {'btn-disabled': disableBtnNew()})}
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
                <p 
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
                </p>
              )
            })}
          </div>
        }
      </div>}
    </>
  );
}
