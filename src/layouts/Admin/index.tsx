import { useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Progressbar from "components/Progress/ProgressBar";
import Navmenu from "./Navmenu";
import Sidebar from "./Sidebar/Sidebar";
import "assets/css/app.css";
import "./style.css";

function AdminLayout(props) {

  const { routeName, showPdf, children, setUrl, setShowPdf, setPositionChat } = props;

  const [isLoading] = useAppSelector((state) => [state.app.isLoading])

  const [isShowFullSidebar, setIsShowFullSidebar] = useState<boolean>(true);
  const [currentStatus, setCurrentStatus] = useState<string>("upload")

  // Define a function called "toggleMenu" that toggles the value of "isShowFullSidebar" when called.
  const toggleMenu = () => {
    setIsShowFullSidebar(!isShowFullSidebar);
    routeName == 'analytics' && setPositionChat(!isShowFullSidebar)
  };

  const status = ['upload', 'analytics', 'done'];

  useEffect(() => {
    setTimeout(() => {
      setCurrentStatus(status[2])
    }, 5000)
  })

  return (
    <div className="wrapper">
      <Sidebar
        routeName={routeName}
        isShowFullSidebar={isShowFullSidebar}
        toggleMenu={toggleMenu}
        setUrl={setUrl}
        setShowPdf={setShowPdf}
      />
      <div className="main">
        <Navmenu
          isShowFullSidebar={isShowFullSidebar}
          toggleMenu={toggleMenu}
        />
        <main>
          <Backdrop
            sx={{ color: '#fff', zIndex: 2 }}
            open={isLoading}
          >
            {showPdf ?
              <Progressbar currentStatus={currentStatus} />
              : <CircularProgress color="inherit" />}
          </Backdrop>
          {!isLoading && children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
