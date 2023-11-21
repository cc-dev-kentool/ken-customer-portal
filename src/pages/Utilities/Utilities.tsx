import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch, useAppSelector } from "hooks";
import { utilitiesValidation } from "schema/prompt";
import { getResultUtilities } from "store/actions/utilities";
import AdminLayout from "layouts/Admin";
import "./style.css";

// Defines a React functional component called "List" that takes props as its parameter
export default function Utilities(props) {
  // Retrieves the Redux store's state and dispatch function
  const dispatch = useAppDispatch();

  const { setIsShowAdd } = props;

  // Destructure some values from the state using the useAppSelector hook
  const [result, getResultSuccess] = useAppSelector((state) => [
    state.utilities.result,
    state.utilities.getResultSuccess,
  ]);

  // Using the useForm hook to handle form validation and submission
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(utilitiesValidation),
  });

  // Function to handle form submission
  const onSubmit = async (data) => {
    const params = {
      file_id: data.file_id,
      prompt: data.prompt,
    };
    dispatch(getResultUtilities(params));
    setIsShowAdd(false);
  };

  // Returns JSX for rendering component on the page
  return (
    // Renders an AdminLayout component with a prop called `routeName`
    <AdminLayout routeName={props.routeName}>
      <div className="utilities-component">
        <form onSubmit={handleSubmit(onSubmit)} className="center_form">
          <div className="mb-3">
            <label className="label-input">File Id <span className="redColor">*</span></label>
            <input
              type="text"
              {...register("file_id")}
              onBlur={(e: any) =>
                setValue("file_id", e.target.value.trim())
              }
              className={`form-control ${errors.file_id ? "is-invalid" : ""}`}
              name="file_id"
            />
            <div className="invalid-feedback">{errors.file_id?.message}</div>
          </div>

          <div className="mb-3">
            <label className="label-input">Prompt <span className="redColor">*</span></label>
            <textarea
              rows={10}
              {...register("prompt")}
              onBlur={(e: any) =>
                setValue("prompt", e.target.value.trim())
              }
              className={`form-control ${errors.prompt ? "is-invalid" : ""}`}
              name="prompt"
            />
            <div className="invalid-feedback">{errors.prompt?.message}</div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn-submit">
              Submit
            </button>
          </div>
        </form>

        <div className="result">
          <p className="title-result">RESULT</p>
          <div className="content-result">{result}</div>
        </div>
      </div>
    </AdminLayout>
  );
}
