import SMSYSAlert from "components/SMSYSAlert";
import { NavDropdown } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { logout, sendMailChangePw } from "store/actions/auth";
import { useAppDispatch } from "hooks";
import { upperFistChar } from "helpers/until";
import avatar from "assets/images/avatar.png";

// Define a function component named "Navmenu" and receive a single parameter called "props"
export default function Navmenu(props) {
  // Destructure the "isShowFullSidebar" prop from the "props" object
  const { isShowFullSidebar } = props;

  // Get the history object from react-router-dom
  const history = useHistory();

  // Get the app dispatch from your custom hook or path
  const dispatch = useAppDispatch();

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // Define an "onLogout" function that dispatches the "logout" action 
  // and redirects to the home page ("/")
  const onLogout = () => {
    dispatch(logout());
    history.push("/login");
  };

  const changePassword = () => {
    dispatch(sendMailChangePw({"email": user.email}))
    history.push("/change-password");
  }

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
                    <i className="fa-solid fa-download m-2" style={{color: "#26ADC9"}}></i>
                    <i className="fa-solid fa-user fa-2xl" style={{color: "#26ADC9"}}></i>
                  </b>
                }
              >
                <NavDropdown.Item>
                  My Account
                  <ul className="acc-info">
                    <li>Email: {user.email}</li>
                    <li>Role: {upperFistChar(user.role)}</li>
                  </ul>
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => changePassword()}>
                  Change Password
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
