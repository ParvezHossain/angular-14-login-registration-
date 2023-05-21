import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Task } from '../models/task';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent {
  form!: FormGroup;

  get f() {
    return this.form?.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      completed: ['', Validators.required],
    });

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
  onPost() {
    console.log(this.form.value);
    this.apiService.createtask(this.form.value).subscribe(
      (task: Task) => {
        console.log('created task: ', task);
        this.form.reset();
      },
      (error: any) => {
        console.error('Error occurred while fetching tasks:', error);
      }
    );
  }
}
