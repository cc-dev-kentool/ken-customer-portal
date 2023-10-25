import { useAppSelector } from "hooks";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Sidebar from "./Sidebar";
import Navmenu from "./Navmenu";
import "assets/css/app.css";
import "./style.css";

function AdminLayout(props) {

  const { routeName, children, setUrl, setShowPdf, setpositionChat } = props;

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const [isShowFullSidebar, setIsShowFullSidebar] = useState<boolean>(true);
  const [isLoading] = useAppSelector((state) => [state.app.isLoading])

  // Define a function called "toggleMenu" that toggles the value of "isShowFullSidebar" when called.
  const toggleMenu = () => {
    setIsShowFullSidebar(!isShowFullSidebar);
    routeName == 'dashboard' && setpositionChat(!isShowFullSidebar)
  };

  return (
    <div className="wrapper">
      <Sidebar
        routeName={routeName}
        user={user}
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
            sx={{ color: '#fff', zIndex: 99999 }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {!isLoading && children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
