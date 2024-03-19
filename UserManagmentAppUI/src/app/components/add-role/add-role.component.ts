import { Component, OnDestroy } from '@angular/core';
import { AddRole } from './models/add-Role.module';
import { RoleServiceService } from '../../Service/Blog/role-service/role-service.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnDestroy{

  newRole:AddRole
  unsubscribe? : Subscription

  constructor(private roleService:RoleServiceService , private router : Router)
  {
    this.newRole ={
      Name:""
    }
  }


  onFormSubmit()
  {
    this.unsubscribe = this.roleService.addRole(this.newRole).subscribe({
      next: (response) =>{
        console.log('Success!!')
        this.router.navigateByUrl("/Role")
      },
      error: (response) =>{
        this.router.navigateByUrl("/Role")

      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe?.unsubscribe();
  }

}

