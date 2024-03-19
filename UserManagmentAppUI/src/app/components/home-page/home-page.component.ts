import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthentationService } from 'src/app/Service/authentation.service';
import { GlobalVars } from 'src/app/Service/globaleVar';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  
  constructor(private jwtHelper: JwtHelperService , private router:Router , private auth:AuthentationService) { }

  isUserAuthenticated = (): boolean => {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    return false;
    }

  logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate([""]);
  }

  ngOnInit(): void {
    console.log(GlobalVars.isAdmin)
  }
}
