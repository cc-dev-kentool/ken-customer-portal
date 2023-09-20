import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "schema/auth";
import { useAppDispatch, useAppSelector } from "hooks";
import { login, clearErrorMessage } from "store/actions/auth";
import AuthenticationLayout from "layouts/Authentication";
import bg_login from "assets/images/bg-login.png";
import "./style.css";

/**
Exporting the Login component as a named function
@param props - the props passed to the component
@returns - the rendered component
*/
export function Login(props) {
  // Using the useAppSelector hook to get variables from the Redux store
  const [error, isLoginSuccess] = useAppSelector(
    (state) => [
      state.auth.errorLogin,
      state.auth.isLoginSuccess
    ]
  );
  // Using the useAppDispatch hook to get the dispatch function for Redux actions
  const dispatch = useAppDispatch();

  // Using the useEffect hook to check if the user has successfully logged in and redirect to the dashboard page
  useEffect(() => {
    if (isLoginSuccess) {
      localStorage.removeItem("isTokenExpired");
      localStorage.removeItem("isForceChangePassword");
      // Check if there is a previously saved path
      const query = new URLSearchParams(props.location.search)
      const previousPage = query.get('continue')
      if (previousPage) {
        //To ensure clearing the previous route after it has been used.
        localStorage.removeItem("previousPage");
        // Go to the previous page
        window.location.href = previousPage;
      } else {
        // Go to the dashboard page
        window.location.href = "/";
      }
    }
  }, [isLoginSuccess]);

  // Getting values from localStorage to check for expired tokens and forced password changes
  const isTokenExpired = localStorage.getItem("isTokenExpired");

  // Using the useEffect hook to handle expired tokens and forced password changes
  useEffect(() => {
    if (isTokenExpired) {
      if (localStorage.getItem("isShowTokenExpired")) {
        localStorage.removeItem("isTokenExpired");
        localStorage.removeItem("isShowTokenExpired");
      } else {
        localStorage.setItem("isShowTokenExpired", "true");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // Function to handle form submission
  const onSubmit = async (data) => {
    const params = {
      username: data.username,
      password: data.password.trim()
    };
    dispatch(login(params));
  };

  // Watching the username input to clear any error messages
  const watchUsername = watch("username");

  // Using the useEffect hook to clear any error messages
  useEffect(() => {
    dispatch(clearErrorMessage());
  }, [watchUsername, dispatch]);

  return (
    <AuthenticationLayout>
      <main className="d-flex w-100 login-form">
        <div className="container d-flex flex-column">
          <div className="vh-100">
            <div className="col-md-10 offset-1 col-sm-8 mx-auto d-table h-100">
              <div className="d-table-cell align-middle">
                <div className="text-center mt-4"></div>
                <div className="row mt-lg-5 mt-md-2">
                  <div className="container-left">
                    <div className="m-sm-4">
                      <div className="header mt-lg-5 mt-md-2"></div>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="center_form"
                      >
                        <p className="title">
                          Log <span style={{ color: "#BD202D" }}>in.</span>
                        </p>
                        <div
                          className="error invalid-"
                          style={{ color: "red" }}
                        >
                          {error}
                        </div>
                        {isTokenExpired && !error && (
                          <div
                            className="error invalid-"
                            style={{ color: "red" }}
                          >
                            Your session has expired. Please login again to
                            continue!
                          </div>
                        )}

                        <div className="mb-3">
                          <label className="label-input">
                            Email address or username
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
                            className={`form-control rounded-0 ${errors.username ? "is-invalid" : ""
                              }`}
                            name="username"
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
                            type="password"
                            {...register("password")}
                            className={`form-control rounded-0 ${errors.password ? "is-invalid" : ""
                              }`}
                            name="password"
                          />
                          <div className="invalid-feedback">
                            {errors.password?.message}
                          </div>
                        </div>
                        <div className="text-center mt-lg-3 mt-md-4">
                          <button
                            type="submit"
                            className="btn btn-block btn-danger rounded-0"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="container-right">
                    <img className="bg_login" src={bg_login} alt={"bg_login"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AuthenticationLayout>
  );
}
