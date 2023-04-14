import { IsNumber, IsOptional } from "class-validator";

export class SignUpDTO {
userid:string;
    fullName: string;
    email: string;
    mobileNo: number;
    password: string;
    roles: USER_ROLE[];

}

export enum USER_ROLE {

    OWNER = "OWNER",
    MEMBER = "MEMBER",
    ADMIN = 'ADMIN'
}