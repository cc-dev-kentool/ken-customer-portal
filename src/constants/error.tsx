// Define an object called "error" that contains various error messages mapped to corresponding error codes or type of errors.
export const error = {
    "UserNotFoundException": "This account does not exist!",
    "NotAuthorizedException": "The email or password you entered is incorrect, please try again!",
    "PasswordExpireException": "Your password has expired. Please change your password in order to log in.",
    "DuplicatedPasswordException": "Your password cannot be the same with one of your last 3 previous passwords!",
    "ExpiredCodeException": "This verification code is expired!",
    "CodeMismatchException": "This verification code is incorrect!",
    "UserNotConfirmedException": "The account has not been activated. Please check the confirmation email to activate your account.",
    "InvalidPasswordException": "The current password is incorrect. Please try again!",
    "LimitExceededException": "Your request exceeds one of the limits for this account, please try again later.",
    "ForceChangePasswordException": "The account has been reset password by admin. Please check the login information email to activate your account.",
    "EmailExistException": "This email already exists. Please try another one!",
    "UsernameExistException": "This username already exists. Please try another one!",
    // input an existing geotechnic sample id.
    "GeotechnicSampleIdAlreadyExisted": "The Sample ID already exists.",
    "TestingServiceDoesNotExist": "Invalid service name in AGS4 file. The value for LBST_TEST should be the same as the value of Display Name field in Adit's Testing Scope.",
    "TestingServiceDoesNotBelongsToTheSameMaterial": "Wrong book test service. Please make sure the test service belong to the same material with the sample.",
    "PermissionDeniedAgsImport": "Cannot import this file. You don't have permission on this project.",
    "TestingRequestBelongsToAnotherProject": "Cannot import this file. The testing request already belongs to another project.",
    "SampleBelongsToAnotherProject": "Cannot import this file. The sample already belongs to another project.",
    "TopicExistException": "Topic exist exception!",
    "User exists, canot register again!": "User exists, canot register again!",
    "RecordNotFound": "File not found!",

}

// Define an object called "code" that contains a generic error message mapped to a specific error code.
export const code = {
    "502": "The server encountered a temporary error and could not complete your request, please try again!"
}
