import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { getAnalysisData, getListFile } from "store/actions/analysis";
import { getConversation } from "store/actions/chatGpt";
import { Splitter, SplitterPanel } from 'primereact/splitter';
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
  const [showChat, setShowChat] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [isDowndLoad, setIsDowndLoad] = useState<boolean>(false);
  const [isJump, setIsJump] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [fileUploadId, setFileUploadId] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [dataAnalysis, setDataAnalysis] = useState([]);

  const [uploadPdf, dataAnaly, conversation] = useAppSelector((state) => [
    state.analysis.uploadPdf,
    state.analysis.dataAnalysis,
    state.conversation.conversation,
  ]);

  useEffect(() => {
    if (uploadPdf) {
      setFileUploadId(uploadPdf)
    }
  }, [uploadPdf])

  useEffect(() => {
    if (dataAnaly?.uuid) {
      setCurrentStatus(dataAnaly?.topic_executions?.[0].status)
      if (dataAnaly?.topic_executions?.[0].status === 'running') {
        setTimeout(() => {
          dispatch(getAnalysisData(fileUploadId));
        }, 5000);
      }
      if (dataAnaly?.topic_executions?.[0].status === 'done') {
        setFileUploadId(dataAnaly.uuid);
        url !== dataAnaly.path && setUrl(dataAnaly.path)
        dispatch(getListFile())
      }
      setDataAnalysis(dataAnaly?.topic_executions?.[0].execution_details)
    }
  }, [dataAnaly])

  const handleJump = () => {
    setIsJump(true)
    setPageNumber(5)
  }

  const handleShowChat = () => {
    setShowChat(true);
    dispatch(getConversation(fileUploadId))
  }

  // Return JSX elements to render the dashboard.
  return (
    <AdminLayout
      routeName={props.routeName}
      setUrl={setUrl}
      setShowPdf={setShowPdf}
      setDataAnalysis={setDataAnalysis}
      setShowChat={setShowChat}
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
          {/*
            <Splitter style={{ height: '89vh' }} layout="vertical">
              <SplitterPanel className="flex align-items-center justify-content-center mb-2 bg-white">Panel 1</SplitterPanel>
              <SplitterPanel className="flex align-items-center justify-content-center bg-white">Panel 2</SplitterPanel>
            </Splitter>
          */}
          <RiskContent
            fileUploadId={fileUploadId}
            showChat={showChat}
            dataAnalysis={dataAnalysis}
            currentStatus={currentStatus}
            isDowndLoad={isDowndLoad}
            setIsDowndLoad={setIsDowndLoad}
            setValueSearch={setValueSearch}
          />
          {currentStatus && currentStatus !== 'running' && <>
            {!showChat
              ? <i
                className="fa-solid fa-message fa-2xl icon-chat"
                onClick={handleShowChat}
              />
              : <ChatGPT
                showChat={showPdf}
                fileUploadId={fileUploadId}
                setShowChat={setShowChat}
              />
            }
          </>}
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
        <ExportPdf dataAnalysis={dataAnalysis} conversation={conversation} />
      }
    </AdminLayout>
  );
}

