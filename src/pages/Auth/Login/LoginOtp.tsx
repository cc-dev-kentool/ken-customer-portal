import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OtpValidation } from "schema/auth";
import { useAppDispatch } from "hooks";
import { otpConfirm, resendOtp } from "store/actions/auth";
import "./style.css";

export function LoginOtp(props) {
  const { currentEmail } = props;
  const dispatch = useAppDispatch();

  // Using the useForm hook to handle form validation and submission
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(OtpValidation),
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    const params = {
      email: currentEmail,
      otp: data.otp?.trim()
    };
    dispatch(otpConfirm(params));
  };

  const handleResendOtp = () => {
    dispatch(resendOtp({ email: currentEmail }));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="center_form"
    >
      <p className="title">Login</p>

      <div className="mb-3">
        <label className="label-input mb-3">
          Please enter the OTP sent to your registered email address.
        </label>
        <input
          type="text"
          {...register("otp")}
          onBlur={(e: any) =>
            setValue(
              "otp",
              e.target.value.replace(" ", "").trim()
            )
          }
          className={`form-control ${errors.otp ? "is-invalid" : ""
            }`}
          name="otp"
          onKeyDown={(evt) =>
            evt.key === " " && evt.preventDefault()
          }
        />
        <div className="invalid-feedback">
          {errors.otp?.message}
        </div>
      </div>

      <p
        className="btn-resend text-end"
        onClick={handleResendOtp}
      >
        Re-send OTP
      </p>

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
