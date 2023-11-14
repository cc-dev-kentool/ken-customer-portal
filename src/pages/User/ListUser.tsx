import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { PopupDialog } from "components/Modals/PopUpDialog";
import { useAppDispatch, useAppSelector } from "hooks";
import { getListUser, getLoginHistory } from "store/actions/user";
import { getDateDiff } from "helpers/until";
import { ContentTable } from "components/Table/ContentTable";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import AdminLayout from "layouts/Admin";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import LoginHistory from "./LoginHistory";
import classNames from "classnames";
import "./style.css";

interface DataType {
  uuid: string;
  email: string;
  role: string;
  created_at: string;
  last_access_time: string;
  number_of_contracts: number;
  logout_time: string;
}

// Defines a React functional component called "List" that takes props as its parameter
export default function ListUser(props) {
  // Retrieves the Redux store's state and dispatch function
  const dispatch = useAppDispatch();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [listUser, histories, getLoginHistorySuccess] = useAppSelector((state) => [
    state.users.listUser,
    state.users.loginHistory,
    state.users.getLoginHistorySuccess,
  ]);

  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const [isShowHistory, setIsShowHistory] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<Object>({});
  const [currentData, setCurrentData] = useState([]);
  const [currentTime, setCurrentTime] = useState<string>();
  const [originData, setOriginData] = useState([]);

  // Sets up side effect using async `getListUser()` action creator to fetch user settings from backend API
  useEffect(() => {
    dispatch(getListUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (listUser) {
      setCurrentTime(listUser.currentTime);
      const data = listUser.data;
      const sortedData = data?.sort((a, b) =>
        a?.created_at < b?.created_at ? 1 : -1
      );
      setOriginData(sortedData);
      setCurrentData(listUser.data);
    }
  }, [listUser]);

  const getRoleName = (role) => {
    switch (role) {
      case "admin":
        return "Admin";
      case "member":
        return "Member";
      case "super-admin":
        return "Super Admin";
      default:
        break;
    }
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: {
        compare: (a, b) => {
          return a.email > b.email ? 1 : -1;
        },
      },
    },
    {
      title: "Last Logged-in",
      dataIndex: "login",
      key: "login",
      sorter: {
        compare: (a, b) => {
          const timeA = a.last_access_time ?? 'N/A';
          const timeB = b.last_access_time ?? 'N/A';
          return timeA > timeB ? 1 : -1;
        },
      },
      width: "25%",
      render: (_, { last_access_time, logout_time, email, uuid }) => (
        <Row className="last-login">
          <Col sm="10" className="last-login-item-left">
            <ul>
              <li>
                Last logged-in:{" "}
                {last_access_time
                  ? getDateDiff(last_access_time, currentTime, true)
                  : "N/A"}
              </li>
              <li>
                Duration:{" "}
                {logout_time
                  ? getDateDiff(last_access_time, logout_time, false)
                  : "N/A"}
              </li>
            </ul>
          </Col>
          <Col sm="2" className="pl-0 last-login-item-right">
            <p className="icon-action">
              <span>
                <i
                  className="fa-solid fa-ellipsis"
                  onClick={() => handleShowPopupHistory(uuid)}
                />
              </span>
            </p>
          </Col>
        </Row>
      ),
    },
    {
      title: "Number Of Contract",
      dataIndex: "number_of_contracts",
      key: "number_of_contracts",
      width: "15%",
      sorter: {
        compare: (a, b) => {
          return a.number_of_contracts > b.number_of_contracts ? 1 : -1;
        },
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "15%",
      sorter: {
        compare: (a, b) => {
          return a.role > b.role ? 1 : -1;
        },
      },
      render: (_, { role }) => (
        <p
          className={classNames("", {
            "role-admin": role === "admin",
            "role-member": role === "member",
            "role-super-admin": role === "super-admin",
          })}
        >
          {getRoleName(role)}
        </p>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      width: "18%",
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
      title: "Action",
      width: loggedUser.role == "super-admin" ? "11%" : "1%",
      className: loggedUser.role == "super-admin" ? "" : "hide-action",
      render: (user) => (
        <i
          className="fa-solid fa-pen"
          style={{ color: "#26ADC9", cursor: "pointer" }}
          onClick={() => handleShowPopupEdit(user)}
        ></i>
      ),
    },
  ];

  const getContentPopupAdd = () => {
    return <AddUser setIsShowAdd={setIsShowAdd} />;
  };

  const handleShowPopupEdit = (user) => {
    setCurrentUser(user);
    setIsShowEdit(true);
  };

  const getContentPopupEdit = () => {
    return <EditUser currentUser={currentUser} setIsShowEdit={setIsShowEdit} />;
  };

  const handleShowPopupHistory = (uuid) => {
    setIsShowHistory(true);
    dispatch(getLoginHistory(uuid));
  };

  const getContentPopupHistory = () => {
    return <LoginHistory loginHistories={histories} getLoginHistorySuccess={getLoginHistorySuccess} />;
  };

  const onSortByDomain = () => {
    const currentDataCopy = [...originData];
    setCurrentData(
      currentDataCopy.sort((a, b) => {
        const aEmail: any = a["email"];
        const bEmail: any = b["email"];
        return aEmail?.split("@")[1].localeCompare(bEmail?.split("@")[1]);
      })
    );
  };

  const onReset = () => {
    location.reload();
  };

  // Returns JSX for rendering component on the page
  return (
    // Renders an AdminLayout component with a prop called `routeName`
    <AdminLayout routeName={props.routeName}>
      <div className="user-managerment">
        <Row>
          <Col sm={10} className="title">
            Users Management
          </Col>
          <Col sm={2} className="add-user">
            {user.role == "super-admin" && (
              <button onClick={() => setIsShowAdd(true)}>+</button>
            )}
          </Col>
        </Row>
        <Row className="gr-btn-sort">
          <Col sm={10}>
            <button className="btn-sort-domain" onClick={() => onSortByDomain()}>Sort by domain</button>
            <button className="btn-reset" onClick={() => onReset()}> Reset </button>
          </Col>
        </Row>
        <ContentTable columns={columns} listUser={currentData} />
        <PopupDialog
          isShow={isShowAdd}
          title={"Add User"}
          content={getContentPopupAdd()}
          firstLabelButon={""}
          seconLabelButton={""}
          handleFirstButtonCalback={() => setIsShowAdd(false)}
          handleSeconButtonCalback={""}
        />
        <PopupDialog
          isShow={isShowEdit}
          title={"Edit User"}
          content={getContentPopupEdit()}
          firstLabelButon={""}
          seconLabelButton={""}
          handleFirstButtonCalback={() => setIsShowEdit(false)}
          handleSeconButtonCalback={""}
        />
        <PopupDialog
          isShow={isShowHistory}
          title={"Login History"}
          content={getContentPopupHistory()}
          firstLabelButon={""}
          seconLabelButton={""}
          handleFirstButtonCalback={() => setIsShowHistory(false)}
          handleSeconButtonCalback={""}
          modalContentClass="modal-history"
        />
      </div>
    </AdminLayout>
  );
}
