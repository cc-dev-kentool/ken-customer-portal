import { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "./Sidebar";
import Navmenu from "./Navmenu";
import RiskContent from "./RiskContent";
import PdfDocument from "./PdfDocument";
import ChatGPT from "./ChatGPT";
import classNames from "classnames";
import "./style.css";
import { useAppSelector } from "hooks";

// Define a function component named "Dashboard" which does not receive any parameters.
export function Dashboard() {

  const [
    isLoading
  ] = useAppSelector((state) => [
    state.app.isLoading
  ])

  // The useState hook is used here to define state variables.
  const [isShowFullSidebar, setIsShowFullSidebar] = useState<boolean>(true);
  const [isShowMaxHeight, setIsShowMaxHeight] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [showPdf, setShowPdf] = useState<boolean>(true);
  const [valueSearch, setValueSearch] = useState<string>("")

  // Define a function called "toggleMenu" that toggles the value of "isShowFullSidebar" when called.
  const toggleMenu = () => {
    setIsShowFullSidebar(!isShowFullSidebar);
  };

  // Return JSX elements to render the dashboard.
  return (
    <div className="wrapper">
      <Backdrop
        sx={{ color: '#fff', zIndex: 99999 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Sidebar
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

        {!isLoading && (
          <Row className="main-content">
            <Col lg={url && showPdf ? 7 : 12} className={classNames("", { 'main-risk': url })}>
              <RiskContent
                isShowMaxHeight={isShowMaxHeight}
                setValueSearch={setValueSearch}
              />
              <ChatGPT
                isShowMaxHeight={isShowMaxHeight}
                setIsShowMaxHeight={setIsShowMaxHeight}
              />
              {isShowMaxHeight &&
                <i
                  className="fa-solid fa-comment fa-2xl icon-chat"
                  onClick={() => setIsShowMaxHeight(false)}
                />
              }
            </Col>
            <Col lg={url && showPdf ? 5 : 0}>
              {showPdf &&
                <PdfDocument
                  url={url}
                  valueSearch={valueSearch}
                  setShowPdf={setShowPdf}
                />
              }
            </Col>
          </Row>
        )}
      </div>
    </div>
  );
}

