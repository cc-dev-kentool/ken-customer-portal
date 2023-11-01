import { useAppDispatch } from "hooks";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminLayout from "layouts/Admin";
import ProgressCircle from "components/Progress/ProgressCircle";
import "./style.css";

// Define a function component named "Dashboard" which does not receive any parameters.
export function Dashboard(props) {
  const dispatch = useAppDispatch();

  // Return JSX elements to render the dashboard.
  return (
    <AdminLayout routeName={props.routeName}>
      <div className="dashboard">
        <Row className="content-db">
          <Col md={6}>
            <div className="left-content">
              <Row>
                <Col>
                  <p className="icon-users">
                    <i className="fa-solid fa-user-clock fa-2xl"></i>
                    <span className="label">Users</span>
                  </p>
                </Col>
                <Col>
                  <p className="icon-rotata"><i className="fa-solid fa-rotate fa-2xl"></i></p>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <ProgressCircle
                    progress={85}
                    strokeColor="#5cc200"
                    classIndicator="indicator-left"
                    label="Logined User"
                  />
                </Col>
                <Col sm={6}>
                  <ProgressCircle
                    progress={60}
                    strokeColor="#5cc200"
                    classIndicator="indicator-left"
                    label="Analyzed Document User"
                  />
                </Col>
              </Row>
            </div>
            <div className="tt-report">
              <p>Total Users <span className="value-report">1000</span></p>
            </div>
            <div className="tt-report">
              <p>Logined <span className="value-report">850</span></p>
              <p>Analyzed <span className="value-report">600</span></p>
            </div>
          </Col>
          <Col md={6}>
            <div className="right-content">
              <Row >
                <Col>
                  <p className="icon-users">
                    <i className="fa-solid fa-file-contract fa-2xl"></i>
                    <span className="label">Contracts</span>
                  </p>
                </Col>
                <Col>
                  <p className="icon-rotata"><i className="fa-solid fa-rotate fa-2xl"></i></p>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <ProgressCircle
                    progress={50}
                    strokeColor="#ff543a"
                    classIndicator="indicator-right"
                    label="Chat usage"
                  />
                </Col>
                <Col sm={6}>
                  <ProgressCircle
                    progress={10}
                    strokeColor="#ff543a"
                    classIndicator="indicator-right"
                    label="Question mark"
                  />
                </Col>
              </Row>
            </div>
            <div className="tt-report">
              <p>Total Contracts <span className="value-report">2000</span></p>
            </div>
            <div className="tt-report">
              <p>Chat usage <span className="value-report">1000</span></p>
              <p>Question mark <span className="value-report">200</span></p>
            </div>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
}

