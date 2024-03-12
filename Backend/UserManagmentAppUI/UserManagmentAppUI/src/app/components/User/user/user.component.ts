import { Component , OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { UserGet } from '../UserGet';
import { AddUser } from '../AddUser';
import { UserService } from 'src/app/Service/Blog/userService/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  users:UserGet[] = []
  
  constructor(private userService:UserService
    , private location: Location , private router : Router) {
    
  }

  ngOnInit(): void {
    //this.roleService.GetRoles();
    this.GetUsers();

  }

  GetUsers(): void {
    this.userService?.getUsers().subscribe(
      (response: any) => {
        if (Array.isArray(response)) {
          this.users = response;
          console.log('Users:', this.users);
        } else {
          this.users = response.$values;
          console.log('Users:', this.users);

        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  DeleteUser(userId : number)
  {
    this.userService.deleteUsers(userId).subscribe(
      () => {
        console.log('user deleted successfully.');
        window.location.reload();

      },
      (error) => {
        console.error('Error deleting user:', error);
        window.location.reload();
      }
    );
  }
}
