import { Component , OnInit} from '@angular/core';
import { RoleServiceService } from '../../Service/Blog/role-service/role-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleGet } from './RoleGet';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';



@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit{
  roles:RoleGet[] = []
  
  constructor(private roleService:RoleServiceService
    , private location: Location , private router : Router) {
    
  }

  ngOnInit(): void {
    //this.roleService.GetRoles();
    this.GetRoles();

  }

  GetRoles():void
  { 
     this.roleService?.getRoles().subscribe(
      (response: any) => {
        // Check if the response contains the array of users
        if (Array.isArray(response)) {
          // Assign the array of users to this.users
          this.roles = response;
          console.log('Users:', this.roles);
        } else {
          this.roles = response.$values;
          console.log('Users:', this.roles);

        }})
     
  }

  DeleteRole(roleId : number)
  {
    this.roleService.deleteRole(roleId).subscribe(
      (next) => {
        
        console.log('Role deleted successfully.' , next);
      },
      (error) => {
        console.error('Error deleting role:', error);
        window.location.reload();
      }
    );
  }
   
}
