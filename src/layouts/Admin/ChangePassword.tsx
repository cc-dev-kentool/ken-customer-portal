import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ChangePasswordValidation } from "schema/auth";
import { useAppDispatch, useAppSelector } from "hooks";
import { userChangePw } from "store/actions/auth";
import { useEffect, useState } from "react";
import { generatePassword } from "helpers/until";
import AdminLayout from "layouts/Admin"
import "./style.css";

// This function component takes props as input and returns a JSX element that renders a 404 error page.
export default function ChangePassword(props) {
  const dispatch = useAppDispatch();

  // Using the useAppSelector hook to get variables from the Redux store
  const [
    forceChangePwSuccess,
  ] = useAppSelector(
    (state) => [
      state.users.forceChangePwSuccess,
    ]
  );

  // Using the useForm hook to handle form validation and submission
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ChangePasswordValidation),
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRePassword, setIsShowRePassword] = useState(false);
  const [isShowOldPassword, setIsShowOldPassword] = useState(false);
  const [passwordRandom, setPasswordRandom] = useState('');

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // Function to handle form submission
  const onSubmit = async (data) => {
    const params = {
      email: user.email,
      old_password: data.old_password,
      new_password: data.password,
      otp: data.otp

    }
    dispatch(userChangePw(params))
  };

  const genPassword = () => {
    setPasswordRandom(generatePassword());
  };

  useEffect(() => {
    if (forceChangePwSuccess) {
      setValue("password", genPassword());
    }
  }, [forceChangePwSuccess])

  // The component returns a JSX element with the following structure:
  return (
    <AdminLayout routeName={props.routeName}>
      <div className="content-changePw">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="center_form"
        >
          <p className="title">Change Password</p>

          <div className="mb-3">
            <label className="label-input mb-3">
              Please enter the OTP sent to your registered email address.
            </label>
            <input
              type="text"
              {...register("otp")}
              className={`form-control ${errors.otp ? "is-invalid" : ""}`}
              name="otp"
            />
            <div className="invalid-feedback">
              {errors.otp?.message}
            </div>
          </div>

          <div className="mb-3">
            <label className="label-input">Old Password</label>
            <input
              type={`${isShowOldPassword ? 'text' : 'password'}`}
              {...register("old_password")}
              className={`form-control feild-pass ${errors.old_password ? "is-invalid" : ""
                }`}
              name="old_password"
              placeholder="***************"
            />
            <i
              className={`iconShowPass fa-regular fa-eye${isShowOldPassword ? "-slash" : ""} ${errors.old_password ? "isWithError" : ""}`}
              onClick={() => setIsShowOldPassword(!isShowOldPassword)}
            />
            <div className="invalid-feedback">
              {errors.old_password?.message}
            </div>
          </div>

          <div className="mb-3">
            <label className="label-input">New Password</label>
            <input
              type={`${isShowPassword ? 'text' : 'password'}`}
              {...register("password")}
              className={`form-control feild-pass ${errors.password ? "is-invalid" : ""
                }`}
              name="password"
              placeholder="***************"
            />
            <i
              className={`iconShowPass fa-regular fa-eye${isShowPassword ? "-slash" : ""} ${errors.password ? "isWithError" : ""}`}
              onClick={() => setIsShowPassword(!isShowPassword)}
            />
            <div className="invalid-feedback">
              {errors.password?.message}
            </div>
          </div>

          <div className="row">
            <p className="col-4">{passwordRandom}</p>
            <p className="col-8 text-end">
              <span className="btn-random" onClick={genPassword}>Random Password</span>
            </p>
          </div>

          <div className="mb-3">
            <label className="label-input">Re-enter New Password</label>
            <input
              type={`${isShowRePassword ? 'text' : 'password'}`}
              {...register("re_password")}
              className={`form-control feild-pass ${errors.re_password ? "is-invalid" : ""
                }`}
              name="re_password"
              placeholder="***************"
            />
            <i
              className={`iconShowPass fa-regular fa-eye${isShowRePassword ? "-slash" : ""} ${errors.re_password ? "isWithError" : ""}`}
              onClick={() => setIsShowRePassword(!isShowRePassword)}
            />
            <div className="invalid-feedback">
              {errors.re_password?.message}
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn-login"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}