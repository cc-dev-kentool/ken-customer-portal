import { useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { useHistory } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { logout } from "store/actions/auth";
import SMSYSAlert from "components/SMSYSAlert";
import LOGO from "assets/images/logo.png";
import avatar from "assets/images/avatar.png";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "assets/css/app.css";
import "./style.css";

function AdminLayout(props) {
  const [styles, setStyles] = useState<any>({ background: "white" });
  const [isShowMenu, setIsShowMenu] = useState(true);
  const dispatch = useAppDispatch();
  const { children } = props;
  const [isLoading] = useAppSelector((state) => [state.app.isLoading]);

  const toggleMenu = () => {
    setIsShowMenu(!isShowMenu);
    setStyles(
      !isShowMenu
        ? { background: "white" }
        : { background: "white", overflowX: "auto" }
    );
  };

  const currentRoute = localStorage.getItem("currentRoute") || "homepage";

  const onLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };
  const history = useHistory();

  return (
    <div className="wrapper">
      <nav
        id="sidebar"
        className={`sidebar js-sidebar ${isShowMenu ? "" : "collapsed"}`}
      >
        <div className="sidebar-content js-simplebar">
          <a href="/">
            <img src={LOGO} alt="logo" className="sidebar-brand" />
          </a>

          <ul className="sidebar-nav text-left">
            <li>
              <button className="btn-add-document"> <i className="fa-regular fa-plus fs-1"></i> <br/> New Document
              </button>
            </li>
            <li className="main-menu">
              <p>
                <i className="fa-solid fa-chevron-down"></i>
                {' '}Main
              </p>
              <div>
                <p className="p-1">
                  <i className="fa-regular fa-file-lines m-2" style={{color: "#26adc9"}}></i>
                  <span>TemplatePDF.pdf</span>
                  <i className="fa-solid fa-ellipsis icon-action"></i>
                </p>
                <p className="p-1">
                  <i className="fa-regular fa-file-lines m-2" style={{color: "#26adc9"}}></i>
                  Sharefile.pdf
                  <i className="fa-solid fa-ellipsis icon-action"></i>
                </p>
                <p className="active-file p-1">
                  <i className="fa-regular fa-file-lines m-2" style={{color: "#26adc9"}}></i>
                  Jerry2020-torm.pdf
                  <i className="fa-solid fa-ellipsis icon-action"></i>
                </p>
              </div>
            </li>
            <li
              className={`sidebar-item ${
                currentRoute === "/" ? "active" : ""
              }`}
            >
            </li>
          </ul>
        </div>
      </nav>

      <div className="main" style={styles}>
        <div className="notification-top-bar">
          <SMSYSAlert isShowMenu={isShowMenu} />
        </div>
        <nav className="navbar navbar-expand navbar-light">
          <span
            className="sidebar-toggle js-sidebar-toggle"
            onClick={() => toggleMenu()}
          >
            <i className="hamburger align-self-center"></i>
          </span>

          <div className="navbar-collapse collapse">
            <ul className="navbar-nav navbar-align">
              <li className="nav-item dropdown">
                <span
                  className="nav-icon dropdown-toggle"
                  id="alertsDropdown"
                  data-bs-toggle="dropdown"
                ></span>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-icon dropdown-toggle"
                  id="alertsDropdown"
                  data-bs-toggle="dropdown"
                ></span>
              </li>
              <li className="nav-item dropdown dropdown-index">
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  className="custom-nav-dropdown"
                  title={
                    <b className="">
                      <i className="fa-solid fa-download"></i>
                      <img src={avatar} alt="" className="avatar" />
                    </b>
                  }
                >
                  <NavDropdown.Item onClick={() => history.push("/my-account")}>
                    My Account
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => onLogout()}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </li>
            </ul>
          </div>
        </nav>
        <main className="content">
          <div className="container-fluid border-content p-0 list-contain">
            <Backdrop sx={{ color: "#fff", zIndex: 99999 }} open={isLoading}>
              <CircularProgress color="inherit" />
            </Backdrop>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
