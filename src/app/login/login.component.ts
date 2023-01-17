import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Status } from '../models/status';
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
		return this.form.controls;
	}
	
	constructor(private signupService: SignupService, private formBuilder: FormBuilder){}

	onPost(){
		
	}
}
