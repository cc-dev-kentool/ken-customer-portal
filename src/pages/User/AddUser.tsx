import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "hooks";
import { createUser } from "store/actions/user";
import { userAddValidation } from "schema/user";

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

  // Function to handle form submission
  const onSubmit = async (data) => {
    const params = {
      email: data.email.toLowerCase(),
      role: data.role,
    };
    dispatch(createUser(params));
    setIsShowAdd(false);
  };

  // Returns JSX for rendering component on the page
  return (
    // Renders an AdminLayout component with a prop called `routeName`
    <div className="edit-user">
      <form onSubmit={handleSubmit(onSubmit)} className="center_form">
        <div className="mb-3">
          <label className="label-input">Email <span className="redColor">*</span></label>
          <input
            type="text"
            {...register("email")}
            onBlur={(e: any) =>
              setValue("email", e.target.value.trim())
            }
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            placeholder="Please enter a valid email address"
            onKeyDown={(evt) => evt.key === " " && evt.preventDefault()}
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="mb-3">
          <label className="label-input">Role <span className="redColor">*</span></label>

          <select
            {...register("role")}
            className={`form-control ${errors.role ? "is-invalid" : ""}`}
            name="role"
            defaultValue={"member"}
          >
            <option value="super-admin">Super Admin</option>
            <option value="admin">Admin</option>
            <option value="member">Member</option>
          </select>
          <div className="invalid-feedback">{errors.role?.message}</div>
        </div>

        <div className="text-center">
          <button type="submit" className="btn-save">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
