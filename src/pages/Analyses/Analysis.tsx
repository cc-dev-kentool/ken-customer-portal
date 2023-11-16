import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { getAnalysisData, getListFile } from "store/actions/analysis";
import { getConversation } from "store/actions/chatGpt";
import { getListPrompt } from "store/actions/prompt";
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

// This is the Analysis component which is exported as default.
export default function Analysis(props) {
  // The useAppDispatch hook returns the dispatch function of the Redux store.
  const dispatch = useAppDispatch();

  // The useState hook is used here to define state variables.
  const [url, setUrl] = useState<string>("");
  const [showPdf, setShowPdf] = useState<boolean>(true);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>("");
  const [isDowndLoad, setIsDowndLoad] = useState<boolean>(false);
  const [fileUploadId, setFileUploadId] = useState<string>("");
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [dataAnalysis, setDataAnalysis] = useState<object[]>([]);
  const [currentDocumentId, setCurrentDocumentId] = useState<string>("");
  const [isShowFullChat, setIsShowFullChat] = useState<boolean>(false);

  // The useAppSelector hook is used here to extract data from the Redux store state.
  // It returns an array containing the values of uploadPdf, dataAnalysis, and conversation.
  const [uploadId, dataAnaly, conversation] = useAppSelector((state) => [
    state.analysis.uploadPdf,
    state.analysis.dataAnalysis,
    state.conversation.conversation,
  ]);

  let runningTimeout: any = null;

  // The useEffect hook is used here to perform side effects after rendering.
  // It will run when the value of uploadId changes.
  useEffect(() => {
    if (uploadId) {
      setFileUploadId(uploadId)
      setCurrentDocumentId(uploadId)
    }
  }, [uploadId])

  // The useEffect hook is used here to perform side effects after rendering.
  // It will run when the value of dataAnaly changes.
  useEffect(() => {
    if (currentDocumentId == dataAnaly?.uuid) {

      const executionStatus = dataAnaly?.topic_executions?.[0].status

      setCurrentStatus(executionStatus)

      if (executionStatus === 'running' && !runningTimeout) {
        runningTimeout = setTimeout(() => {
          dispatch(getAnalysisData(fileUploadId));
        }, 3000);
      } else if (executionStatus === 'done') {
        setFileUploadId(dataAnaly.uuid);
        url !== dataAnaly.path && setUrl(dataAnaly.path)
        dispatch(getListFile(false))
      }

      setDataAnalysis(dataAnaly?.topic_executions?.[0].execution_details)
    }
  }, [dataAnaly])

  // The useEffect hook is used here to perform side effects after rendering.
  // It will run when the value of currentDocumentId changes.
  useEffect(() => {
    if (runningTimeout) {
      clearTimeout(runningTimeout);
      runningTimeout = null;
    }
    if (currentDocumentId) {
      setValueSearch("")
      setDataAnalysis([])
      dispatch(getListPrompt(false));
      dispatch(getAnalysisData(currentDocumentId, true));
    }
  }, [currentDocumentId])

  // This function handles showing the chat.
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
      setCurrentDocumentId={setCurrentDocumentId}
    >
      {dataAnalysis?.length > 0 &&
        <Row className="main-content">
          <Col lg={url && showPdf ? 7 : 12} className={classNames("default-risk", { 'main-risk': url })}>
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
              isShowFullChat={isShowFullChat}
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
                  isShowFullChat={isShowFullChat}
                  setShowChat={setShowChat}
                  setIsShowFullChat={setIsShowFullChat}
                />
              }
            </>}
          </Col>
          <Col lg={url && showPdf ? 5 : 0}>
            {showPdf &&
              <PdfDocument
                url={url}
                valueSearch={valueSearch}
                setShowPdf={setShowPdf}
                setValueSearch={setValueSearch}
              />
            }
          </Col>
        </Row>}
      {isDowndLoad &&
        <ExportPdf dataAnalysis={dataAnalysis} conversation={conversation} />
      }
    </AdminLayout>
  );
}

