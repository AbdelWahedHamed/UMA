import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddRole } from '../../../components/add-role/models/add-Role.module';
import { HttpClient } from '@angular/common/http';
import { RoleGet } from '../../../components/role/RoleGet';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  roles:RoleGet[] =[]
  url = 'https://localhost:5001/api/Role';


  constructor(private http:HttpClient) { }

  addRole(newRole:AddRole): Observable<void>
  {
    return this.http.post<void>(this.url,newRole);
  }
  
  getRoles(): Observable<any>
  {
    return this.http.get<any>(this.url);
  }

 /* GetRoles2(){
    this.http.get('https://localhost:7256/api/Role').subscribe(
      {
        next: res =>{
          this.roles = res as RoleGet[]
        },
        error : err => {console.log(err)}
      }
    )
    console.log(this.roles);
  }*/

  deleteRole(deletedRoleId: number): Observable<void> {
  
  return this.http.delete<void>(this.url +'/' + deletedRoleId);
}
}
