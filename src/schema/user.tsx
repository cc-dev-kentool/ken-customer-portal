import * as Yup from "yup";
const EMAIL_REGREX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const userEditValidation = Yup.object().shape({
  password: Yup.string().required("Password is required."),
});

export const userAddValidation = Yup.object().shape({
  email: Yup.string()
    .required("Email address is required.")
    .email("Email is invalid.")
    .matches(EMAIL_REGREX, "Email is invalid."),
  password: Yup.string().required("Password is required."),
});
