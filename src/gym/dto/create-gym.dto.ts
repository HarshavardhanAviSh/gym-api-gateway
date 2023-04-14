import { Address } from "../entities/gym.entity";

export class CreateGymDto {
    gymId?: string;
    gymName: string;
    email: string;
    panNo: string;
    gstNo: string;
    aadhar?: string;
    address: Address;
    createdBy?: string;
    id: any;
}
