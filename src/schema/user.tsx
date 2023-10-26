import * as Yup from "yup";

export const userEditValidation = Yup.object().shape({
  password: Yup.string().required("Password is required."),
});

export const userAddValidation = Yup.object().shape({
  email: Yup.string().required("Email address is required.").email("Email is invalid."),
  password: Yup.string().required("Password is required."),
});