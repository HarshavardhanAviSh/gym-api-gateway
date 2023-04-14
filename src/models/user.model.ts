import { USER_ROLE } from "src/auth/dtos/signup.dto";

export interface User {

    userId?: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    password: string;
    token: string;

    roles: USER_ROLE[];
}