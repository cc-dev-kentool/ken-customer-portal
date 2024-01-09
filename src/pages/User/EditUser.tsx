import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "hooks";
import { forceChangePw, updateUser } from "store/actions/user";
import { userAddValidation } from "schema/user";
import { useState } from "react";
import { generatePassword } from "helpers/until";

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
  } = useForm({ resolver: yupResolver(userAddValidation), });

  // Function to handle form submission
  const onSubmit = async (data) => {
    const params = {
      user_id: currentUser.uuid,
      email: data.username,
      role: data.role,
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
            {...register("email")}
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={currentUser?.email}
            readOnly
          />
          <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="mb-3">
          <label className="label-input">Role</label>
          <select
            {...register("role")}
            className={`form-control ${errors.role ? "is-invalid" : ""}`}
            name="role"
            defaultValue={currentUser?.role}
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
