export type UserDataType = {
  id: string;
  email: string;
  username: string;
  name: string;
  bio: string;
  profilePicture: string;
};

export type UserResponseType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePic: string;
  followers: [];
  following: [];
  bio: string;
  isFrozen: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type SuggestedUserResponseType = UserResponseType[];

export type ApiResponseType = {
  success: boolean;
  message: string;
};
