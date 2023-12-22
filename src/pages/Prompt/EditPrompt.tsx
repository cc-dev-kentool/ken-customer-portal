import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "hooks";
import { updateTopic } from "store/actions/prompt";
import { promptEditValidation } from "schema/prompt";
import { useEffect, useState } from "react";
import classNames from "classnames";

// Defines a React functional component called "List" that takes props as its parameter
export default function EditPrompt(props) {

  const { currentPrompt, setIsShowEdit } = props;

  const dispatch = useAppDispatch();

  const [textareaHeight, setTextareaHeight] = useState<any>([]);
  const [disableBtnSave, setDisableBtnSave] = useState(true);

  // Using the useForm hook to handle form validation and submission
  const {
    register,
    getValues,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(promptEditValidation),
  });

  useEffect(() => {
    const heights: any = [];
    currentPrompt.prompts?.map((prompt) => {
      const textareaId = `textarea${prompt.order}`;
      const textareaHeight = document.getElementById(textareaId)?.scrollHeight;

      heights.push({
        key: textareaId,
        value: `${textareaHeight}px`
      })
    })
    setTextareaHeight(heights)
  }, [])

  // Function to handle form submission
  const onSubmit = (data) => {
    currentPrompt.prompts.map((prompt) => {
      prompt.prompt_text = data?.[`prompt_text_${prompt.order}`]?.trim() ?? '';
    })
    dispatch(updateTopic(currentPrompt));
    setIsShowEdit(false);
  };

  const checkNameChange = () => {
    const name = getValues("name");
    if (name?.trim() !== currentPrompt?.name) {
      return true;
    }
    return false;
  }

  const checkPrompt = (order = null) => {
    let isChange = false;
    currentPrompt?.prompts.map(prompt => {
      const prompt_text = getValues(`prompt_text_${prompt.order}`);
      if (order && order !== prompt.order && prompt_text?.trim() !== prompt.prompt_text) {
        isChange = true;
      }
    })
    return isChange;
  }

  const checkDisableBtnSave = (field, text, order) => {
    let isEnable = false;

    if (field === 'name') {
      const isChangePrompt = checkPrompt();
      const isFeildChange = text.trim() !== currentPrompt?.name;
      isEnable = isFeildChange || isChangePrompt;

    } else if (field === 'prompt_text') {

      const isChangeName = checkNameChange();
      const isChangePrompt = checkPrompt(order);
      const isFeildChange = text.trim() !== currentPrompt?.prompts?.find(prompt => prompt.order === order)?.prompt_text;

      isEnable = isFeildChange || isChangeName || isChangePrompt;
    }

    setDisableBtnSave(!isEnable);
  }

  const getCurrentHeight = (key) => {
    const findData = textareaHeight.find(height => height?.key === key)
    return findData ? findData.value : 'auto';
  }

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
              onChange={(e) => checkDisableBtnSave("name", e.target.value, 0)}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              name="name"
              defaultValue={currentPrompt?.name}
            />
            <div className="invalid-feedback">
              {errors.name?.message}
            </div>
          </div>
          {currentPrompt?.prompts.sort(function (a, b) {
            return a.order < b.order ? -1 : 1;
          }).map((prompt) => {
            return (
              <div className="mb-3" key={prompt.uuid}>
                <label className="label-input">Prompt text {prompt.order}</label>
                <textarea
                  id={`textarea${prompt.order}`}
                  {...register(`prompt_text_${prompt.order}`)}
                  onChange={(e) => checkDisableBtnSave("prompt_text", e.target.value, prompt.order)}
                  className={`form-control ${errors.prompt_text_1 ? "is-invalid" : ""}`}
                  name={`prompt_text_${prompt.order}`}
                  defaultValue={prompt?.prompt_text}
                  style={{ height: getCurrentHeight(`textarea${prompt.order}`), overflow: 'hidden' }}
                />
              </div>
            )
          })}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className={classNames("btn-save", { "btn-disabled": disableBtnSave })}
            disabled={disableBtnSave}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
