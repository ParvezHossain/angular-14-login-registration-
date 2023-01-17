import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Status } from '../models/status';
import { AuthService } from '../services/auth.service';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
	status!: Status;
	form!: FormGroup;

	get f (){
		return this.form.controls; // needed for validation in html file
	}
	
	constructor(private signupService: SignupService, private formBuilder: FormBuilder, private authService: AuthService, private router: Router){}

	onPost(){
		
	}
}
