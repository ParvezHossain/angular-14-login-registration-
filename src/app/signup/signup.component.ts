import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mustmatch } from '../helpers/match-validate.validator';
import { ValidPattern } from '../helpers/patter-match.validator';
import { Status } from '../models/status';
import { SignupService } from '../services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
	constructor(private signupService: SignupService, private formBuilder: FormBuilder){}

	form!: FormGroup;
	status!: Status;

	get f () {
		return this.form.controls;
	}

	onPost(){
		console.log(this.form.value);
		
	}

	ngOnInit(): void {

		const patternRegex= new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*[#$^+=!*()@%&]).{6,}$');

		this.form = this.formBuilder.group({
			"name": ["", Validators.required],
			"email": ["", Validators.required],
			"username": ["", Validators.required],
			"password": ["", [Validators.required, ValidPattern(patternRegex)]],
			"confirmPassword": ["", Validators.required],
		}, {
			validator: Mustmatch("password", "confirmPassword")
		})
	}
}
