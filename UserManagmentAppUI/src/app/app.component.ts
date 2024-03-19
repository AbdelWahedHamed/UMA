import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  title = 'UserManagmentAppUI';
  showComponent: boolean = false;

 

  ngOnInit()
  {
    console.log(this.showComponent);
  }

  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url === '/' || val.url === '/SignUp' || val.url === '/resetPassword' || val.url === '/forget-password' ) {
          this.showComponent = false;
        } else {
          this.showComponent = true;
        }
      }
    });

  }
  
}