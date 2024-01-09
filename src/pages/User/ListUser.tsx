import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import { PopupDialog } from "components/Modals/PopUpDialog";
import { useAppDispatch, useAppSelector } from "hooks";
import { forceChangePw, getListUser, getLoginHistory, suspendAccount } from "store/actions/user";
import { ReactTooltip } from "components/Tooltip/ReactTooltip";
import { getDateDiff } from "helpers/until";
import { ContentTable } from "components/Table/ContentTable";
import { SorterResult } from "antd/es/table/interface";
import type { ColumnsType, TableProps } from "antd/es/table";
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

  // Initialize 'loggedUser' variable by parsing the value returned from localStorage.getItem("user"). If the value is null or undefined, initialize it as an empty object.
  const loggedUser = JSON.parse(localStorage.getItem("user") || "{}");

  // Destructure some values from the state using the useAppSelector hook
  const [listUser, histories, getLoginHistorySuccess] = useAppSelector((state) => [
    state.users.listUser,
    state.users.loginHistory,
    state.users.getLoginHistorySuccess,
  ]);

  // Define a handleChange function that will be used as a callback for the onChange event of a table. It takes pagination, filters, and sorter as arguments.
  const handleChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    // Set the sortedInfo state to the value of the sorter argument.
    setSortedInfo(sorter as SorterResult<DataType>);
  };

  // Define states using the useState hook
  const [sortedInfo, setSortedInfo] = useState<SorterResult<DataType>>({});
  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [isShowEdit, setIsShowEdit] = useState<boolean>(false);
  const [isShowHistory, setIsShowHistory] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<Object>({});
  const [currentData, setCurrentData] = useState([]);
  const [currentTime, setCurrentTime] = useState<string>();

  // Sets up side effect using async `getListUser()` action creator to fetch user settings from backend API
  useEffect(() => {
    dispatch(getListUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This useEffect hook will be executed whenever the `listUser` variable changes.
  useEffect(() => {
    if (listUser) {
      setCurrentTime(listUser.currentTime);
      const data = listUser.data;
      const sortedData = data?.sort((a, b) =>
        a?.created_at < b?.created_at ? 1 : -1
      );
      setCurrentData(listUser.data);
    }
  }, [listUser]);

  // This function takes a role as input and returns the corresponding role name
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

  // Define an array of columns with a specific data type (ColumnsType<DataType>)
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
      sortOrder: sortedInfo.columnKey === 'email' ? sortedInfo.order : null,
    },
    {
      title: "Last Logged-in",
      dataIndex: "last_access_time",
      key: "last_access_time",
      sortOrder: sortedInfo.columnKey === 'last_access_time' ? sortedInfo.order : null,
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
      sortOrder: sortedInfo.columnKey === 'number_of_contracts' ? sortedInfo.order : null,
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
      sortOrder: sortedInfo.columnKey === 'role' ? sortedInfo.order : null,
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
      key: "created_at",
      width: "18%",
      sortOrder: sortedInfo.columnKey === 'created_at' ? sortedInfo.order : null,
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
      width: loggedUser.role == "super-admin" ? "15%" : "1%",
      className: loggedUser.role == "super-admin" ? "" : "hide-action",
      render: (user) => (
        <>
          <i
            data-tooltip-id="tooltip-edit"
            className="fa-solid fa-pen grIconAction"
            onClick={() => handleShowPopupEdit(user)}
          ></i>
          <ReactTooltip
            id={`tooltip-edit`}
            content={"Edit user"}
            widthTooltip={85}
          />
          <i
            data-tooltip-id="tooltip-reset-password"
            className="fa-solid fa-repeat grIconAction"
            onClick={() => resetPassword(user)}
          ></i>
          <ReactTooltip
            id={`tooltip-reset-password`}
            content={"Reset password"}
            widthTooltip={130}
          />
          <i 
            data-tooltip-id="tooltip-ban"
            className="fa-solid fa-ban grIconAction m-2"
            onClick={() => suspendAcc(user)}
          ></i>
          <ReactTooltip
            id={`tooltip-ban`}
            content={"Suspend account"}
            widthTooltip={135}
          />
        </>
      ),
    },
  ];

  const suspendAcc = (user) => {
    dispatch(suspendAccount(user.uuid))
  }

  const resetPassword = (user) => {
    dispatch(forceChangePw(user.uuid))
  };

  // This function returns the content for the add user popup
  const getContentPopupAdd = () => {
    return <AddUser setIsShowAdd={setIsShowAdd} />;
  };

  // This function sets the current user and shows the edit user popup
  const handleShowPopupEdit = (user) => {
    setCurrentUser(user);
    setIsShowEdit(true);
  };

  // This function returns the content for the edit user popup
  const getContentPopupEdit = () => {
    return <EditUser currentUser={currentUser} setIsShowEdit={setIsShowEdit} />;
  };

  // This function shows the login history popup and dispatches an action to get the login history
  const handleShowPopupHistory = (uuid) => {
    setIsShowHistory(true);
    dispatch(getLoginHistory(uuid));
  };

  // This function returns the content for the login history popup
  const getContentPopupHistory = () => {
    return <LoginHistory loginHistories={histories} getLoginHistorySuccess={getLoginHistorySuccess} />;
  };

  // This function sorts the current data by email domain
  const onSortByDomain = () => {
    setSortedInfo({});

    const newData = currentData.sort((a, b) => {
      const aEmail: any = a["email"];
      const bEmail: any = b["email"];
      return aEmail?.split("@")[1].localeCompare(bEmail?.split("@")[1]);
    })

    setCurrentData(newData)
  };

  // This function reloads the page to reset the state
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
            {loggedUser.role == "super-admin" && (
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
        <ContentTable
          columns={columns}
          listUser={currentData}
          onChange={handleChange}
          defaultHeightTop={350}
        />
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
