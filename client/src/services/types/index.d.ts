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

export type PostResponseType = {
  _id: string;
  postedById: string;
  text: string;
  img: string;
  replies: RepliesType[];
  createdAt: Date;
  updatedAt: Date;
  likes: [];
};
