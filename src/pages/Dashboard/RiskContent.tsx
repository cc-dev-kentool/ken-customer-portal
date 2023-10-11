import { statusRisk } from "constants/riskAnalysis";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useAppSelector } from "hooks";

// Define a function component named "RiskContent" and receive a single parameter called "props"
export default function RiskContent(props) {
  // Destructure the "url" and "setValueSearch" props from the "props" object
  const { setValueSearch } = props;

  const [dataAnalysis] = useAppSelector((state) => [
    state.analysis.dataAnalysis
  ]);

  // Define a state variable named "topic" using the useState hook with an initial value of an array of objects
  const [topic, setTopic] = useState<Array<object>>([
    { name: 'Governing law', isShow: true },
    { name: 'Court jurisdiction', isShow: true },
    { name: 'Arbitration', isShow: true },
    { name: 'Interaction between court jurisdiction and arbitration', isShow: true },
    { name: 'War', isShow: true },
    { name: 'Communicable disease', isShow: true },
    { name: 'NCBR', isShow: true },
    { name: 'Cyber', isShow: true },
    { name: 'Sanctions', isShow: true },
    { name: 'RUB', isShow: true },
    { name: 'Unused definitions', isShow: true },
    { name: 'Readability', isShow: true },
  ]);

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

  // Return the following JSX
  return (
    <div className="risk-content">
      <p className="title-risk">Risk Analysis Data</p>
      {dataAnalysis &&
        <div className="table-content">
          {dataAnalysis.map((item) => {
            return (
              <div key={item.id} className="risk-content-item">
                <Row className="risk-content-item-topic mb-4">
                  <Col sm="10">
                    {item.topic}
                  </Col>
                  <Col sm="2" className="text-end">
                    {getStatusRisk(item.status)}
                    <i
                      className={`fa-solid fa-chevron-${getStatusShowTopic(item.topic) ? 'up' : 'down'}`}
                      onClick={() => handleShowTopic(item.topic)}
                    />
                  </Col>
                </Row>
                {getStatusShowTopic(item.topic) &&
                  <>
                    <Row className="source-text m-0">
                      <Col sm="2" className="title-left p-0">Source Text</Col>
                      <Col sm="10" className="p-0">
                        <p
                          className="pt-2 mb-2 cursor-pointer source-text-item"
                          onClick={() => handleSearch(item.source_text)}
                        >
                          {item.source_text}
                        </p>
                      </Col>
                    </Row>
                    <Row className="mt-3 m-0">
                      <Col sm="2" className="title-left p-0">Comment</Col>
                      <Col sm="10" className="p-0">{item.comment}</Col>
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
