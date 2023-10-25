import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginValidation } from "schema/auth";
import { useAppDispatch } from "hooks";

// Defines a React functional component called "List" that takes props as its parameter
export default function EditUser(props) {

  const { currentUser, setIsShowEdit } = props;

  const dispatch = useAppDispatch();

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
    // dispatch(login(params));
    setIsShowEdit(false);
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
            placeholder="Your name"
            onKeyDown={(evt) =>
              evt.key === " " && evt.preventDefault()
            }
            value={currentUser?.email}
          />
          <div className="invalid-feedback">
            {errors.username?.message}
          </div>
        </div>
        <div className="mb-3">
          <label className="label-input">Password</label>
          <input
            type="text"
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""
              }`}
            name="password"
            value={currentUser?.password}
          />
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
            value={"Normal User"}
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
