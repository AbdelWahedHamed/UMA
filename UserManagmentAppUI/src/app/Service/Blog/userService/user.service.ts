import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserGet } from 'src/app/components/User/UserGet';
import { AddUser } from 'src/app/components/User/AddUser';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  logged:boolean = false
  users:UserGet[] =[]
  url = 'https://localhost:5001/api/User';
  adminMail:string = "admin@gmail.com" 


  constructor(private http:HttpClient) { }

  addUser(newUser:AddUser): Observable<void>
  {
    return this.http.post<void>(this.url,newUser);
  }
  
  getUsers(): Observable<any>
  {
    return this.http.get<any>(this.url);
  }

  

  deleteUsers(deletedUserId:number): Observable<void> 
  {
    return this.http.delete<void>(this.url + '/' + deletedUserId);
  }

  signIn(email: string, password: string): Observable<boolean> 
  {
    return this.http.get<boolean>(this.url + '/' + email + '/' + password );
  }
}






