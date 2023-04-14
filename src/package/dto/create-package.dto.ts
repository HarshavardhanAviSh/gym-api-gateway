export class CreatePackageDto {
    id:string;
    name:string;
    description:string;
    imgUrl?:string;
    createdBy?:string;
    createdOn?:string
    services?:any
    amount:number;
    validFrom:string;
    validTo:string;
}
