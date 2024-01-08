import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useAppSelector } from "hooks";
import { LoginForm } from "./LoginForm";
import { LoginOtp } from "./LoginOtp";
import { SendMailForgotPwForm } from "./SendMailForgetPwForm";
import { SendNewPwForm } from "./SendNewPwForm";
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
  const [
    isLoginSuccess,
    sendEmailForgotPasswordSuccess,
    sendNewPasswordSuccess
  ] = useAppSelector(
    (state) => [
      state.auth.isLoginSuccess,
      state.auth.sendEmailForgotPasswordSuccess,
      state.auth.sendNewPasswordSuccess,
    ]
  );

  const [currentEmail, setCurrentEmail] = useState<string>("")
  const [isForgetPass, setIsForgetPass] = useState(false);

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
            {isLoginSuccess && (
              <LoginOtp currentEmail={currentEmail} />
            )}

            {isForgetPass && !sendEmailForgotPasswordSuccess && (
              <SendMailForgotPwForm
                setCurrentEmail={setCurrentEmail}
                setIsForgetPass={setIsForgetPass}
              />
            )}

            {sendEmailForgotPasswordSuccess && !sendNewPasswordSuccess && (
              <SendNewPwForm
                currentEmail={currentEmail}
                sendEmailForgotPasswordSuccess={sendEmailForgotPasswordSuccess}
              />
            )}

            {((!isLoginSuccess && !sendEmailForgotPasswordSuccess && !isForgetPass) || sendNewPasswordSuccess) && (
              <LoginForm
                sendNewPasswordSuccess={sendNewPasswordSuccess}
                setCurrentEmail={setCurrentEmail}
                setIsForgetPass={setIsForgetPass}
              />
            )}
          </Col>
        </Row>
      </div>
    </AuthenticationLayout>
  );
}
