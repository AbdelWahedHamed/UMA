import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RoleComponent } from './components/role/role.component';
import { AddRoleComponent } from './components/add-role/add-role.component';
import { FormsModule } from '@angular/forms';
import { BlogComponent } from './components/Blog/blog/blog.component';
import { AddBlogComponent } from './components/Blog/add-blog/add-blog.component';
import { Location } from '@angular/common';
import { UserComponent } from './components/User/user/user.component';
import { AddUserComponent } from './components/User/add-user/add-user.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const appRoutes: Routes = [
  { path: 'Role', 
    component:  RoleComponent
  },
  {
    path: "Role/add-role",
    component: AddRoleComponent
  },
  { path: 'Blog', 
    component:  BlogComponent
  },
  {
    path: "Blog/add-blog",
    component: AddBlogComponent
  },
  { path: 'User', 
    component:  UserComponent
  },
  {
    path: "User/add-user",
    component: AddUserComponent
  },
  {
    path: "",
    component: LoginPageComponent
  },
  {
    path: "Home",
    component: HomePageComponent
  },
  {
    path: "SignUp",
    component: SignUpComponent
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
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    FormsModule,
    HttpClientModule
  ],
  providers: [Location],
  bootstrap: [AppComponent]
})
export class AppModule { }
