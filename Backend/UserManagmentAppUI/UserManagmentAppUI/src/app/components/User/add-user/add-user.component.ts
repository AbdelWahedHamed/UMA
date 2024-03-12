import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AddUser } from '../AddUser';
import { UserService } from 'src/app/Service/Blog/userService/user.service';
import { RoleGet } from '../../role/RoleGet';
import { RoleServiceService } from 'src/app/Service/Blog/role-service/role-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnDestroy{
  newUser:AddUser
  unsubscribe? : Subscription
  roles:RoleGet[] = []

  constructor(private userService:UserService , private router : Router,roleService:RoleServiceService)
  {
    this.newUser ={
      name:"",
      email:"",
      password:"",
      DOB:new Date(),
      roleId:0
    }
    /*roleService.getRoles().subscribe( (roles) => {
      this.roles = roles;
      console.log('Roles:', this.roles); 
    },
    (error) => {
      console.error('Error fetching roles:', error);
    }
    );*/
  }


  onFormSubmit()
  {
    this.unsubscribe = this.userService.addUser(this.newUser).subscribe({
      next: (response) =>{
        console.log('Success!!')
        this.router.navigateByUrl("/User")
      },
      error: (response) =>{
        console.log('error heppened :',response)
        this.router.navigateByUrl("/User")

      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.unsubscribe();
  }

}
