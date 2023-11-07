import { statusRisk } from "constants/riskAnalysis";
import { Col, Row } from "react-bootstrap";

// Define a function component named "RiskContent" and receive a single parameter called "props"
export default function ExportPdf(props) {

  const { dataAnalysis } = props;

  // Define a function named "getStatusRisk" that takes a "status" parameter and returns a value from the "statusRisk" array based on the label
  const getStatusRisk = (status) => {
    return statusRisk.find(item => item.label === status)?.value;
  }

  // Return the following JSX
  return (
    <div id="divToPrint" style={{ overflow: "hidden", marginTop: "30px" }}>
      <h2 className="text-center">Data Analysis</h2>
      {dataAnalysis &&
        <div className="table-content">
          {Object.keys(dataAnalysis).map((key) => {
            return (
              <div key={dataAnalysis[key].id} className="risk-content-item">
                <Row className="risk-content-item-topic mb-4">
                  <Col sm="10">
                    {dataAnalysis[key].topic}
                  </Col>
                  <Col sm="2" className="text-end">
                    {getStatusRisk(dataAnalysis[key].status)}
                  </Col>
                </Row>
                <Row className="source-text m-0">
                  <Col sm="2" className="title-left p-0">Source Text</Col>
                  <Col sm="10" className="p-0">
                    <p className="pt-2 mb-2 cursor-pointer source-text-item" >
                      {dataAnalysis[key].source_text}
                    </p>
                  </Col>
                </Row>
                <Row className="mt-3 m-0">
                  <Col sm="2" className="title-left p-0">Comment</Col>
                  <Col sm="10" className="p-0">{dataAnalysis[key].comment}</Col>
                </Row>
              </div>
            )
          })}
        </div>
      }
    </div>
  );
}
