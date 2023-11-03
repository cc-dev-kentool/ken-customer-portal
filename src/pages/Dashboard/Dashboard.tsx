import { useAppDispatch } from "hooks";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminLayout from "layouts/Admin";
import ProgressCircle from "components/Progress/ProgressCircle";
import ReactApexChart from 'react-apexcharts';
import "./style.css";

// Define a function component named "Dashboard" which does not receive any parameters.
export function Dashboard(props) {
  const dispatch = useAppDispatch();

  const labels = [
    'Court jurisdiction',
    'Governing law',
    'Arbitration',
    'War',
    'Unused definitions',
    'Sanctions',
    'Readability',
    'RUB',
    'Interaction between court jurisdiction and arbitration',
    'Cyber',
    'Communicable disease',
    'CBR',
  ];

  const values = [35, 3, 13, 5, 7, 2, 1, 3, 7, 9, 12, 3];

  const colors = ['#26adc9', '#BD13AC', '#5cc200', '#F21D0B', '#a8dee9', '#ccc', '#F3FD43', '#0EDC9F', '#E293D9', '#A9CD8D', '#F4952C', '#3915D7'];

  const options = {
    colors: colors,
    labels: labels,
  };

  // Return JSX elements to render the dashboard.
  return (
    <AdminLayout routeName={props.routeName}>
      <div className="dashboard">
        <Row className="content-db">
          <Col lg={6}>
            <div className="left-content">
              <Row>
                <Col>
                  <a href="/users" className="icon-users">
                    <i className="fa-solid fa-user-clock fa-2xl"></i>
                    <span className="label">Users</span>
                  </a>
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
          <Col lg={6}>
            <div className="right-content">
              <Row >
                <Col>
                  <a href="/contracts" className="icon-users">
                    <i className="fa-solid fa-file-contract fa-2xl"></i>
                    <span className="label">Contracts</span>
                  </a>
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
        <Row className="content-chart">
          <ReactApexChart
            options={options}
            series={values}
            type="pie"
            width={700}
          />
          <p className="label-chart">Question mart ratio</p>
        </Row>
        <Row className="content-detail-chart">
          <Col className="detail-chart-left">
            <p>Court jurisdiction <span className="value-report">80</span></p>
            <p>Governing law <span className="value-report">2</span></p>
            <p>Arbitration <span className="value-report">7</span></p>
            <p>War <span className="value-report">6</span></p>
            <p>Unused definitions <span className="value-report">12</span></p>
            <p>Sanctions <span className="value-report">80</span></p>
          </Col>
          <Col>
            <p>Readability <span className="value-report">5</span></p>
            <p>RUB <span className="value-report">20</span></p>
            <p>Interaction between court jurisdiction and arbitration <span className="value-report">4</span></p>
            <p>Cyber <span className="value-report">5</span></p>
            <p>Communicable disease <span className="value-report">9</span></p>
            <p>CBR <span className="value-report">12</span></p>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
}

