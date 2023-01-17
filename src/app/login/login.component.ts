import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Status } from '../models/status';
import { AuthService } from '../services/auth.service';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
	status!: Status;
	form!: FormGroup;

	get f (){
		return this.form.controls; // needed for validation in html file
	}
	
	constructor(private signupService: SignupService, private formBuilder: FormBuilder, private authService: AuthService, private router: Router){}

	onPost() {
		 this.status = { statusCode: 0, message: "wait...."  };
	
		this.signupService.login(this.form.value).subscribe({
			next: (res) => {
				// save username, accesstoken and refresh token into localStorage
				this.authService.addAccessToken(res.token);
				this.authService.addRefreshToken(res.refreshToken);
				this.authService.addUserName(res.username);
				// this.status.statusCode = res.statusCode;
				// this.status.message = res.message;
				// if(res.statusCode==1){
				// 	this.router.navigate(['./dashboard']);
				// }
			},

			error: (error) => {
				console.error(error);
				this.status.statusCode = 0;
				this.status.message = "Server error!";
			}
		})
	}

	ngOnInit(): void {
		this.form = this.formBuilder.group({
			'username':['',Validators.required],
      		'password':['',Validators.required]
		})

		if( this.authService.isLoggedIn()) {
			this.router.navigate(["/"]);
		}
	}

}
