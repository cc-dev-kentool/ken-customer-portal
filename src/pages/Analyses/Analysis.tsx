import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { getAnalysisData, getListFile } from "store/actions/analysis";
import { getConversation } from "store/actions/chatGpt";
import { getListPrompt } from "store/actions/prompt";
import generatePDF, { Margin } from 'react-to-pdf';
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
  const [currentStatus, setCurrentStatus] = useState<string>("");
  const [dataAnalysis, setDataAnalysis] = useState<object[]>([]);
  const [isShowFullChat, setIsShowFullChat] = useState<boolean>(false);
  const [fieldId, setFieldId] = useState<string>("");

  // The useAppSelector hook is used here to extract data from the Redux store state.
  // It returns an array containing the values of uploadPdf, dataAnalysis, and conversation.
  const [dataAnaly, conversation, getConversationSuccess] = useAppSelector((state) => [
    state.analysis.dataAnalysis,
    state.conversation.conversation,
    state.conversation.getConversationSuccess,
  ]);

  let runningTimeout: any = null;
  const queryStr = window.location.search

  useEffect(() => {
    if (queryStr.includes("fileId")) {
      const id = queryStr.slice(queryStr.indexOf("=") + 1);

      dispatch(getAnalysisData(id, true));
      setFieldId(id);
      dispatch(getListPrompt(false));

      if (runningTimeout) {
        clearTimeout(runningTimeout);
        runningTimeout = null;
      }
    }
  }, [queryStr])

  // The useEffect hook is used here to perform side effects after rendering.
  // It will run when the value of dataAnaly changes.
  useEffect(() => {
    if (fieldId == dataAnaly?.uuid) {

      const executionStatus = dataAnaly?.topic_executions?.[0].status

      setCurrentStatus(executionStatus)

      if (executionStatus === 'running' && !runningTimeout) {
        runningTimeout = setTimeout(() => {
          dispatch(getAnalysisData(fieldId));
        }, 3000);
      } else if (executionStatus === 'done') {
        dispatch(getListFile(false))
      }

      if (!url) {
        setUrl(dataAnaly.path)
      }
      setDataAnalysis(dataAnaly?.topic_executions?.[0].execution_details)
    }
  }, [dataAnaly])

  // Use the useEffect hook to run the provided callback when the isDowndLoad state changes
  useEffect(() => {
    if (isDowndLoad && getConversationSuccess) {
      const getTargetElement = () => document.getElementById('divToPrint');
      generatePDF(getTargetElement, { filename: 'page.pdf', page: { margin: Margin.MEDIUM } });
      setIsDowndLoad(false);
    }
  }, [isDowndLoad, getConversationSuccess]);

  // Define a function exportPDF that does the following:
  const exportPdf = () => {
    conversation.length === 0 && dispatch(getConversation(fieldId));
    setIsDowndLoad(true);
  }

  // This function handles showing the chat.
  const handleShowChat = () => {
    setShowChat(true);
    dispatch(getConversation(fieldId))
  }

  // Return JSX elements to render the dashboard.
  return (
    <AdminLayout
      routeName={props.routeName}
      setUrl={setUrl}
      setShowChat={setShowChat}
      setIsShowFullChat={setIsShowFullChat}
      setShowPdf={setShowPdf}
    >
      {dataAnalysis?.length > 0 ?
        <Row className="main-content">
          <Col lg={url && showPdf ? 7 : 12} className={classNames("default-risk", { 'main-risk': url })}>
            {dataAnalysis?.length > 0 && currentStatus === 'done' && (
              <i
                className="fa-solid fa-file-arrow-down fa-2xl icon-download-pdf"
                style={{ color: "#26ADC9" }}
                onClick={exportPdf}
              />
            )}
            {!showPdf &&
              <i
                className={
                  classNames("fa-regular fa-file-pdf fa-2xl icon-show-pdf", {
                    "icon-pdf-expand": isShowFullChat
                  })
                }
                style={{ color: "#26ADC9" }}
                onClick={() => setShowPdf(true)}
              />
            }
            <RiskContent
              showPdf={showPdf}
              showChat={showChat}
              dataAnalysis={dataAnalysis}
              currentStatus={currentStatus}
              isShowFullChat={isShowFullChat}
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
                  fileUploadId={fieldId}
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
        </Row> :
        <div className="analysis-index">
          <h1>Analyses</h1>
        </div>
      }

      {isDowndLoad &&
        <ExportPdf dataAnalysis={dataAnalysis} conversation={conversation} />
      }
    </AdminLayout>
  );
}

