import { statusRisk, topicCommentArr } from "constants/riskAnalysis";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { progressText, progressTextReadability } from "helpers/until";
import AnalysisProgress from "./AnalysisProgress";
import classNames from "classnames";

// Define a function component named "RiskContent" and receive a single parameter called "props"
export default function RiskContent(props) {
  // Destructure the "url" and "setValueSearch" props from the "props" object
  const {
    showPdf,
    showChat,
    dataAnalysis,
    currentStatus,
    isShowFullChat,
    setValueSearch,
  } = props;

  const [isShowProgressBar, setIsShowProgressBar] = useState<boolean>(false);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);

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
    itemText?.trim() ? setValueSearch(itemText) : setValueSearch(text);
    setIsSelecting(false)
  }

  // Use the useEffect hook to run the provided callback when the currentStatus state changes
  useEffect(() => {
    if (currentStatus === 'running') {
      setIsShowProgressBar(true);
    }
    if (currentStatus === 'done') {
      setIsShowProgressBar(false);
    }
  }, [currentStatus]);

  const genComment = (data) => {
    const topicName = data.topic;

    const emtyValue = typeof data.comment["Three worst clauses"] == "string" || data.comment["Three worst clauses"]?.length === 0

    if (topicName === 'Readability') {
      return (
        <div>
          <span>Readability score for whole document: {data.comment["Readability score for whole document"]}</span> <br />
          <span>Three worst clauses: </span>
          {emtyValue
              ? "N/A"
              : <ul>
                {data.comment["Three worst clauses"]?.map((item, index) => (
                  <li key={index} className="item-comment">{progressTextReadability(item.clause)} ({item.score})</li>
                ))}
              </ul>
          }
        </div>
      );
    }

    if (topicName === 'Unused definitions') {
      if (typeof data.comment === "string") {
        return data.comment
      } else {
        return (
          <div>
          <span>{data.comment["key"]}: </span>
          {data.comment["value"]?.map((item, index) => {
            return <>
              <br />
              <span key={index}>- {item}</span>
            </>
          })}
        </div>
        )
      }
    }

    if (!topicCommentArr.includes(topicName)) {
      return data.comment;
    } else if (!data.comment["has_identical_clause"] || typeof data.comment["value"] === "string") {
      return data.comment["value"];
    } else {
      return (
        <div>
          <span>{data.comment["key"]}: </span>
          {data.comment["value"]?.map((item, index) => {
            return <>
              <br />
              <span key={index}>- {item}</span>
            </>
          })}
        </div>
      )
    }
  }

  const checkSourceText = (text) => {
    if (text === 'n/a' || text === 'No clause text found.') {
      return false;
    }
    return true;
  }

  const checkSourceHasValue = (text) => {
    if (text && text.trim().toLowerCase() !== 'n/a') {
      return true;
    }
    return false;
  }

  const getCursorClassName = () => (isSelecting ? 'cursor-text' : 'cursor-pointer');

  // Return the following JSX
  return (
    <div className={classNames("risk-content", { "full-height": !showChat, "min-height": isShowFullChat })}>
      <p className="title-risk">Risk Analysis Data</p>
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
            {isShowProgressBar &&
              <AnalysisProgress
                showPdf={showPdf}
                dataTopics={dataAnalysis}
                currentStatus={currentStatus}
              />
            }
          </div>
          <div className={classNames("table-content", {
            "tb-content-middle": !showChat && isShowProgressBar,
            "tb-content-medium": showChat && !isShowProgressBar,
            "tb-content-min": showChat && isShowProgressBar,
          })}>
            {dataAnalysis.map((data) => {
              if (data.executed_status === 'success') {
                return (
                  <div key={data.uuid} className="risk-content-item">
                    <Row className="risk-content-item-topic">
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
                          <Col sm="2" className="title-left p-0 pt-4 pb-2">Source Text</Col>
                          <Col
                            sm="10"
                            className={`area-source-text ${getCursorClassName()}`}
                            onMouseUp={() => handleSearch("")}
                            onMouseDown={() => setIsSelecting(true)}
                          >
                            {data.analysis_result.source_text?.map((text, index) => {
                              if (checkSourceHasValue(text)) return <div key={index}>
                                {index >= 1 && <hr />}
                                <p
                                  className={classNames('', { 'source-text-item': checkSourceText(text) })}
                                  onClick={() => checkSourceText(text) && handleSearch(text)}
                                >
                                  {progressText(text)}
                                </p>
                              </div>
                            })}
                          </Col>
                        </Row>
                        <Row className="mt-3 m-0">
                          <Col sm="2" className="title-left p-0">Comment</Col>
                          <Col sm="10" className="content-comment">{genComment(data.analysis_result)}</Col>
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
