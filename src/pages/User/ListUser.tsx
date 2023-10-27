import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { PopupDialog } from "components/Modals/PopUpDialog";
import { useAppDispatch, useAppSelector } from "hooks";
import { getListUser } from "store/actions/user";
import { upperFistChar } from "helpers/until";
import { ContentTable } from "components/Table/ContentTable";
import type { ColumnsType } from 'antd/es/table';
import moment from "moment";
import AdminLayout from "layouts/Admin";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import classNames from "classnames";
import './style.css';

interface DataType {
  uuid: string;
  email: string;
  role: string;
  created_at: string;
}

// Defines a React functional component called "List" that takes props as its parameter
export default function ListUser(props) {
  // Retrieves the Redux store's state and dispatch function
  const dispatch = useAppDispatch();

  const [listUser] = useAppSelector((state) => [
    state.userSetting.listUser,
  ]);

  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const [currentUser, setcurrentUser] = useState<Object>({});

  // Sets up side effect using async `getListUser()` action creator to fetch user settings from backend API
  useEffect(() => {
    dispatch(getListUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: '20%',
      sorter: {
        compare: (a, b) => {
          return a.role > b.role ? 1 : -1;
        },
      },
      render: (_, { role }) => (
        <p className={
          classNames("", {
            "role-admin": role === "admin",
            "role-member": role === "member"
          })}
        >
          {upperFistChar(role)}
        </p>
      ),
    },
    {
      title: 'Created Date',
      dataIndex: 'created_at',
      width: '20%',
      sortOrder: "descend",
      sorter: {
        compare: (a, b) => {
          return a.created_at > b.created_at ? 1 : -1;
        },
      },
      render: (_, { created_at }) => (
        <p>{moment.utc(created_at).format("YYYY/MM/DD")}</p>
      ),
    },
    {
      title: 'Action',
      width: '10%',
      render: () => (
        <p>
          <i className="fa-solid fa-pen" style={{ color: "#26ADC9" }}></i>
        </p>
      ),
    },
  ];

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
          <Col sm={10} className="title">Users Management</Col>
          <Col sm={2} className="add-user"><button onClick={() => setIsShowAdd(true)}>+</button></Col>
        </Row>
        <ContentTable
          columns={columns}
          listUser={listUser}
          handleShowPopupEdit={handleShowPopupEdit}
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
