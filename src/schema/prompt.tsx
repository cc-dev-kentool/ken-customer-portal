import * as Yup from "yup";

export const promptEditValidation = Yup.object().shape({
  name: Yup.string().required("Name topic is required."),
});

export const utilitiesValidation = Yup.object().shape({
  file_id: Yup.string().required("File Id is required."),
  prompt: Yup.string().required("Prompt topic is required."),
});