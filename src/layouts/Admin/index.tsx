import { useAppSelector } from "hooks";
import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navmenu from "./Navmenu";
import Sidebar from "./Sidebar/Sidebar";
import "assets/css/app.css";
import "./style.css";

function AdminLayout(props) {
  // Destructure the necessary props from the "props" object
  const {
    routeName,
    children,
    setUrl,
    setShowChat,
    setIsShowFullChat,
    setShowPdf,
    setValueSearch,
  } = props;

  // Retrieve the value of "isLoading" from the app state using the useAppSelector hook
  const [isLoading] = useAppSelector((state) => [state.app.isLoading])

  // Declare a state variable called "isShowFullSidebar" and initialize it to "true"
  const [isShowFullSidebar, setIsShowFullSidebar] = useState<boolean>(true);

  // Define a function called "toggleMenu" that toggles the value of "isShowFullSidebar" when called.
  const toggleMenu = () => {
    setIsShowFullSidebar(!isShowFullSidebar);
  };

  return (
    // Render the admin layout UI
    <div className="wrapper">
      <Sidebar
        routeName={routeName}
        isShowFullSidebar={isShowFullSidebar}
        toggleMenu={toggleMenu}
        setUrl={setUrl}
        setShowChat={setShowChat}
        setIsShowFullChat={setIsShowFullChat}
        setShowPdf={setShowPdf}
        setValueSearch={setValueSearch}
      />
      <div className="main">
        <Navmenu
          isShowFullSidebar={isShowFullSidebar}
          toggleMenu={toggleMenu}
        />
        <main>
          <Backdrop
            sx={{ color: '#fff', zIndex: 99 }}
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
