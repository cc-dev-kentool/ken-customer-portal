import { statusRisk } from "constants/riskAnalysis";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import generatePDF, { Margin } from 'react-to-pdf';
import AnalysisProgress from "./AnalysisProgress";

// Define a function component named "RiskContent" and receive a single parameter called "props"
export default function RiskContent(props) {

  // Destructure the "url" and "setValueSearch" props from the "props" object
  const { dataAnalysis, topic, isDowndLoad, setTopic, setIsDowndLoad, setValueSearch } = props;

  const [isShowProgressBar, setIsShowProgressBar] = useState<boolean>(false);

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
    setValueSearch(text)
  }

  const exportPDf = () => {
    setIsDowndLoad(true);
  }

  useEffect(() => {
    if (isDowndLoad) {
      const getTargetElement = () => document.getElementById('divToPrint');
      generatePDF(getTargetElement, { filename: 'page.pdf', page: { margin: Margin.MEDIUM } })
      setIsDowndLoad(false);
    }
  }, [isDowndLoad])

  // Return the following JSX
  return (
    <div className="risk-content">
      <p className="title-risk">Risk Analysis Data</p>
      {Object.keys(dataAnalysis).length > 0 && (
        <i
          className="fa-solid fa-file-arrow-down fa-2xl icon-download-pdf"
          style={{ color: "#26ADC9" }}
          onClick={exportPDf}
        />
      )}
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
        <p className="text-right"></p>
        {isShowProgressBar && <AnalysisProgress />}
      </div>
      {dataAnalysis &&
        <div className="table-content" style={{height: `${isShowProgressBar ? '65%' : '88%'}`}}>
          {Object.keys(dataAnalysis).map((key) => {
            return (
              <div key={dataAnalysis[key].id} className="risk-content-item">
                <Row className="risk-content-item-topic mb-4">
                  <Col sm="10">
                    {dataAnalysis[key].topic}
                  </Col>
                  <Col sm="2" className="text-end">
                    {getStatusRisk(dataAnalysis[key].status)}
                    <i
                      className={`fa-solid fa-chevron-${getStatusShowTopic(dataAnalysis[key].topic) ? 'up' : 'down'}`}
                      onClick={() => handleShowTopic(dataAnalysis[key].topic)}
                    />
                  </Col>
                </Row>
                {getStatusShowTopic(dataAnalysis[key].topic) &&
                  <>
                    <Row className="source-text m-0">
                      <Col sm="2" className="title-left p-0">Source Text</Col>
                      <Col sm="10" className="p-0">
                        <p
                          className="pt-2 mb-2 cursor-pointer source-text-item"
                          onClick={() => handleSearch(dataAnalysis[key].source_text)}
                        >
                          {dataAnalysis[key].source_text}
                        </p>
                      </Col>
                    </Row>
                    <Row className="mt-3 m-0">
                      <Col sm="2" className="title-left p-0">Comment</Col>
                      <Col sm="10" className="p-0">{dataAnalysis[key].comment}</Col>
                    </Row>
                  </>}
              </div>
            )
          })}
        </div>
      }
    </div>
  );
}
