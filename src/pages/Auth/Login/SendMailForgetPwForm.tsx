import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SendEmailForgotPasswordValidation } from "schema/auth";
import { useAppDispatch } from "hooks";
import { sendMailForgotPassword } from "store/actions/auth";
import "./style.css";

export function SendMailForgotPwForm(props) {
  const {setCurrentEmail, setIsForgetPass} = props;
  const dispatch = useAppDispatch();

  // Using the useForm hook to handle form validation and submission
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SendEmailForgotPasswordValidation),
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    setIsForgetPass(false);
    setCurrentEmail(data.username);
    setValue("password", "")
    setValue("otp", "")
    dispatch(sendMailForgotPassword(data.username))
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="center_form"
    >
      <p className="title">Forgot Password</p>

      <div className="mb-3">
        <label className="label-input">
          Your email
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
