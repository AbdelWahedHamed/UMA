import { Component , OnDestroy } from '@angular/core';
import { AddUser } from '../User/AddUser';
import { RoleGet } from '../role/RoleGet';
import { UserService } from 'src/app/Service/Blog/userService/user.service';
import { RoleServiceService } from 'src/app/Service/Blog/role-service/role-service.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnDestroy{
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
        this.router.navigateByUrl("")
      },
      error: (response) =>{
        console.log('error heppened :',response)
        this.router.navigateByUrl("")
      }
    });
  }
  Navagate(){
    this.router.navigateByUrl("")

  }

  ngOnDestroy(): void {
    this.unsubscribe?.unsubscribe();
  }

}
