import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Sidebar from "./Sidebar";
import Navmenu from "./Navmenu";
import RiskContent from "./RiskContent";
import PdfDocument from "./PdfDocument";
import "assets/css/app.css";
import "./style.css";
import ChatGPT from "./ChatGPT";

// Define a function called "Dashboard" which receives a single parameter called "props"
export function Dashboard() {
  const [isShowMenu, setIsShowMenu] = useState(true);
  const [url, setUrl] = useState("");
  
  const toggleMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  // Return the following JSX
  return (
    <div className="wrapper">
      <Sidebar isShowMenu={isShowMenu} toggleMenu={toggleMenu} setUrl={setUrl}/>

      <div className="main">
        <Navmenu isShowMenu={isShowMenu} toggleMenu={toggleMenu}/>

        <Row className="main-content">
          <Col lg={url ? 7 : 12} style={{marginRight: `${url && "-14px"}`}}>
            <RiskContent url={url}/>
            <ChatGPT />
          </Col>
          <Col lg={url ? 5 : 0}>
            <PdfDocument url={url}  />
          </Col>
        </Row>

      </div>
    </div>
  );
}
