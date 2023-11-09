import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "hooks";
import { updateUser } from "store/actions/user";
import { userEditValidation } from "schema/user";
import { useState } from "react";

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
    resolver: yupResolver(userEditValidation),
  });

  const [isShowPassword, setIsShowPassword] = useState(false);

  // Function to handle form submission
  const onSubmit = async (data) => {
    const params = {
      user_id: currentUser.uuid,
      email: data.username,
      password: data.password.trim(),
    };
    dispatch(updateUser(params));
    setIsShowEdit(false);
  };

  // Returns JSX for rendering component on the page
  return (
    // Renders an AdminLayout component with a prop called `routeName`
    <div className="edit-user">
      <form onSubmit={handleSubmit(onSubmit)} className="center_form">
        <div className="mb-3">
          <label className="label-input">Email</label>
          <input
            type="text"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={currentUser?.email}
            disabled
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="mb-3">
          <label className="label-input">Password</label>
          <input
            type={`${isShowPassword ? "text" : "password"}`}
            {...register("password")}
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            name="password"
            placeholder="********"
            value={currentUser?.hashed_password}
          />
          <i
            className="fa-regular fa-eye"
            onClick={() => setIsShowPassword(!isShowPassword)}
          />
          <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        <div className="mb-3">
          <label className="label-input">Role</label>
          <select
            {...register("role")}
            className={`form-control ${errors.role ? "is-invalid" : ""}`}
            name="role"
            value={currentUser?.role}
            disabled
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
