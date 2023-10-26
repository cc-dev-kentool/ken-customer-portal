import { useState } from "react";;
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RiskContent from "./RiskContent";
import PdfDocument from "./PdfDocument";
import ChatGPT from "./ChatGPT";
import classNames from "classnames";
import AdminLayout from "layouts/Admin";
import "./style.css";

// Define a function component named "Dashboard" which does not receive any parameters.
export function Dashboard(props) {

  // The useState hook is used here to define state variables.
  const [url, setUrl] = useState<string>("");
  const [showPdf, setShowPdf] = useState<boolean>(true);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [positionChat, setpositionChat] = useState<boolean>(true);

  // Return JSX elements to render the dashboard.
  return (
    <AdminLayout
      routeName={props.routeName}
      showPdf={showPdf}
      setUrl={setUrl}
      setShowPdf={setShowPdf}
      setpositionChat={setpositionChat}
    >
      <Row className="main-content">
        <Col lg={url && showPdf ? 7 : 12} className={classNames("", { 'main-risk': url })}>
          <RiskContent setValueSearch={setValueSearch} />
          <ChatGPT
            isShowPDF={showPdf}
            isShowFullSidebar={positionChat}
          />
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
    </AdminLayout>
  );
}

