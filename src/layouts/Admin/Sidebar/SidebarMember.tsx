import { useAppDispatch, useAppSelector } from "hooks";
import { remove as removeAlert } from "store/actions/alert"
import { labelDisplay } from "helpers/until";
import { ReactTooltip } from "components/Tooltip/ReactTooltip";
import { useEffect, useState } from "react";
import { getAnalysisData, getListFile } from "store/actions/analysis";
import { getListPrompt } from "store/actions/prompt"
import classNames from "classnames";;

// Define a function called "Sidebar" which receives a single parameter called "props"
export default function SidebarMember(props) {
  const { isShowFiles, isShowFullSidebar, setshowModalUplaod, setIsShowFiles, setDataAnalys } = props;

  const dispatch = useAppDispatch();

  const [files] = useAppSelector((state) => [
    state.analysis.listFile,
  ]);

  // Sets up side effect using async `getListUser()` action creator to fetch user settings from backend API
  useEffect(() => {
    dispatch(getListFile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [heightMenu, setHeightMenu] = useState<number>(window.innerHeight - 440)
  const [activeFile, setActiveFile] = useState<number>();

  // Define a function called "handleShowFiles" that toggles the value of "isShowFiles"
  const handleShowFiles = () => {
    setIsShowFiles(!isShowFiles)
  }

  useEffect(() => {
    window.addEventListener('resize', function () {
      setHeightMenu(window.innerHeight - 440);
    });
  }, []);

  const showDetailFile = (fileId) => {
    dispatch(getListPrompt());
    dispatch(getAnalysisData(fileId));
  }

  // Return the following JSX
  return (
    <>
      <button
        // className="btn-add-document"
        className={`btn-add-document`}
        onClick={() => {
          dispatch(removeAlert())
          setshowModalUplaod(true)
        }}
      >
        <i className="fa-regular fa-plus fs-1"></i><br />
        {isShowFullSidebar && <span>New Document</span>}
      </button>

      <div
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
            {files.map((file, index) => {
              return (
                <p className={classNames("mb-2", {"active-file" : index === activeFile})} key={file.uuid}>
                  <i className="fa-regular fa-file-lines m-2" style={{ color: "#26adc9" }}></i>
                  <span data-tooltip-id={`tooltip-1-${file.uuid}`} onClick={() => showDetailFile(file.uuid)}>
                    {file.file_name?.length > 16 ? labelDisplay(file.file_name, 16) : file.file_name}
                  </span>
                  {file.file_name?.length > 16 &&
                    <ReactTooltip
                      id={`tooltip-1-${file.uuid}`}
                      content={file.file_name}
                      widthTooltip={220}
                    />}
                  <i className="fa-solid fa-ellipsis icon-action"></i>
                </p>
              )
            })}
          </div>
        }
      </div>
    </>
  );
}
