import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { JwtModule } from "@auth0/angular-jwt";



import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoleComponent } from './components/role/role.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { BlogComponent } from './components/Blog/blog/blog.component';
import { AddBlogComponent } from './components/Blog/add-blog/add-blog.component';
import { UserComponent } from './components/User/user/user.component';
import { AddUserComponent } from './components/User/add-user/add-user.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { AuthGuard } from './gaurd/login-auth.guard';
import { ResetPasswordComponent } from './components/reset-passowrd/reset-passowrd.component';
import { AdminGuard } from './gaurd/auth.guard';

export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

const appRoutes: Routes = [
  { path: 'Role', 
    component:  RoleComponent,
    canActivate: [AuthGuard,AdminGuard]
  },
  {
    path: "Role/add-role",
    component: AddRoleComponent,
    canActivate: [AuthGuard,AdminGuard]
  },
  { path: 'Blog', 
    component:  BlogComponent,
    canActivate: [AuthGuard]

  },
  {
    path: "Blog/add-blog",
    component: AddBlogComponent,
    canActivate: [AuthGuard]

  },
  { path: 'User', 
    component:  UserComponent,
    canActivate: [AuthGuard,AdminGuard]

  },
  {
    path: "User/add-user",
    component: AddUserComponent,
    canActivate: [AuthGuard , AdminGuard],
  },
  {
    path: "",
    component: LoginPageComponent
  },
  {
    path: "Home",
    component: HomePageComponent,
    canActivate: [AuthGuard]

  },
  {
    path: "SignUp",
    component: SignUpComponent
  },
  {
    path: "forget-password",
    component: ForgetPasswordComponent
  },
  {
    path: "resetPassword",
    component: ResetPasswordComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RoleComponent,
    AddRoleComponent,
    BlogComponent,
    AddBlogComponent,
    UserComponent,
    AddUserComponent,
    LoginPageComponent,
    HomePageComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [Location],
  bootstrap: [AppComponent]
})
export class AppModule { }
