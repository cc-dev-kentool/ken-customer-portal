import * as Yup from "yup";

// LoginValidation schema to validate the username and password fields in login form
export const LoginValidation = Yup.object().shape({
  username: Yup.string().required("Email address is required.").email("Email is invalid."),
  password: Yup.string().required("Password is required."),
});

// SendEmailForgotPasswordValidation schema to validate the email field in forgot password form
export const SendEmailForgotPasswordValidation = Yup.object().shape({
  email: Yup.string().required("Email is required.").email("Email is invalid."),
});

// ChangePasswordForgotPasswordValidation schema validates verify code, password and confirmPassword fields when resetting password.
export const ChangePasswordForgotPasswordValidation = Yup.object().shape({
  code: Yup.string().required("Verify code is required."),
  password: Yup.string()
    .required("Password is required.")
    // The password must have at least:
    //   - one lowercase letter
    //   - one uppercase letter
    //   - one number
    //   - one special character (!@#$%^&*)
    //   - a length of 16 characters or more
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{16,})/,
      "The password is not strong enough. Make sure it follows the rules below."
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords do not match."),
});

// FirstTimeResetPasswordValidation schema validates password and confirmPassword fields when creating a new password for the first time.
export const FirstTimeResetPasswordValidation = Yup.object().shape({
  password: Yup.string()
    .required("New Password is required.")
    // The password must have at least:
    //   - one lowercase letter
    //   - one uppercase letter
    //   - one number
    //   - one special character (~`!@#$%^&*()_+-=[]{};:'"\|,.<>/?)
    //   - a length of 16 characters or more
    .matches(
      // eslint-disable-next-line
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{16,})/,
      "The password is not strong enough. Make sure it follows the rules below."
    ),
  confirmPassword: Yup.string()
    .required("Re-enter New Password is required.")
    .oneOf([Yup.ref("password"), null], "Passwords do not match."),
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

// SizeValidate schema validates width, height, quantity fields for a product size.
export const SizeValidate = Yup.object().shape({
  width: Yup.string()
    .required("Width is required.")
    .test(
      "width",
      "Must be a natural number between 250px and 1100px.",
      function (value: any) {
        return Number.isInteger(Number(value));
      }
    )
    .test(
      "width",
      "Must be a natural number between 250px and 1100px.",
      function (value: any) {
        if (value >= 250 && value <= 1100) {
          return true;
        }
        return false;
      }
    ),
  height: Yup.string()
    .required("Height is required")
    .max(99, "Must be less than 99 digits."),
  quantity: Yup.string()
    .required("Quantity is required.")
    .test(
      "quantity",
      "Must be a natural number between 1 and 30.",
      function (value: any) {
        return Number.isInteger(Number(value));
      }
    )
    .test(
      "quantity",
      "Must be a positive integer number between 1 and 30.",
      function (value: any) {
        if (value > 0 && value <= 30) {
          return true;
        } else return false;
      }
    ),
});

/*
 * The following code contains a validation schema using Yup for editing a business.
 */

// Validation schema for editing a business
export const EditBusinessValidation = Yup.object().shape({
  // Business name field is a required string with at most 255 characters allowed
  business_name: Yup.string()
    .required("Legal Business Name is required.")
    .max(255, "Must be less than 256 characters."),

  // Business number field is an optional string that must be 11 digits with [Aus] or 13 digits with [NZ]
  business_number: Yup.string()
    .notRequired()
    .test(
      "business_number",
      "Must be 11 digits with [Aus] or 13 digits with [NZ].",
      function (value: any) {
        if (value.length === 0) {
          return true;
        }
        if ([11, 13].includes(value.length)) {
          return true;
        }
        return false;
      }
    ),

  // GST field is an optional string that must be 9 digits with [NZ] or 11 digits with [Aus]
  gst: Yup.string()
    .notRequired()
    .test(
      "gst",
      "Must be 9 digits with [NZ] or 11 digits with [Aus].",
      function (value: any) {
        if (value.length === 0) {
          return true;
        }
        if ([9, 11].includes(value.length)) {
          return true;
        }
        return false;
      }
    ),

  /*
   * The following code contains a validation schema using Yup for an address form.
   */

  // Validation schema for the address form
  address_1: Yup.string().max(255, "Must be less than 256 characters."),
  address_2: Yup.string()
    .max(150, "Must be less than 151 characters.")
    .required("Street Address is required."),
  country: Yup.string().required("Country is required."),
  zip_code: Yup.string()
    .required("Postal Code is required.")
    .min(2, "Must be more than 1 number.")
    .max(6, "Must be less than 7 numbers."),
  state: Yup.string().when("country", {
    is: "Australia",
    then: Yup.string().required("State is required."),
  }),
  city: Yup.string()
    .required("Town/City is required.")
    .max(255, "Must be less than 256 characters."),

  suburb: Yup.string().max(255, "Must be less than 256 characters."),

  // Billing address fields which are optional depending on whether billing address is same as above
  billing_address_1: Yup.string().when("is_billing_address_same", {
    // If billing address is different, billing address line 1 must be a string with at most 255 characters
    is: "false",
    then: Yup.string().max(255, "Must be less than 256 characters."),
  }),
  billing_address_2: Yup.string().when("is_billing_address_same", {
    // If billing address is different, billing address line 2 must be a required string with at most 150 characters
    is: "false",
    then: Yup.string()
      .required("Street Address is required.")
      .max(150, "Must be less than 151 characters."),
  }),
  billing_country: Yup.string().when("is_billing_address_same", {
    // If billing address is different, country field must be a required string
    is: "false",
    then: Yup.string().required("Country is required."),
  }),
  billing_zip_code: Yup.string().when("is_billing_address_same", {
    // If billing address is different, zip code field must be a required string with at least 2 and at most 6 characters
    is: "false",
    then: Yup.string()
      .required("Postal Code is required.")
      .min(2, "Must be more than 1 number.")
      .max(6, "Must be less than 7 numbers."),
  }),
  billing_state: Yup.string().when("is_billing_address_same", {
    // If billing address is different and Australia is selected as country, state field must be a required string
    is: "false",
    then: Yup.string().when("billing_country", {
      is: "Australia",
      then: Yup.string().required("State is required."),
    }),
  }),
  billing_city: Yup.string().when("is_billing_address_same", {
    // If billing address is different, city field must be a required string with at most 255 characters
    is: "false",
    then: Yup.string()
      .required("Town/City is required.")
      .max(255, "Must be less than 256 characters."),
  }),
  billing_suburb: Yup.string().when("is_billing_address_same", {
    // If billing address is different, suburb field must be a string with at most 255 characters
    is: "false",
    then: Yup.string().max(255, "Must be less than 256 characters."),
  }),

  // Validation schema for the shipping form
  shipping_suburb: Yup.string().when("is_shipping_address_same", {
    // If shipping address is different, suburb field must be a string with at most 255 characters
    is: "false",
    then: Yup.string().max(255, "Must be less than 256 characters."),
  }),
  shipping_address_1: Yup.string().when("is_shipping_address_same", {
    // If shipping address is different, shipping address line 1 must be a string with at most 255 characters
    is: "false",
    then: Yup.string().max(255, "Must be less than 256 characters."),
  }),
  shipping_address_2: Yup.string().when("is_shipping_address_same", {
    // If shipping address is different, shipping address line 2 must be a required string with at most 150 characters
    is: "false",
    then: Yup.string()
      .required("Street Address is required.")
      .max(150, "Must be less than 151 characters."),
  }),
  shipping_country: Yup.string().when("is_shipping_address_same", {
    // If shipping address is different, country field must be a required string
    is: "false",
    then: Yup.string().required("Country is required."),
  }),
  shipping_zip_code: Yup.string().when("is_shipping_address_same", {
    // If shipping address is different, zip code field must be a required string with at least 2 and at most 6 characters
    is: "false",
    then: Yup.string()
      .required("Postal Code is required.")
      .min(2, "Must be more than 1 number.")
      .max(6, "Must be less than 7 numbers."),
  }),
  shipping_state: Yup.string().when("is_shipping_address_same", {
    // If shipping address is different and Australia is selected as country, state field must be a required string
    is: "false",
    then: Yup.string().when("shipping_country", {
      is: "Australia",
      then: Yup.string().required("State is required."),
    }),
  }),
  shipping_city: Yup.string().when("is_shipping_address_same", {
    // If shipping address is different, city field must be a required string with at most 255 characters
    is: "false",
    then: Yup.string()
      .required("Town/City is required.")
      .max(255, "Must be less than 256 characters."),
  }),

  // Validation schema for the account owner details
  admin_name: Yup.string().required("Account Owner Name is required."),
  admin_position: Yup.string().required("Position is required."),
  phone_number: Yup.string()
    .required("Phone number is required.")
    .min(10, "Must be greater than 9 digits.")
    .max(20, "Must be less than 21 digits."),
});
