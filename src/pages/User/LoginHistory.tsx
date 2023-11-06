import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { getLoginHistory } from "store/actions/user";
import { ContentTable } from "components/Table/ContentTable";
import type { ColumnsType } from 'antd/es/table';
import moment from "moment";
import './style.css';

interface DataType {
  uuid: string;
  email: string;
  duration: string;
  login_time: string;
  logout: string;
}

// Defines a React functional component called "List" that takes props as its parameter
export default function LoginHistory(props) {
  // Retrieves the Redux store's state and dispatch function
  const dispatch = useAppDispatch();

  const { email } = props;

  const [loginHistory] = useAppSelector((state) => [
    state.users.loginHistory,
  ]);

  // Sets up side effect using async `getListUser()` action creator to fetch user settings from backend API
  useEffect(() => {
    dispatch(getLoginHistory());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loginHistorys = [
    {
      email: email,
      duration: '25 minutes',
      login_time: '2023/11/2 8:00 am',
      logout: '',
    },
    {
      email: email,
      duration: '10 minutes 30 seconds',
      login_time: '2023/11/1 9:00 pm',
      logout: '2023/11/1 10:00 pm',
    },
  ]

  for (let i = 1; i <= 15; i++) {
    loginHistorys.push({
      email: email,
      duration: `${5+i} minutes ${10+i} seconds`,
      login_time: `2023/10/${i + 1} ${8 + i}:00`,
      logout: `2023/10/${i + 1} ${9 + i}:00`,
    })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: {
        compare: (a, b) => {
          return a.email > b.email ? 1 : -1;
        },
      },
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      sorter: {
        compare: (a, b) => {
          return a.duration > b.duration ? 1 : -1;
        },
      },
      render: (_, { duration }) => (
        <>{duration}</>
      ),
    },
    {
      title: 'Login Time',
      dataIndex: 'login_time',
      key: 'login_time',
      sorter: {
        compare: (a, b) => {
          return a > b ? 1 : -1;
        },
      },
      render: (_, { login_time }) => (
        <p>{moment(login_time).format('lll')}</p>
      ),
    },
    {
      title: 'Log out',
      dataIndex: 'logout',
      key: 'logout',
      sorter: {
        compare: (a, b) => {
          return a.logout > b.logout ? 1 : -1;
        },
      },
      render: (_, { logout }) => (
        <p>{logout ? moment(logout).format('lll') : 'N/A'}</p>
      )
    },
  ];

  // Returns JSX for rendering component on the page
  return (
    <div className="login-history-page">
      <ContentTable
        columns={columns}
        listUser={loginHistorys}
      />
    </div>
  );
}
