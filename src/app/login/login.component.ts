import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Status } from '../models/status';

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
	
	onPost(){
		
	}
}
