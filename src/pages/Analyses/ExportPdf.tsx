import { statusRisk } from "constants/riskAnalysis";
import { Col, Row } from "react-bootstrap";

export default function ExportPdf(props) {

  // Destructuring props object to get dataAnalysis and conversation variables
  const { dataAnalysis, conversation } = props;

  // Define a function named "getStatusRisk" that takes a "status" parameter 
  // and returns a value from the "statusRisk" array based on the label
  const getStatusRisk = (status) => {
    return statusRisk.find(item => item.label === status)?.value;
  }

  const genComment = (data) => {
    if (data.topic === 'Readability') {
      return (
        <div>
          <span>Readability score for whole document: {data.comment["Readability score for whole document"]}</span> <br/>
          <span>Three worst clauses: </span>
          {data.comment["Three worst clauses"].length === 0 
            ? "N/A"
            : data.comment["Three worst clauses"].map((item, index) => (
              <><br /><span key={index} className="m-3"> - {item[`worst clause ${index+1}`]} ({item.score})</span></>
            ))
          }
        </div>
      );
    } else {
      return data.comment;
    }
  }

  // Return JSX elements
  return (
    <div id="divToPrint" style={{ overflow: "hidden", marginTop: "30px" }}>
      <h2 className="text-center">Data Analysis</h2>
      {/* Check if dataAnalysis array has items */}
      {dataAnalysis?.length > 0 &&
        <div className="table-content">
          {dataAnalysis.map((data) => {
            return (
              <div key={data.uuid} className="risk-content-item">
                <Row className="risk-content-item-topic mb-4">
                  <Col sm="10">
                    {data.analysis_result?.topic}
                  </Col>
                  <Col sm="2" className="text-end">
                    {getStatusRisk(data.analysis_status)}
                  </Col>
                </Row>
                <Row className="source-text m-0">
                  <Col sm="2" className="title-left p-0">Source Text</Col>
                  <Col sm="10" className="p-0">
                    {data?.analysis_result?.source_text?.map((text, index) => (
                      <p
                        key={text.key}
                        className="pt-2 mb-2"
                      >
                        {index >= 1 && <hr />}
                        {text.value === 'n/a' ? <p>n/a</p> : text.value}
                      </p>
                        
                    ))}
                  </Col>
                </Row>
                <Row className="mt-3 m-0">
                  <Col sm="2" className="title-left p-0">Comment</Col>
                  <Col sm="10" className="p-0">{genComment(data.analysis_result)}</Col>
                </Row>
              </div>
            )
          })}
        </div>
      }
      <h2 className="text-center mt-5">Data Chat</h2>
      <div className="conversation">
        {conversation?.map(item => {
          return (
            <div key={item.uuid}>
              <p className="question">
                <label className="question-content">{item.question}</label>
              </p>
              <p className="answer">
                <label className="answer-content">{item.answer}</label>
              </p>
            </div>
          )
        })}
      </div>
    </div>
  );
}
