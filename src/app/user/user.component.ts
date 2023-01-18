import { Component, OnInit } from '@angular/core';
import { Status } from '../models/status';
import { ProtectorService } from '../services/protector.service';

@Component({
	selector: 'app-user',
	templateUrl: './user.component.html',
	styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
	status!: Status;

	constructor(private protectorService: ProtectorService){ }

	ngOnInit(): void {
		 this
		 .protectorService.getUserData().subscribe({
			next: (res) => {
				this.status = res
			},
			error: (error) => {
				console.log(error);
				
			}
		 })
	}
}
