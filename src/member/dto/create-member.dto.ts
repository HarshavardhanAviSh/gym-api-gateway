export class CreateMemberDto {
    memberId?: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    password: string;   
    roles: string[];
    gymId: string;
}
