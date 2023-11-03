import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { add as addAlert, remove as removeAlert } from "store/actions/alert"
import { code } from "constants/error";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import RiskContent from "./RiskContent";
import PdfDocument from "./PdfDocument";
import ChatGPT from "./ChatGPT";
import classNames from "classnames";
import AdminLayout from "layouts/Admin";
import ExportPdf from "./ExportPdf";
import "./style.css";

// Define a function component named "Dashboard" which does not receive any parameters.
export default function Analysis(props) {
  const dispatch = useAppDispatch();

  const [filePath] = useAppSelector((state) => [
    state.analysis.filePath
  ]);
  // The useState hook is used here to define state variables.
  const [url, setUrl] = useState<string>("");
  const [showPdf, setShowPdf] = useState<boolean>(true);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [positionChat, setPositionChat] = useState<boolean>(true);
  const [isDowndLoad, setIsDowndLoad] = useState<boolean>(false);
  const [isJump, setIsJump] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0)

  // Define a state variable named "topic" using the useState hook with an initial value of an array of objects
  const [topic, setTopic] = useState<Array<object>>([
    { name: 'Governing law', isShow: true },
    { name: 'Court jurisdiction', isShow: true },
    { name: 'Arbitration', isShow: true },
    { name: 'Court jurisdiction and arbitration clause interaction', isShow: true },
    { name: 'War', isShow: true },
    { name: 'Communicable disease', isShow: true },
    { name: 'NCBR', isShow: true },
    { name: 'Cyber', isShow: true },
    { name: 'Sanctions', isShow: true },
    { name: 'RUB', isShow: true },
    { name: 'Unused definitions', isShow: true },
    { name: 'Readability', isShow: true },
  ]);

  const [dataAnalysis] = useAppSelector((state) => [
    state.analysis.dataAnalysis
  ]);

  useEffect(() => {
    if (!dataAnalysis) {
      dispatch(addAlert(code["502"], "danger"))
      setTimeout(() => dispatch(removeAlert()), 5000)
    }
  }, [dataAnalysis])

  const handleJump = () => {
    setIsJump(true)
    setPageNumber(5)
  }

  // Return JSX elements to render the dashboard.
  return (
    <AdminLayout
      routeName={props.routeName}
      showPdf={showPdf}
      setUrl={setUrl}
      setShowPdf={setShowPdf}
      setPositionChat={setPositionChat}
    >
      <Row className="main-content">
        <Col lg={url && showPdf ? 7 : 12} className={classNames("default-risk", { 'main-risk': url })}>
          {/* <button onClick={handleJump}>Jump to page</button> */}
          <RiskContent
            dataAnalysis={dataAnalysis}
            topic={topic}
            isDowndLoad={isDowndLoad}
            setTopic={setTopic}
            setIsDowndLoad={setIsDowndLoad}
            setValueSearch={setValueSearch}
          />
          <ChatGPT
            isShowPDF={showPdf}
            isShowFullSidebar={positionChat}
          />
        </Col>
        <Col lg={url && showPdf ? 5 : 0}>
          {showPdf &&
            <PdfDocument
              url={url}
              isJump={isJump}
              pageNumber={pageNumber}
              valueSearch={valueSearch}
              setShowPdf={setShowPdf}
              setIsJump={setIsJump}
            />
          }
        </Col>
      </Row>
      {isDowndLoad &&
        <ExportPdf topic={topic} dataAnalysis={dataAnalysis} />
      }
    </AdminLayout>
  );
}

