import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "hooks";
import { updatePrompt } from "store/actions/prompt";
import { promptEditValidation } from "schema/prompt";
import { useEffect, useState } from "react";

// Defines a React functional component called "List" that takes props as its parameter
export default function EditPrompt(props) {

  const { currentPrompt, setIsShowEdit } = props;

  const dispatch = useAppDispatch();

  const [textare1aHeight, setTextarea1Height] = useState('auto');
  const [textare2aHeight, setTextarea2Height] = useState('auto');
  const [textare3aHeight, setTextarea3Height] = useState('auto');

  // Using the useForm hook to handle form validation and submission
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(promptEditValidation),
  });

  useEffect(() => {
    const textarea1Element = document.getElementById("textarea1Element");
    setTextarea1Height(`${textarea1Element?.scrollHeight}px`);
    const textarea2Element = document.getElementById("textarea2Element");
    setTextarea2Height(`${textarea2Element?.scrollHeight}px`);
    const textarea3Element = document.getElementById("textarea3Element");
    setTextarea3Height(`${textarea3Element?.scrollHeight}px`);
  }, [])

  // Function to handle form submission
  const onSubmit = async (data) => {
    const params = {
      prompt_id: currentPrompt.uuid,
      topic_id: currentPrompt.topic_id,
      topic_name: data.name.trim(),
      prompt_text_1: data.prompt_text_1?.trim(),
      prompt_text_2: data.prompt_text_2?.trim(),
      prompt_text_3: data.prompt_text_3?.trim(),
    };
    dispatch(updatePrompt(params));
    setIsShowEdit(false);
  };

  // Returns JSX for rendering component on the page
  return (
    // Renders an AdminLayout component with a prop called `routeName`
    <div className="edit-prompt">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="center_form"
      >
        <div className="content-prompt">
        <div className="mb-3">
          <label className="label-input">
            Topic <span className="error">*</span>
          </label>
          <input
            type="text"
            {...register("name")}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            name="name"
            defaultValue={currentPrompt?.topic_name}
          />
          <div className="invalid-feedback">
            {errors.name?.message}
          </div>
        </div>
        <div className="mb-3">
          <label className="label-input">Text 1</label>
          <textarea
            id="textarea1Element"
            {...register("prompt_text_1")}
            className={`form-control ${errors.prompt_text_1 ? "is-invalid" : ""}`}
            name="prompt_text_1"
            defaultValue={currentPrompt?.prompt_text_1}
            style={{ height: textare1aHeight, overflow: 'hidden' }}
          />
          <div className="invalid-feedback">
            {errors.prompt_text_1?.message}
          </div>
        </div>
        <div className="mb-3">
          <label className="label-input">Text 2</label>
          <textarea
            id="textarea2Element"
            {...register("prompt_text_2")}
            className={`form-control ${errors.prompt_text_2 ? "is-invalid" : ""}`}
            name="prompt_text_2"
            defaultValue={currentPrompt?.prompt_text_2}
            style={{ height: textare2aHeight, overflow: 'hidden' }}
          />
          <div className="invalid-feedback">
            {errors.prompt_text_2?.message}
          </div>
        </div>
        <div className="">
          <label className="label-input">Text 3</label>
          <textarea
            id="textarea3Element"
            {...register("prompt_text_3")}
            className={`form-control ${errors.prompt_text_3 ? "is-invalid" : ""}`}
            name="prompt_text_3"
            defaultValue={currentPrompt?.prompt_text_3}
            style={{ height: textare3aHeight, overflow: 'hidden' }}
          />
          <div className="invalid-feedback">
            {errors.prompt_text_3?.message}
          </div>
        </div>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn-save"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
