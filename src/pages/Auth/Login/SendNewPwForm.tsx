import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewPasswordValidation } from "schema/auth";
import { useAppDispatch } from "hooks";
import { sendNewPassWord } from "store/actions/auth";
import { useEffect, useState } from "react";
import { generatePassword } from "helpers/until";
import "./style.css";

export function SendNewPwForm(props) {
  const { currentEmail, sendEmailForgotPasswordSuccess } = props;
  const dispatch = useAppDispatch();

  // Using the useForm hook to handle form validation and submission
  const {
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(NewPasswordValidation),
  });

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowRePassword, setIsShowRePassword] = useState(false);
  const [passwordRandom, setPasswordRandom] = useState('');

  useEffect(() => {
    if (sendEmailForgotPasswordSuccess) {
      setValue("username", currentEmail)
      setValue("password", "")
      setValue("otp", "")
    }
  }, [sendEmailForgotPasswordSuccess])

  // Function to handle form submission
  const onSubmit = async (data) => {
    const dataSend = {
      email: currentEmail,
      otp: data.otp?.trim(),
      password: data.password?.trim(),
    }
    dispatch(sendNewPassWord(dataSend))
  };

  const genPassword = () => {
    setPasswordRandom(generatePassword());
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="center_form"
    >
      <p className="title">Forgot Password</p>

      <div className="mb-3">
        <label className="label-input mb-3">
          Please enter the OTP sent to your registered email address.
        </label>
        <input
          type="text"
          {...register("otp")}
          className={`form-control ${errors.otp ? "is-invalid" : ""}`}
          name="otp"
          onKeyDown={(evt) =>
            evt.key === " " && evt.preventDefault()
          }
        />
        <div className="invalid-feedback">
          {errors.otp?.message}
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
  );
}
