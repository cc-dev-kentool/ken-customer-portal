import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "hooks";
import { createUser } from "store/actions/user";
import { userAddValidation } from "schema/user";
import { useState } from "react";

// Defines a React functional component called "List" that takes props as its parameter
export default function AddUser(props) {

  const dispatch = useAppDispatch();

  const { setIsShowAdd } = props;

  // Using the useForm hook to handle form validation and submission
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userAddValidation),
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  // Function to handle form submission
  const onSubmit = async (data) => {
    const params = {
      email: data.email,
      password: data.password.trim()
    };
    dispatch(createUser(params));
    setIsShowAdd(false)
  };

  // Returns JSX for rendering component on the page
  return (
    // Renders an AdminLayout component with a prop called `routeName`
    <div className="edit-user">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="center_form"
      >
        <div className="mb-3">
          <label className="label-input">
            Email
          </label>
          <input
            type="text"
            {...register("email")}
            onBlur={(e: any) =>
              setValue(
                "email",
                e.target.value.replace(" ", "").trim()
              )
            }
            className={`form-control ${errors.email ? "is-invalid" : ""
              }`}
            name="email"
            placeholder="user@gmail.com"
            onKeyDown={(evt) =>
              evt.key === " " && evt.preventDefault()
            }
          />
          <div className="invalid-feedback">
            {errors.email?.message}
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
            placeholder="Zxcv123456@"
          />
          <i className="fa-regular fa-eye" onClick={() => setIsShowPassword(!isShowPassword)} />
          <div className="invalid-feedback">
            {errors.password?.message}
          </div>
        </div>
        <div className="mb-3">
          <label className="label-input">Role</label>
          <input
            type="role"
            {...register("role")}
            className={`form-control ${errors.role ? "is-invalid" : ""
              }`}
            name="role"
            value={"Member"}
            disabled
          />
          <div className="invalid-feedback">
            {errors.role?.message}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn-save"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
