import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormGroup and FormBuilder
import { UserService } from 'src/app/Service/Blog/userService/user.service';
import { Router } from '@angular/router';
import { LoginModel } from './LoginModel';
import { AuthenticatedResponse } from './AuthenticatedResponse';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { AuthentationService } from 'src/app/Service/authentation.service';
import { GlobalVars } from 'src/app/Service/globaleVar';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
    
    invalidLogin: boolean = false;
    credentials: LoginModel = {username:'', password:''};
    constructor(private router: Router, private http: HttpClient , private auth:AuthentationService) { }
    ngOnInit(): void {
    }
    login = ( form: NgForm) => {
      if(this.credentials.username === "admin@gmail.com" ) 
        {GlobalVars.isAdmin = true}

      if (form.valid) {
        this.http.post<AuthenticatedResponse>("https://localhost:5001/api/auth/login", this.credentials, {
          headers: new HttpHeaders({ "Content-Type": "application/json"})
        })
        .subscribe({
          next: (response: AuthenticatedResponse) => {
            const token = response.token;
            localStorage.setItem("jwt", token); 
            this.invalidLogin = false; 
            this.router.navigate(["Home"]);
          },
          error: (err: HttpErrorResponse) => this.invalidLogin = true
        })
      }
    }
  }
  

