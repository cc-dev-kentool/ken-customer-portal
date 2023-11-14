import { Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { getContracts } from "store/actions/contract";
import { ContentTable } from "components/Table/ContentTable";
import { getStatisticsContract } from "store/actions/master";
import { ReactTooltip } from "components/Tooltip/ReactTooltip";
import type { ColumnsType } from 'antd/es/table';
import moment from "moment";
import AdminLayout from "layouts/Admin";
import './style.css';

interface DataType {
  uuid: string;
  file_name: string;
  pages: number;
  executed_time: number;
  num_of_tokens: number;
  num_of_questionmark: string;
  uploaded_at: string;
  topics: string;
}

// Defines a React functional component called "List" that takes props as its parameter
export default function ContractHistory(props) {
  // Retrieves the Redux store's state and dispatch function
  const dispatch = useAppDispatch();

  const [contracts, statisticsContract] = useAppSelector((state) => [
    state.contracts.contracts,
    state.masterData.statisticsContract,
  ]);

  // Sets up side effect using async `getListUser()` action creator to fetch user settings from backend API
  useEffect(() => {
    dispatch(getContracts());
    dispatch(getStatisticsContract());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: 'File Contract',
      dataIndex: 'file_name',
      key: 'file_name',
      sorter: {
        compare: (a, b) => {
          return a.file_name > b.file_name ? 1 : -1;
        },
      },
    },
    {
      title: 'Size Of Contract (page)',
      dataIndex: 'pages',
      key: 'pages',
      width: '15%',
      sorter: {
        compare: (a, b) => {
          return a.pages > b.pages ? 1 : -1;
        },
      },
    },
    {
      title: 'Time Of Analysis (seconds)',
      dataIndex: 'executed_time',
      key: 'executed_time',
      width: '15%',
      sorter: {
        compare: (a, b) => {
          return a.executed_time > b.executed_time ? 1 : -1;
        },
      }
    },
    {
      title: 'Usage Chat (tokens)',
      dataIndex: 'num_of_tokens',
      key: 'num_of_tokens',
      width: '15%',
      sorter: {
        compare: (a, b) => {
          return a.num_of_tokens > b.num_of_tokens ? 1 : -1;
        },
      },
      render: (_, { num_of_tokens }) => (
        <p className="usage-num"> {num_of_tokens} </p>
      ),
    },
    {
      title: 'Question Mark',
      dataIndex: 'num_of_questionmark',
      key: 'num_of_questionmark',
      width: '15%',
      sorter: {
        compare: (a, b) => {
          return a.num_of_questionmark > b.num_of_questionmark ? 1 : -1;
        },
      },
      render: (_, { num_of_questionmark, uuid, topics }) => (
        <>
          <p className="question" data-tooltip-id={`tooltip-${uuid}`}>
            {num_of_questionmark}
          </p>
          <ReactTooltip
            id={`tooltip-${uuid}`}
            // content={topics}
            content={num_of_questionmark}
            widthTooltip={500}
          />
        </>
      ),
    },
    {
      title: 'Uploaded Date',
      dataIndex: 'uploaded_at',
      width: '16%',
      defaultSortOrder: "descend",
      sorter: {
        compare: (a, b) => {
          return moment.utc(a.uploaded_at) > moment.utc(b.uploaded_at) ? 1 : -1;
        },
      },
      render: (_, { uploaded_at }) => (
        <p>{moment.utc(uploaded_at).format("YYYY/MM/DD")}</p>
      ),
    },
  ];


  // Returns JSX for rendering component on the page
  return (
    // Renders an AdminLayout component with a prop called `routeName`
    <AdminLayout routeName={props.routeName}>
      <div className="contracts-history">
        <Row>
          <Col sm={8} className="title">Contracts History</Col>
          <Col sm={4} className="total">
            <p>Total <span>{statisticsContract.total_contract_number}</span></p>
            <p>Usage Chat <span>{statisticsContract.total_chat_usage_number}</span></p>
            <p>Has Question Mark <span>{statisticsContract.total_questionmark_number}</span></p>
          </Col>
        </Row>
        <ContentTable
          columns={columns}
          listUser={contracts}
        />
      </div>
    </AdminLayout>
  );
}
