import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { getContractDetail, getContracts } from "store/actions/contract";
import { ContentTable } from "components/Table/ContentTable";
import { getStatisticsContract } from "store/actions/master";
import { PopupDialog } from "components/Modals/PopUpDialog";
import { CircularProgress } from "@mui/material";
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
  created_at: string;
  topics: string;
}

// Defines a React functional component called "List" that takes props as its parameter
export default function ContractHistory(props) {
  // Retrieves the Redux store's state and dispatch function
  const dispatch = useAppDispatch();

  // Destructure some values from the state using the useAppSelector hook
  const [
    contracts,
    statisticsContract,
    constractDetail,
    getContractDetailsSuccess,
  ] = useAppSelector((state) => [
    state.contracts.contracts,
    state.masterData.statisticsContract,
    state.contracts.constractDetail,
    state.contracts.getContractDetailsSuccess
  ]);

  // Define states using the useState hook
  const [isShowTopics, setIsShowTopics] = useState<boolean>(false);
  const [currentContract, setCurrentContract] = useState<string>("");

  // Sets up side effect using async `getListUser()` action creator to fetch user settings from backend API
  useEffect(() => {
    dispatch(getContracts());
    dispatch(getStatisticsContract(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This array defines the columns for a table. Each object in the array represents a column.
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
        <p className="usage-num"> {num_of_tokens ?? 0} </p>
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
      render: (_, { num_of_questionmark, uuid, file_name }) => (
        <p className="question" onClick={() => {Number(num_of_questionmark) > 0 && getListTopic(uuid, file_name)}}>
          {num_of_questionmark}
        </p>
      ),
    },
    {
      title: 'Uploaded Date',
      dataIndex: 'created_at',
      width: '16%',
      defaultSortOrder: "descend",
      sorter: {
        compare: (a, b) => {
          return moment.utc(a.created_at) > moment.utc(b.created_at) ? 1 : -1;
        },
      },
      render: (_, { created_at }) => (
        <p>{moment.utc(created_at).format("YYYY/MM/DD")}</p>
      ),
    },
  ];

  // This function sets the value of setIsShowTopics to true, 
  // sets the value of setCurrentContract to the provided file_name,
  // and dispatches the getContractDetail action with the provided uuid.
  const getListTopic = (uuid, file_name) => {
    setIsShowTopics(true);
    setCurrentContract(file_name);
    dispatch(getContractDetail(uuid));
  }

  // This function sorts the constractDetail array based on the order property in ascending order.
  // Then, it returns either a JSX element or a loading spinner based on the value of getContractDetailsSuccess.
  const getContentPopupTopics = () => {
    constractDetail.sort(function (a, b) {
      return a.order < b.order ? -1 : 1;
    });

    return (
      getContractDetailsSuccess
        ? constractDetail.map((detail, index) => {
          return <p>{index + 1}. {detail.topic_name}</p>
        })
        : <div className="text-center"><CircularProgress color="inherit" /></div>
    )
  }


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
          defaultHeightTop={310}
        />
      </div>

      <PopupDialog
        isShow={isShowTopics}
        title={currentContract}
        content={getContentPopupTopics()}
        firstLabelButon={""}
        seconLabelButton={""}
        handleFirstButtonCalback={() => setIsShowTopics(false)}
        handleSeconButtonCalback={""}
      />
    </AdminLayout>
  );
}
