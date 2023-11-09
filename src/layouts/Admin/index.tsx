import { useAppSelector } from "hooks";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navmenu from "./Navmenu";
import Sidebar from "./Sidebar/Sidebar";
import "assets/css/app.css";
import "./style.css";

function AdminLayout(props) {

  const {
    routeName,
    children,
    setUrl,
    setShowPdf,
    setDataAnalysis,
    setShowChat,
  } = props;

  const [isLoading] = useAppSelector((state) => [state.app.isLoading])

  const [isShowFullSidebar, setIsShowFullSidebar] = useState<boolean>(true);

  // Define a function called "toggleMenu" that toggles the value of "isShowFullSidebar" when called.
  const toggleMenu = () => {
    setIsShowFullSidebar(!isShowFullSidebar);
  };

  return (
    <div className="wrapper">
      <Sidebar
        routeName={routeName}
        isShowFullSidebar={isShowFullSidebar}
        toggleMenu={toggleMenu}
        setUrl={setUrl}
        setShowPdf={setShowPdf}
        setDataAnalysis={setDataAnalysis}
        setShowChat={setShowChat}
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
            <CircularProgress color="inherit" />
          </Backdrop>
          {!isLoading && children}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
