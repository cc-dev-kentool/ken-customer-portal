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

  const [styles, setStyles] = useState<any>({ background: "#F2F2F2" });
  const [isShowMenu, setIsShowMenu] = useState(true);
  const [url, setUrl] = useState("");
  
  const toggleMenu = () => {
    setIsShowMenu(!isShowMenu);
    setStyles(
      !isShowMenu
        ? { background: "#F2F2F2" }
        : { background: "#F2F2F2", overflowX: "auto" }
    );
  };

  // Return the following JSX
  return (
    <div className="wrapper">
      <Sidebar isShowMenu={isShowMenu} toggleMenu={toggleMenu} setUrl={setUrl}/>

      <div className="main" style={styles}>
        <Navmenu isShowMenu={isShowMenu} toggleMenu={toggleMenu}/>

        <Row className="bg-transparent">
          <Col lg={url ? 7 : 12}>
            <RiskContent />
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
