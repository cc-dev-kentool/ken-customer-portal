import { Col, Row } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "schema/auth";
import { useAppDispatch, useAppSelector } from "hooks";
import { login } from "store/actions/auth";
import AuthenticationLayout from "layouts/Authentication";
import "./style.css";

/**
Exporting the Login component as a named function
@param props - the props passed to the component
@returns - the rendered component
*/
export function Login() {
  const dispatch = useAppDispatch();
  // Using the useAppSelector hook to get variables from the Redux store
  const [error] = useAppSelector(
    (state) => [
      state.auth.errorLogin,
    ]
  );

  // Getting values from localStorage to check for expired tokens and forced password changes
  const isTokenExpired = localStorage.getItem("isTokenExpired");

  // Using the useForm hook to handle form validation and submission
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginValidation),
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  // Function to handle form submission
  const onSubmit = async (data) => {
    const params = {
      username: data.username,
      password: data.password.trim()
    };
    dispatch(login(params));
  };

  return (
    <AuthenticationLayout>
      <div className="login-form">
        <Row className="login-content">
          <Col className="p-0">
            <div className="bg_login"></div>
          </Col>
          <Col>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="center_form"
            >
              <p className="title">Login</p>

              <p className="error invalid-">{error}</p>
              {/* {isTokenExpired && !error && (
                <p className="error invalid-">
                  Your session has expired. Please login again to
                  continue!
                </p>
              )} */}

              <div className="mb-3">
                <label className="label-input">
                  Username
                </label>
                <input
                  type="text"
                  {...register("username")}
                  onBlur={(e: any) =>
                    setValue(
                      "username",
                      e.target.value.replace(" ", "").trim()
                    )
                  }
                  className={`form-control ${errors.username ? "is-invalid" : ""
                    }`}
                  name="username"
                  placeholder="Email Address"
                  onKeyDown={(evt) =>
                    evt.key === " " && evt.preventDefault()
                  }
                />
                <div className="invalid-feedback">
                  {errors.username?.message}
                </div>
              </div>
              <div className="mb-3">
                <label className="label-input">Password</label>
                <input
                  type={`${isShowPassword ? 'text' : 'password'}`}
                  {...register("password")}
                  className={`form-control ${errors.password ? "is-invalid" : ""
                    }`}
                  name="password"
                  placeholder="***************"
                />
                <i className="fa-regular fa-eye" onClick={() => setIsShowPassword(!isShowPassword)} />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="btn-login"
                >
                  Login
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </div>
    </AuthenticationLayout>
  );
}
