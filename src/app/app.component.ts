import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  roles: string = "";
  isLoggedIn!: boolean;

  constructor( private authService: AuthService){}

  logout() {
	this.authService.logout();
  }

  checkLoggedInUser(){
	this.isLoggedIn = this.authService.isLoggedIn();
	this.roles = this.authService.getUserRole();
  }
}
