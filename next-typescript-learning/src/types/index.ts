export type UserType = "USER" | "ADMIN";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
  name?: string;
};

export type LoginResponseData = {
  emailPasswordLogIn: {
    data: { token: string; refreshToken: string; user: User } | null;
  } | null;
};

export type CurrentUserResponseData = {
  currentUser: User | null;
};
