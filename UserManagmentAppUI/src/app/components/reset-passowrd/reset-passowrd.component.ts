import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ResetPasswordDto } from './ResetPasswordDto';
import { AuthentationService } from 'src/app/Service/authentation.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-reset-passowrd',
  templateUrl: './reset-passowrd.component.html',
  styleUrls: ['./reset-passowrd.component.css']
})
export class ResetPasswordComponent implements OnInit {
  email: string = "";
  resetPasswordForm:FormGroup = new FormGroup({
    password: new FormControl("", [Validators.required]),
    confirm: new FormControl("", )
  });

  showSuccess: boolean = false;
  showError: boolean = false;
  errorMessage: string = "";

  constructor(
    private authService: AuthentationService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = new FormGroup({
      password: new FormControl("", [Validators.required]),
      confirm: new FormControl("", )
    });
   this.email = this.route.snapshot.queryParams['email'];

  }

  

  public validateControl = (controlName: string) => {
    return this.resetPasswordForm.get(controlName)?.invalid && this.resetPasswordForm.get(controlName)?.touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.resetPasswordForm.get(controlName)?.hasError(errorName)
  }

  resetPassword(resetPasswordFormValue: any): void {
    this.showError = this.showSuccess = false;
    const resetPass = { ...resetPasswordFormValue };
    const resetPassDto: ResetPasswordDto = {
      password: resetPass.password,
      confirmPassword: resetPass.confirm,
      email: this.email
    }
    this.authService.resetPassword('api/Auth/ResetPassword', resetPassDto)
    .subscribe({
      next:(_) => this.showSuccess = true,
    error: (err: HttpErrorResponse) => {
      this.showError = true;
      this.errorMessage = err.message;
    }})  
  }
}
