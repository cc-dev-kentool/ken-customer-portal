import { Col, Row } from "react-bootstrap";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { getContracts } from "store/actions/contract";
import { ContentTable } from "components/Table/ContentTable";
import type { ColumnsType } from 'antd/es/table';
import moment from "moment";
import AdminLayout from "layouts/Admin";
import classNames from "classnames";
import './style.css';

interface DataType {
  uuid: string;
  file_name: string;
  size: number;
  time: number;
  usage: string;
  question: string;
  uploaded_at: string;
}

// Defines a React functional component called "List" that takes props as its parameter
export default function ContractHistory(props) {
  // Retrieves the Redux store's state and dispatch function
  const dispatch = useAppDispatch();

  const [contract] = useAppSelector((state) => [
    state.contracts.contracts,
  ]);

  // Sets up side effect using async `getListUser()` action creator to fetch user settings from backend API
  useEffect(() => {
    dispatch(getContracts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contracts = [
    {
      file_name: "TerrorismForSimon.pdf",
      size: 30,
      time: 35,
      usage: 200,
      question: 10,
      uploaded_at: "2023/11/2",
    },
    {
      file_name: "TravelForSimon.pdf",
      size: 10,
      time: 30,
      usage: "No",
      question: 5,
      uploaded_at: "2023/10/30",
    },
  ]

  for (let i = 0; i <= 10; i++) {
    contracts.push({
      file_name: `TradeCreditForSimon.pdf_${i + 1}`,
      size: 80,
      time: 20,
      usage: `${i % 2 == 0 ? 10 : "No"}`,
      question: 2 + i,
      uploaded_at: `2023/10/${i + 1}`,
    })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'File contract',
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
      dataIndex: 'size',
      key: 'size',
      width: '15%',
      sorter: {
        compare: (a, b) => {
          return a > b ? 1 : -1;
        },
      },
    },
    {
      title: 'Time Of analysis (seconds)',
      dataIndex: 'time',
      key: 'time',
      width: '15%',
      sorter: {
        compare: (a, b) => {
          return a > b ? 1 : -1;
        },
      }
    },
    {
      title: 'Usage Chat (message)',
      dataIndex: 'usage',
      key: 'usage',
      width: '15%',
      sorter: {
        compare: (a, b) => {
          return a.usage > b.usage ? 1 : -1;
        },
      },
      render: (_, { usage }) => (
        <p className={classNames("", {
          "usage-str": isNaN(Number(usage)),
          "usage-num": !isNaN(Number(usage)),
        })}>
          {usage}
        </p>
      ),
    },
    {
      title: 'Question Mark',
      dataIndex: 'question',
      key: 'question',
      width: '15%',
      sorter: {
        compare: (a, b) => {
          return a.question > b.question ? 1 : -1;
        },
      },
      render: (_, { question }) => (
        <p className="question">{question}</p>
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
            <p>Total <span>2000</span></p>
            <p>Usage Chat <span>1000</span></p>
            <p>Has Question Mark <span>200</span></p>
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
