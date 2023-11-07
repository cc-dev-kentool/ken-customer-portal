import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { add as addAlert, remove as removeAlert } from "store/actions/alert"
import { code } from "constants/error";
import { getAnalysisData } from "store/actions/analysis";
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

  // The useState hook is used here to define state variables.
  const [url, setUrl] = useState<string>("");
  const [showPdf, setShowPdf] = useState<boolean>(true);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [positionChat, setPositionChat] = useState<boolean>(true);
  const [isDowndLoad, setIsDowndLoad] = useState<boolean>(false);
  const [isJump, setIsJump] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [fileUploadId, setFileUploadId] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<string>("");

  const [uploadPdf, dataAnaly] = useAppSelector((state) => [
    state.analysis.uploadPdf,
    state.analysis.dataAnalysis,
  ]);

  useEffect(() => {
    if (uploadPdf) {
      setFileUploadId(uploadPdf)
    }
  }, [uploadPdf])

  console.log("dataAnaly", dataAnaly)
  useEffect(() => {
    if (dataAnaly?.uuid) {
      setCurrentStatus(dataAnaly?.topic_executions?.[0].status)
      // if (dataAnaly?.topic_executions?.[0].status === 'running') {
      //   setTimeout(() => {
      //     dispatch(getAnalysisData(fileUploadId));
      //   }, 5000);
      // }
    }
  }, [dataAnaly])

  const handleJump = () => {
    setIsJump(true)
    setPageNumber(5)
  }

  const dataAnalysis = [];

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
          {!showPdf &&
            <i
              className="fa-regular fa-file-pdf fa-2xl icon-show-pdf"
              style={{ color: "#26ADC9" }}
              onClick={() => setShowPdf(true)}
            />
          }
          <RiskContent
            dataAnalysis={dataAnalysis}
            currentStatus={currentStatus}
            isDowndLoad={isDowndLoad}
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
        <ExportPdf dataAnalysis={dataAnalysis} />
      }
    </AdminLayout>
  );
}

