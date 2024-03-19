import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl ,FormGroup , Validators} from '@angular/forms';
import { AuthentationService } from 'src/app/Service/authentation.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ForgotPasswordDto } from './ForgotPassword';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit{
  forgotPasswordForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required])
  });
  
  successMessage: string ="";
  errorMessage: string = "";
  showSuccess: boolean = false;
  showError: boolean = false;
  
  constructor(private auth:AuthentationService){}

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl("", [Validators.required])
    })
  }
  
  public validateControl = (controlName: string) => {
    return this.forgotPasswordForm.get(controlName)?.invalid && this.forgotPasswordForm.get(controlName)?.touched
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.forgotPasswordForm.get(controlName)?.hasError(errorName)
  }

  public forgotPassword = (forgotPasswordFormValue : any) => {
    this.showError = this.showSuccess = false;
    const forgotPass = { ...forgotPasswordFormValue };

    const forgotPassDto: ForgotPasswordDto = {
      email: forgotPass.email,
      clientURI: 'http://localhost:4200/resetPassword'
    }

    this.auth.forgotPassword('api/Auth/ForgotPassword', forgotPassDto)
    .subscribe({
      next: (_) => {
      this.showSuccess = true;
      this.successMessage = 'The link has been sent, please check your email to reset your password.'
    },
    error: (err: HttpErrorResponse) => {
      this.showError = true;
      this.errorMessage = err.message;
    }})
  }
}
