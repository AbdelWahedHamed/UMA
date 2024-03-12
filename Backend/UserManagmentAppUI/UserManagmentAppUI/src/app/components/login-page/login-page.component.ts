import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';
import { UserService } from 'src/app/Service/Blog/userService/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{
  email:string = ''
  password:string = ''
  loginForm!:FormGroup
  constructor(private userService:UserService , private fb:FormBuilder)
    {} 

    ngOnInit(): void {
      /*this.loginForm = this.fb.group({
        email : ['',Validators.required],
        password : ['',Validators.required]
      })*/
      
    }
 
 
  SignIn(email:string,password:string):void
  {
    this.userService.signIn(email,password).subscribe(
      (next) => {
        this.userService.logged = true
        console.log('user login .' , next , this.userService.logged);
      },
      (error) => {
        console.error('Error while login:', error);
      }
    );
  }
}
