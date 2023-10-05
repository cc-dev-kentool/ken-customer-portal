import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "./Sidebar";
import Navmenu from "./Navmenu";
import RiskContent from "./RiskContent";
import PdfDocument from "./PdfDocument";
import ChatGPT from "./ChatGPT";
import "assets/css/app.css";
import "./style.css";

// Define a function called "Dashboard" which receives a single parameter called "props"
export function Dashboard() {
  const [isShowFullSidebar, setIsShowFullSidebar] = useState(true);
  const [url, setUrl] = useState("");
  const [showPdf, setShowPdf] = useState(true);
  
  const toggleMenu = () => {
    setIsShowFullSidebar(!isShowFullSidebar);
  };

  // Return the following JSX
  return (
    <div className="wrapper">
      <Sidebar isShowFullSidebar={isShowFullSidebar} toggleMenu={toggleMenu} setUrl={setUrl} setShowPdf={setShowPdf}/>

      <div className="main">
        <Navmenu isShowFullSidebar={isShowFullSidebar} toggleMenu={toggleMenu}/>

        <Row className="main-content">
          <Col lg={url && showPdf ? 7 : 12} style={{marginRight: `${url && "-14px"}`}}>
            <RiskContent url={url}/>
            <ChatGPT />
          </Col>
          <Col lg={url && showPdf ? 5 : 0}>
            {showPdf && <PdfDocument url={url} setShowPdf={setShowPdf} />}
          </Col>
        </Row>

      </div>
    </div>
  );
}
