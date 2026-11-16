import { userStatus } from '#domain/enums/user.ts';

export type createUserCommand = {
  name: string;
  lastName: string;
  nationalId: string;
  mobile: string;
  status: userStatus;
  password: string;
};

export type updateUserCommand = {
    id: string;
    email: string;
    password: string;
    role: string;
};

export type createCustomerCommand = {
    name: string;
    lastName: string;
    email: string;
    mobile: string;
};

export type loginUserCommand = {
    email: string;
    password: string;
};