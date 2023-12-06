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

  const checkDisableBtnSave = () => {
    let isDisable = true;

    const name = getValues("name")?.trim();
    if (name !== currentPrompt?.topic_name) {
      isDisable = false;
    }

    currentPrompt?.prompts.map(prompt => {
      const prompt_text = getValues(`prompt_text_${prompt.order}`)?.trim();
      if (prompt_text !== prompt.prompt_text) {
        isDisable = false;
      }
    })

    setDisableBtnSave(isDisable);
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
              onChange={(e) => checkDisableBtnSave()}
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
                  onChange={(e) => checkDisableBtnSave()}
                  className={`form-control ${errors.prompt_text_1 ? "is-invalid" : ""}`}
                  name={`prompt_text_${prompt.order}`}
                  defaultValue={prompt?.prompt_text}
                  style={{ height: getCurrentHeight(`textarea${prompt.order}`), overflow: 'hidden' }}
                />
              </div>
            )
          })}
          {/* <div className="mb-3">
            <label className="label-input">Text 1</label>
            <textarea
              id="textarea1Element"
              {...register("prompt_text_1")}
              onChange={(e) => checkDisableBtnSave("prompt_text_1", e.target.value.trim())}
              className={`form-control ${errors.prompt_text_1 ? "is-invalid" : ""}`}
              name="prompt_text_1"
              defaultValue={currentPrompt?.prompts[0]?.prompt_text}
              style={{ height: textarea1Height, overflow: 'hidden' }}
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
              onChange={(e) => checkDisableBtnSave("prompt_text_2", e.target.value.trim())}
              className={`form-control ${errors.prompt_text_2 ? "is-invalid" : ""}`}
              name="prompt_text_2"
              defaultValue={currentPrompt?.prompts[1]?.prompt_text}
              style={{ height: textarea2Height, overflow: 'hidden' }}
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
              onChange={(e) => checkDisableBtnSave("prompt_text_3", e.target.value.trim())}
              className={`form-control ${errors.prompt_text_3 ? "is-invalid" : ""}`}
              name="prompt_text_3"
              defaultValue={currentPrompt?.prompts[2]?.prompt_text}
              style={{ height: textarea3Height, overflow: 'hidden' }}
            />
            <div className="invalid-feedback">
              {errors.prompt_text_3?.message}
            </div>
          </div> */}
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
