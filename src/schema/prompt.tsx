import * as Yup from "yup";

export const promptEditValidation = Yup.object().shape({
  name: Yup.string().required("Name topic is required."),
});