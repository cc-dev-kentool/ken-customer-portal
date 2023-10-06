import SMSYSAlert from "components/SMSYSAlert";
import { NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { logout } from "store/actions/auth";
import { useAppDispatch } from "hooks";
import avatar from "assets/images/avatar.png";

// Define a function called "Dashboard" which receives a single parameter called "props"
export default function Navmenu(props) {
  const { isShowFullSidebar } = props;

  const history = useHistory();
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  // Return the following JSX
  return (
    <>
      <div className="notification-top-bar">
        <SMSYSAlert isShowMenu={isShowFullSidebar} />
      </div>
      <nav className="navbar navbar-expand navbar-light">
        <div className="navbar-collapse collapse">
          <ul className="navbar-nav navbar-align">
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
                <NavDropdown.Item onClick={() => history.push("/")}>
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
    </>
  );
}
