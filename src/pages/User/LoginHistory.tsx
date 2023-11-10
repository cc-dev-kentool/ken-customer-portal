import { useEffect, useState } from "react";
import { useAppSelector } from "hooks";
import { getDateDiff } from "helpers/until";
import { ContentTable } from "components/Table/ContentTable";
import type { ColumnsType } from 'antd/es/table';
import moment from "moment";
import './style.css';

interface DataType {
  uuid: string;
  email: string;
  last_access_time: string;
  logout_time: string;
}

// Defines a React functional component called "List" that takes props as its parameter
export default function LoginHistory() {

  const [histories] = useAppSelector((state) => [
    state.users.loginHistory,
  ]);

  const [loginHistories, setLoginHistories] = useState([])

  useEffect(() => {
    if (loginHistories) {
      setLoginHistories(histories.data);
    }
  }, [loginHistories])

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
          const durationA = compareDuration(a.last_access_time, a.logout_time);
          const durationB = compareDuration(b.last_access_time, b.logout_time);
          return durationA > durationB ? 1 : -1;
        },
      },
      render: (_, { last_access_time, logout_time }) => (
        <p>{logout_time ? getDateDiff(last_access_time, logout_time, false): 'N/A'}</p>
      ),
    },
    {
      title: 'Login Time',
      dataIndex: 'last_access_time',
      key: 'last_access_time',
      defaultSortOrder: 'descend',
      sorter: {
        compare: (a, b) => {
          return a.last_access_time > b.last_access_time ? 1 : -1;
        },
      },
      render: (_, { last_access_time }) => (
        <p>{moment.utc(last_access_time).local().format('lll')}</p>
      ),
    },
    {
      title: 'Log Out',
      dataIndex: 'logout',
      key: 'logout',
      sorter: {
        compare: (a, b) => {
          const timeA = a.logout_time ?? 'N/A'
          const timeB = b.logout_time ?? 'N/A'
          return timeA > timeB ? 1 : -1;
        },
      },
      render: (_, { logout_time }) => (
        <p>{logout_time ? moment.utc(logout_time).local().format('lll')  : 'N/A'}</p>
      )
    },
  ];

  const compareDuration = (timeLogin, timeLogout) => {
    return new Date(timeLogout).getTime() - new Date(timeLogin).getTime()
  }

  // Returns JSX for rendering component on the page
  return (
    <div className="login-history-page">
      <ContentTable
        columns={columns}
        listUser={loginHistories}
      />
    </div>
  );
}
