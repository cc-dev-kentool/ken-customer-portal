import { statusRisk } from "constants/riskAnalysis";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useAppDispatch } from "hooks";
import { getConversation } from "store/actions/chatGpt";
import { add as addAlert, remove } from "store/actions/alert"
import generatePDF, { Margin } from 'react-to-pdf';
import AnalysisProgress from "./AnalysisProgress";
import classNames from "classnames";

// Define a function component named "RiskContent" and receive a single parameter called "props"
export default function RiskContent(props) {
  const dispatch = useAppDispatch();

  // Destructure the "url" and "setValueSearch" props from the "props" object
  const {
    fileUploadId,
    showChat,
    dataAnalysis,
    currentStatus,
    isDowndLoad,
    isShowFullChat,
    setIsDowndLoad,
    setValueSearch,
  } = props;

  const [isShowProgressBar, setIsShowProgressBar] = useState<boolean>(false);

  // Define a state variable named "topic" using the useState hook with an initial value of an array of objects
  const [topic, setTopic] = useState<Array<object>>([
    { name: 'RUB', isShow: true },
    { name: 'Sanctions', isShow: true },
    { name: 'Cyber', isShow: true },
    { name: 'NCBR', isShow: true },
    { name: 'Communicable disease', isShow: true },
    { name: 'War', isShow: true },
    { name: 'Governing law', isShow: true },
    { name: 'Unused definitions', isShow: true },
    { name: 'Court jurisdiction', isShow: true },
    { name: 'Arbitration', isShow: true },
    { name: 'Interaction between court jurisdiction and arbitration', isShow: true },
    { name: 'Readability', isShow: true },
  ]);

  // Sort the "dataAnalysis" array based on the "topic_order" property of each element
  dataAnalysis.sort(function (a, b) {
    if (a.topic_order < b.topic_order) {
      return -1;
    }
    if (a.topic_order > b.topic_order) {
      return 1;
    }
    return 0;
  });

  // Define a function named "getStatusRisk" that takes a "status" parameter and returns a value from the "statusRisk" array based on the label
  const getStatusRisk = (status) => {
    return statusRisk.find(item => item.label === status)?.value;
  }

  // Define a function named "getStatusShowTopic" that takes a "name" parameter and returns the "isShow" property from the "topic" array based on the topic name
  const getStatusShowTopic = (name) => {
    return topic.find(item => item['name'] === name)?.['isShow'];
  }

  // Define a function named "handleShowTopic" that takes a "name" parameter and updates the "isShow" property of the corresponding topic in the "topic" state
  const handleShowTopic = (name) => {
    let newTopic = [...topic];
    const findIndex = topic.findIndex(item => item['name'] === name);

    newTopic[findIndex]['isShow'] = !newTopic[findIndex]['isShow'];

    setTopic(newTopic);
  }

  // Define a function named "handleSearch" that takes a "text" parameter and calls the "setValueSearch" prop with the provided text
  const handleSearch = (text) => {

    const itemText = window.getSelection()?.toString().trim();

    let isInSourceText = false;
    dataAnalysis.map(data => {
      data.analysis_result.source_text?.map(item => {
        const sourceText = item.value?.replace(/\s+/g, '')
        const selectedText = itemText?.replace(/\s+/g, '')
        if (sourceText.includes(selectedText)) {
          isInSourceText = true;
        }
      })
    })

    if (isInSourceText) {
      itemText?.trim() ? setValueSearch(itemText) : setValueSearch(text);
    }
  }

  // Define a function exportPDF that does the following:
  const exportPdf = () => {
    dispatch(getConversation(fileUploadId));
    setIsDowndLoad(true);
  }

  // Use the useEffect hook to run the provided callback when the isDowndLoad state changes
  useEffect(() => {
    if (isDowndLoad) {
      const getTargetElement = () => document.getElementById('divToPrint');
      generatePDF(getTargetElement, { filename: 'page.pdf', page: { margin: Margin.MEDIUM } });
      setIsDowndLoad(false);
    }
  }, [isDowndLoad]);

  // Use the useEffect hook to run the provided callback when the currentStatus state changes
  useEffect(() => {
    if (currentStatus === 'running') {
      setIsShowProgressBar(true);
    }
    if (currentStatus === 'done') {
      setIsShowProgressBar(false);
    }
  }, [currentStatus]);

  // Define a function getHeightRiskContent that calculates and returns the height value based on conditions
  const getHeightRiskContent = () => {
    let height: number;
    if (isShowProgressBar) {
      height = showChat ? 18 : 47;
    } else {
      height = showChat ? 43 : 72;
    }
    return height;
  }

  const genComment = (data) => {
    if (data.topic === 'Readability') {
      return (
        <div>
          <span>Readability score for whole document: {data.comment["Readability score for whole document"]}</span> <br />
          <span>Three worst clauses: </span>
          {data.comment["Three worst clauses"].length === 0
            ? "N/A"
            : <ul>
              {data.comment["Three worst clauses"].map((item, index) => (
                <li key={index} className="item-comment">{item[`worst clause ${index + 1}`]} ({item.score})</li>
              ))}
            </ul>
          }
        </div>
      );
    } else {
      return data.comment;
    }
  }

  const checkSourceText = (text) => {
    if (text === 'n/a' || text === 'No clause text found.') {
      return false;
    }
    return true;
  }

  // Return the following JSX
  return (
    <div className={classNames("risk-content", { "full-height": !showChat, "min-height": isShowFullChat })}>
      <p className="title-risk">Risk Analysis Data</p>
      {dataAnalysis?.length > 0 && currentStatus === 'done' && (
        <i
          className="fa-solid fa-file-arrow-down fa-2xl icon-download-pdf"
          style={{ color: "#26ADC9" }}
          onClick={exportPdf}
        />
      )}

      {dataAnalysis?.length > 0 &&
        <>
          <div className='analysis-progress'>
            <Row className="risk-content-item-topic m-2">
              <Col sm={10}>
                Progress bar
              </Col>
              <Col sm={2} className="text-end">
                <i
                  className={`fa-solid fa-chevron-${isShowProgressBar ? 'up' : 'down'}`}
                  onClick={() => setIsShowProgressBar(!isShowProgressBar)}
                />
              </Col>
            </Row>
            {isShowProgressBar && <AnalysisProgress dataTopics={dataAnalysis} currentStatus={currentStatus} />}
          </div>
          <div className="table-content" onMouseUp={() => handleSearch("")} style={{ height: `${getHeightRiskContent()}vh` }}>
            {dataAnalysis.map((data) => {
              if (data.executed_status === 'success') {
                return (
                  <div key={data.uuid} className="risk-content-item">
                    <Row className="risk-content-item-topic mb-4">
                      <Col sm="10">
                        {data.analysis_result?.topic}
                      </Col>
                      <Col sm="2" className="text-end">
                        {getStatusRisk(data.analysis_status)}
                        <i
                          className={`fa-solid fa-chevron-${getStatusShowTopic(data.analysis_result?.topic) ? 'up' : 'down'}`}
                          onClick={() => handleShowTopic(data.analysis_result?.topic)}
                        />
                      </Col>
                    </Row>
                    <Row className="d-none">
                      {data.chatgpt_result}
                    </Row>
                    {getStatusShowTopic(data.analysis_result?.topic) &&
                      <>
                        <Row className="source-text m-0">
                          <Col sm="2" className="title-left p-0">Source Text</Col>
                          <Col sm="10" className="p-0">
                            {data.analysis_result.source_text?.map((text, index) => {
                              return <p
                                key={text.key}
                                className={classNames('pt-2 mb-2', { 'cursor-pointer source-text-item': checkSourceText(text.value) })}
                                onClick={() => checkSourceText(text.value) && handleSearch(text.value)}
                              >
                                {index >= 1 && <hr />}
                                {text.value}
                              </p>
                            })}
                          </Col>
                        </Row>
                        <Row className="mt-3 m-0">
                          <Col sm="2" className="title-left p-0">Comment</Col>
                          <Col sm="10" className="p-0">{genComment(data.analysis_result)}</Col>
                        </Row>
                      </>}
                  </div>
                )
              }
            })}
          </div>
        </>
      }
    </div>
  );
}
