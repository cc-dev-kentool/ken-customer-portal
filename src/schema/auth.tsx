import * as Yup from "yup";

// LoginValidation schema to validate the username and password fields in login form
export const LoginValidation = Yup.object().shape({
  username: Yup.string().required("Email address is required.").email("Email is invalid."),
  password: Yup.string().required("Password is required."),
});

// LoginValidation schema to validate the username and password fields in login form
export const OtpValidation = Yup.object().shape({
  otp: Yup.string().required("OTP is required."),
});

// SendEmailForgotPasswordValidation schema to validate the email field in forgot password form
export const SendEmailForgotPasswordValidation = Yup.object().shape({
  username: Yup.string().required("Email is required.").email("Email is invalid."),
});

// ChangePasswordForgotPasswordValidation schema validates verify code, password and confirmPassword fields when resetting password.
export const NewPasswordValidation = Yup.object().shape({
  password: Yup.string()
    .required("New Password is required.")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"@#\$%\^&\*'()+-./:;<=>?[\]^{}|~_])(?=.{8,})/,
      "Password must be contain at least four out of the following: upper case letter, lower case letter, number, and special character."
    )
    .test("password", "Your password can't contain the part of your email address that comes before the @ sign.", function (value: any, a: any) {

      let result = true;
      if (a.parent.email?.trim()) {
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
  otp: Yup.string().required("OTP is required."),
  re_password: Yup.string()
    .required("Confirm Password is required.")
    .test("re_password", "The Confirm New Password does not match the New Password.", function (value: any, a: any) {
      let result = true;
      const password = a.parent.password?.trim();
      if (password && password !== value) {
          result = false;
      }
      return result
    }),
});

export const ChangePasswordValidation = Yup.object().shape({
  old_password: Yup.string()
    .required("Old Password is required."),
  password: Yup.string()
    .required("New Password is required.")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!"@#\$%\^&\*'()+-./:;<=>?[\]^{}|~_])(?=.{8,})/,
      "Password must be contain at least four out of the following: upper case letter, lower case letter, number, and special character."
    )
    .test("password", "Your password can't contain the part of your email address that comes before the @ sign.", function (value: any, a: any) {

      let result = true;
      if (a.parent.email?.trim()) {
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
  otp: Yup.string().required("OTP is required."),
  re_password: Yup.string()
    .required("Confirm Password is required.")
    .test("re_password", "The Confirm New Password does not match the New Password.", function (value: any, a: any) {
      let result = true;
      const password = a.parent.password?.trim();
      if (password && password !== value) {
          result = false;
      }
      return result
    }),
});

// MyAccountValidation schema validates name and phone_number fields in my account form.
export const MyAccountValidation = Yup.object().shape({
  name: Yup.string()
    .required("Full name is required.")
    .max(120, "Must be less than 121 characters."),
  phone_number: Yup.string()
    .required("Phone number is required.")
    .min(10, "Must be greater than 9 digits.")
    .max(20, "Must be less than 21 digits."),
});

// ChangePasswordMyAccountValidation schema validates old_password, new_password, and reenter_password fields
// when changing password in my account.
export const ChangePasswordMyAccountValidation = Yup.object().shape({
  old_password: Yup.string().required("Old password is required."),
  new_password: Yup.string()
    .required("New Password is required.")
    // The password must have at least:
    //   - one lowercase letter
    //   - one uppercase letter
    //   - one number
    //   - one special character (!@#$%^&*)
    //   - a length of 16 characters or more
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{16,})/,
      "Password must be at least 16 characters and contain at least three out of the following: upper case letter, lower case letter, number, and special character."
    ),
  reenter_password: Yup.string()
    .required("Re-enter New Password is required.")
    .oneOf([Yup.ref("new_password"), null], "Confirm password do not match."),
});