import { useAppDispatch, useAppSelector } from "hooks";
import { useEffect, useState } from "react";
import { getStatisticsContract, getStatisticsEmber, getStatisticsUser } from "store/actions/master";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminLayout from "layouts/Admin";
import ProgressCircle from "components/Progress/ProgressCircle";
import ReactApexChart from 'react-apexcharts';
import "./style.css";

// This code exports a functional component called Dashboard, which takes in a prop object
export function Dashboard(props) {
  // Declares a const variable "dispatch" and initializes it with the useAppDispatch hook
  const dispatch = useAppDispatch();

  // Destructure some values from the state using the useAppSelector hook
  const [statisticsUser, statisticsContract, statisticsQuestionmark] = useAppSelector((state) => [
    state.masterData.statisticsUser,
    state.masterData.statisticsContract,
    state.masterData.statisticsQuestionmark,
  ]);

  // Define states using the useState hook
  const [labelsChart, setLabelsChart] = useState<string[]>([])
  const [valuesChart, setValuesChart] = useState<number[]>([])

  // Sets up side effect using async `getMasterdata()` action creator to fetch user settings from backend API
  useEffect(() => {
    dispatch(getStatisticsUser());
    dispatch(getStatisticsContract());
    dispatch(getStatisticsEmber());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sets up a side effect using the useEffect hook that runs when the "statisticsQuestionmark"
  // dependency changes. Inside the effect, the "labelsChart" and "valuesChart" arrays are populated
  // based on the "statisticsQuestionmark" data and sorted using the "topic.order" property. 
  // Finally, the "labelsChart" and "valuesChart" state variables are updated.
  useEffect(() => {
    if (statisticsQuestionmark?.length > 0) {
      let labels: string[] = [];
      let values: number[] = [];

      statisticsQuestionmark.sort(function (a, b) {
        return a.topic.order < b.topic.order ? -1 : 1;
      });

      statisticsQuestionmark.map((item) => {
        labels.push(item?.topic.name);
        values.push(item?.count);
      })
      setLabelsChart(labels);
      setValuesChart(values);
    };

  }, [statisticsQuestionmark]);

  // Declares a const variable "colors" and initializes it with an array of color values
  const colors = ['#26adc9', '#BD13AC', '#5cc200', '#F21D0B', '#a8dee9', '#ccc', '#BCAB14', '#0EDC9F', '#E293D9', '#A9CD8D', '#F4952C', '#3915D7'];

  // Defines an options object for the chart with the "colors" array and the "labelsChart" array
  const options = {
    colors: colors,
    labels: labelsChart,
  };

  // This function is used to reset the statistics for the user.
  const resetStatisticsUser = () => {
    dispatch(getStatisticsUser());
  }

  // This function is used to reset the statistics for the contract.
  const resetStatisticsContract = () => {
    dispatch(getStatisticsContract());
  }

  // This function is used to reset the statistics for Ember.
  const resetStatisticsEmber = () => {
    dispatch(getStatisticsEmber());
  }

  // This function calculates and returns the progress of user logins, based on the total number of users and the number of users who have logged in.
  const getProgressUserLogin = () => {
    if (statisticsUser.total_user_number !== 0) {
      return Math.round(statisticsUser.total_user_login_number / statisticsUser.total_user_number * 100);
    }
    return 0;
  }

  // This function calculates and returns the progress of users who have analyzed documents, based on the total number of users and the number of users who have uploaded documents.
  const getProgressUserAnalyzedDoc = () => {
    if (statisticsUser.total_user_number !== 0) {
      return Math.round(statisticsUser.total_user_upload_number / statisticsUser.total_user_number * 100);
    }
    return 0;
  }

  // This function calculates and returns the progress of chat usage, based on the total number of contracts and the number of contracts that have used chat.
  const getProgresChatUsage = () => {
    if (statisticsContract.total_contract_number !== 0) {
      return Math.round(statisticsContract.total_chat_usage_number / statisticsContract.total_contract_number * 100);
    }
    return 0;
  }

  // This function calculates and returns the progress of question marks, based on the total number of contracts and the number of contracts that have used question marks.
  const getProgresQuestionMark = () => {
    if (statisticsContract.total_contract_number !== 0) {
      return Math.round(statisticsContract.total_questionmark_number / statisticsContract.total_contract_number * 100);
    }
    return 0;
  }

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
                  <p className="icon-rotata">
                    <i
                      className="fa-solid fa-rotate fa-2xl"
                      onClick={resetStatisticsUser}
                    />
                  </p>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <ProgressCircle
                    progress={getProgressUserLogin()}
                    strokeColor="#5cc200"
                    classIndicator="indicator-left"
                    label="Logged-in User"
                  />
                </Col>
                <Col sm={6}>
                  <ProgressCircle
                    progress={getProgressUserAnalyzedDoc()}
                    strokeColor="#5cc200"
                    classIndicator="indicator-left"
                    label="Analyzed Document User"
                  />
                </Col>
              </Row>
            </div>
            <div className="tt-report">
              <p>Total Users <span className="value-report">{statisticsUser.total_user_number}</span></p>
            </div>
            <div className="tt-report">
              <p>Logged-in <span className="value-report">{statisticsUser.total_user_login_number}</span></p>
              <p>Analyzed <span className="value-report">{statisticsUser.total_user_upload_number}</span></p>
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
                  <p className="icon-rotata">
                    <i
                      className="fa-solid fa-rotate fa-2xl"
                      onClick={resetStatisticsContract}
                    />
                  </p>
                </Col>
              </Row>
              <Row>
                <Col sm={6}>
                  <ProgressCircle
                    progress={getProgresChatUsage()}
                    strokeColor="#ff543a"
                    classIndicator="indicator-right"
                    label="Chat Usage"
                  />
                </Col>
                <Col sm={6}>
                  <ProgressCircle
                    progress={getProgresQuestionMark()}
                    strokeColor="#ff543a"
                    classIndicator="indicator-right"
                    label="Question Mark"
                  />
                </Col>
              </Row>
            </div>
            <div className="tt-report">
              <p>Total Contracts <span className="value-report">{statisticsContract.total_contract_number}</span></p>
            </div>
            <div className="tt-report">
              <p>Chat Usage <span className="value-report">{statisticsContract.total_chat_usage_number}</span></p>
              <p>Question Mark <span className="value-report">{statisticsContract.total_questionmark_number}</span></p>
            </div>
          </Col>
        </Row>

        {statisticsQuestionmark.length > 0 &&
          <>
            <Row className="content-chart">
              <p className="icon-rotata">
                <i
                  className="fa-solid fa-rotate fa-2xl"
                  onClick={resetStatisticsEmber}
                />
              </p>
              <ReactApexChart
                options={options}
                series={valuesChart}
                type="pie"
                width={700}
              />
              <p className="label-chart">Question Mark Ratio</p>
            </Row>
            <Row className="content-detail-chart">
              <Col className="detail-chart-left">
                {labelsChart.map((label, index) => {
                  if (index < labelsChart.length / 2) {
                    return <p key={label}>{label} <span className="value-report">{valuesChart[index]}</span></p>
                  }
                })}
              </Col>
              <Col>
                {labelsChart.map((label, index) => {
                  if (index >= labelsChart.length / 2) {
                    return <p key={label}>{label} <span className="value-report">{valuesChart[index]}</span></p>
                  }
                })}
              </Col>
            </Row>
          </>
        }
      </div>
    </AdminLayout>
  );
}

