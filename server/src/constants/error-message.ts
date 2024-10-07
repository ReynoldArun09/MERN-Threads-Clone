export const ErrorMessages = {
  MONGO_ENV_NOT_DEFINED: "MONGO_URL environment variable is not defined.",
  MONGO_CONNECTION_ERROR: "Unknown error occurred while connecting to MongoDB.",

  //   general error messages
  INTERNAL_SERVER_ERROR: "Oops! Something went wrong. Please try again later.",

  //   user error messages
  INVALID_ID: "The ID you entered is invalid.",
  INVALID_TOKEN: "Authentication failed. Please provide a valid token.",
  USER_NOT_FOUND:
    "We couldn't find a user with that information. Please check and try again.",
  INVALID_PASSWORD: "The password you entered is incorrect. Please try again.",
  USER_ALREADY_EXISTS:
    "An account with this email already exists. Please try using a different one.",
};
