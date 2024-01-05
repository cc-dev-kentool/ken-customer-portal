import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useAppSelector } from "hooks";
import { LoginForm } from "./LoginForm";
import { LoginOtp } from "./LoginOtp";
import AuthenticationLayout from "layouts/Authentication";
import SMSYSAlert from "components/SMSYSAlert";
import "./style.css";

/**
Exporting the Login component as a named function
@param props - the props passed to the component
@returns - the rendered component
*/
export function Login() {
  // Using the useAppSelector hook to get variables from the Redux store
  const [isLoginSuccess] = useAppSelector(
    (state) => [
      state.auth.isLoginSuccess,
    ]
  );

  const [currentEmail, setCurrentEmail] = useState<string>("")

  return (
    <AuthenticationLayout>
      <div className="notification-top">
        <SMSYSAlert />
      </div>
      <div className="login-form">
        <Row className="login-content">
          <Col className="p-0">
            <div className="bg_login"></div>
          </Col>
          <Col className="form-content">
            {!isLoginSuccess
              ? <LoginForm setCurrentEmail={setCurrentEmail}/>
              : <LoginOtp currentEmail={currentEmail}/>}
          </Col>
        </Row>
      </div>
    </AuthenticationLayout>
  );
}
