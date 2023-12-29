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
    .matches(EMAIL_REGREX, "Email is invalid.")
    .test("email", "Email is invalid.", function (value: any) {
      const chars = ['?', '[', ']', '(', ')', '{', '}', '*', '^', '~', '$']
      let isValid = false;
      chars.forEach(char => {
        if (value.includes(char)) {
          isValid = true;
        }
      })
      return !isValid;
    }),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"@#\$%\^&\*'()+-./:;<=>?[\]^{}|~_])(?=.{8,})/,
      "Password must be contain at least four out of the following: upper case letter, lower case letter, number, and special character."
    )
    .test("password", "Your password can't contain the part of your email address that comes before the @ sign.", function (value: any, a: any) {

      let result = true;
      if (a.parent.email.trim()) {
        let parts  = a.parent.email?.split('@');
        let domain = parts[0]?.split('.');
  
        let password = value.toLowerCase()
  
        domain.forEach(item => {
          let itemDomain = item.toLowerCase()
  
          if (itemDomain.includes(password) || password.includes(itemDomain)) {
            result = false;
          }
        })
      }
      
      return result
    }),
});
