export type UserDataType = {
  id: string;
  email: string;
  username: string;
  name: string;
  bio: string;
  profilePicture: string;
  website: string;
};

export type UserResponseType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePicture: string;
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

export type PostSchemaExtendedType = {
  text: string;
  img?: string;
  postedById: string;
};

export type RepliesType = {
  _id: string;
  text: string;
  userId: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
  profilePicture: string;
};
