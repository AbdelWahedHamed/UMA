import { RoleOfUser } from "./user/RoleOfUser";
export interface UserGet{
    Id:number,
    Name:string,
    Email:string,
    PasswordHash:string,
    DateOfBirth:Date,
    RegisterationDate:Date,
    RoleId:number,
    Role:RoleOfUser,

}