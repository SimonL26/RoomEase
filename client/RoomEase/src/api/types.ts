export interface GenericResponse {
  status: string;
  message: string;
}

export interface ILoginResponse {
  status: string;
  message: string;
  access_token: string;
}

export interface IUser {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface IUserResponse {
  status: string;
  data: {
    user: IUser;
  };
}
