import { Col, Row } from "react-bootstrap";
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from "react";
import { PopupDialog } from "components/Modals/PopUpDialog";
import AdminLayout from "layouts/Admin";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import classNames from "classnames";
import './style.css';

interface DataType {
  email: string;
  role: string;
  created: string;
  status: string;
  password: string;
}

// Defines a React functional component called "List" that takes props as its parameter
export default function ListUser(props) {
  const data: DataType[] = [
    {
      email: 'admin@codecomplete.com',
      role: 'admin',
      created: '2023-10-10',
      status: 'Enable',
      password: '123',
    },
    {
      email: 'user1@codecomplete.com',
      role: 'user',
      created: '2023-10-15',
      status: 'Enable',
      password: '123',
    },
    {
      email: 'user2@codecomplete.com',
      role: 'user',
      created: '2023-10-12',
      status: 'Disable',
      password: '123',
    },
  ]

  for (let i = 3; i < 20; i++) {
    data.push({
      email: `user${i}@codecomplete.com`,
      role: 'user',
      created: '2023-10-23',
      status: 'Disable',
      password: '456',
    })
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '30%',
      sorter: {
        compare: (a, b) => {
          return a.email > b.email ? 1 : -1;
        },
      },
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '20%',
      sorter: {
        compare: (a, b) => {
          return a.role > b.role ? 1 : -1;
        },
      },
    },
    {
      title: 'Created Date',
      dataIndex: 'created',
      key: 'created',
      sorter: {
        compare: (a, b) => {
          let date_1 = new Date(a.created)
          let date_2 = new Date(b.created)
          return date_1.getTime() > date_2.getTime() ? 1 : -1;
        },
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: '20%',
      sorter: {
        compare: (a, b) => {
          return a.status > b.status ? 1 : -1;
        },
      },
      render: (_, { status }) => (
        <>
          <p className={
            classNames("", {
              "st-enable" : status === "Enable",
              "st-disable" : status === "Disable"
            })}
          >{status}</p>
        </>
      ),
    },
  ];

  const [heightTable, setHeightTable] = useState<number>(window.innerHeight - 320);
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const [currentUser, setcurrentUser] = useState<Object>({});

  useEffect(() => {
    window.addEventListener('resize', function () {
      setHeightTable(this.window.innerHeight - 320);
    });
  }, [])

  const getContentPopupAdd = () => {
    return <AddUser setIsShowAdd={setIsShowAdd} />;
  }

  const handleShowPopupEdit = (user) => {
    setcurrentUser(user)
    setIsShowEdit(true);
  }

  const getContentPopupEdit = () => {
    return <EditUser currentUser={currentUser} setIsShowEdit={setIsShowEdit} />;
  }

  // Returns JSX for rendering component on the page
  return (
    // Renders an AdminLayout component with a prop called `routeName`
    <AdminLayout routeName={props.routeName}>
      <div className="user-managerment">
        <Row>
          <Col sm={10} className="title">Users</Col>
          <Col sm={2} className="add-user"><button onClick={() => setIsShowAdd(true)}>+</button></Col>
        </Row>
        <Table
          columns={columns}
          dataSource={data}
          className="table-user"
          scroll={{ x: 600, y: heightTable }}
          onRow={(user) => ({
            onClick: () => {
              handleShowPopupEdit(user)
            }
          })}
        />

        <PopupDialog
          isShow={isShowAdd}
          title={"Add user"}
          content={getContentPopupAdd()}
          firstLabelButon={""}
          seconLabelButton={""}
          handleFirstButtonCalback={() => setIsShowAdd(false)}
          handleSeconButtonCalback={""}
        />

        <PopupDialog
          isShow={isShowEdit}
          title={"Edit user"}
          content={getContentPopupEdit()}
          firstLabelButon={""}
          seconLabelButton={""}
          handleFirstButtonCalback={() => setIsShowEdit(false)}
          handleSeconButtonCalback={""}
        />
      </div>
    </AdminLayout>
  );
}
