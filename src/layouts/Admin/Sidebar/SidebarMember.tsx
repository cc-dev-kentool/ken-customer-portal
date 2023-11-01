import { useAppDispatch } from "hooks";
import { remove as removeAlert } from "store/actions/alert"
import classNames from "classnames";

// Define a function called "Sidebar" which receives a single parameter called "props"
export default function SidebarMember(props) {
  const { routeName, isShowFiles, isShowFullSidebar, setshowModalUplaod, setIsShowFiles } = props;

  const dispatch = useAppDispatch();

  // Define an array of file names
  const fileNames = [
    "TemplatePDF.pdf",
    "Sharefile.pdf",
    "Jerry2020-form.pdf",
  ]

  // Define a function called "handleShowFiles" that toggles the value of "isShowFiles"
  const handleShowFiles = () => {
    setIsShowFiles(!isShowFiles)
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

      <div className={classNames("main-menu", { "main-menu-extended": (isShowFiles && !isShowFullSidebar) })}>
        <p>
          <i
            className={`fa-solid fa-chevron-${isShowFiles ? 'up' : 'down'}`}
            onClick={handleShowFiles}
          />
          <span className="m-2 main-menu-title">Main</span>
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
    </>
  );
}
