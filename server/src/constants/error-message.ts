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
  MONGO_ID_INVALID: "The MONGO ID you entered is invalid.",

  //post error messages

  POST_NOT_FOUND: "The post you’re looking for doesn’t exist.",
  NOT_ALLOWED_TO_POST: "You are not allowed to create a post.",
  NOT_ALLOWED_TO_DELETE: "You are not authorized to delete this post.",
  FAILED_TO_UPDATE: "Unable to update the post. Please try again later.",
  NOT_ALLOWED_TO_FOLLOW_YOURSELF: "You can't follow yourself.",
};
