import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "./Sidebar";
import Navmenu from "./Navmenu";
import RiskContent from "./RiskContent";
import PdfDocument from "./PdfDocument";
import ChatGPT from "./ChatGPT";
import classNames from "classnames";
import "assets/css/app.css";
import "./style.css";

// Define a function component named "Dashboard" which does not receive any parameters.
export function Dashboard() {

  // The useState hook is used here to define state variables.
  const [isShowFullSidebar, setIsShowFullSidebar] = useState<boolean>(true);
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
      <Sidebar isShowFullSidebar={isShowFullSidebar} toggleMenu={toggleMenu} setUrl={setUrl} setShowPdf={setShowPdf} />

      <div className="main">
        <Navmenu isShowFullSidebar={isShowFullSidebar} toggleMenu={toggleMenu} />

        <Row className="main-content">
          <Col lg={url && showPdf ? 7 : 12} className={classNames("", { 'main-risk': url })}>
            <RiskContent url={url} setValueSearch={setValueSearch} />
            <ChatGPT />
          </Col>
          <Col lg={url && showPdf ? 5 : 0}>
            {showPdf && <PdfDocument url={url} valueSearch={valueSearch} setShowPdf={setShowPdf} />}
          </Col>
        </Row>

      </div>
    </div>
  );
}

