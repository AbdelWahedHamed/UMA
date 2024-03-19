import { Injectable } from '@angular/core';
import { ForgotPasswordDto } from '../components/forget-password/ForgotPassword';
import { HttpClient } from '@angular/common/http';
import { ResetPasswordDto } from '../components/reset-passowrd/ResetPasswordDto';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthentationService {
  constructor(private http:HttpClient,private jwtHelper: JwtHelperService ) { }

  public forgotPassword = (route: string, body: ForgotPasswordDto) => {
    return this.http.post(this.createCompleteRoute(route, 'https://localhost:5001'), body);
  }

  public resetPassword = (route: string, body: ResetPasswordDto) => {
    return this.http.post(this.createCompleteRoute(route, 'https://localhost:5001'), body);
  }

  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }

 
}
