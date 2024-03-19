import { UserGet } from "../User/UserGet"

 export interface RoleGet{
    id:number,
    name:string,
    users:UserGet[]

}