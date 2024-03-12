import { RoleGet } from "../role/RoleGet"

export interface UserGet{
    id:number,
    name:string,
    email:string,
    password:string,
    DOB:Date,
    RegesterDate:Date,
    roleId:number,
    role:RoleGet,

}