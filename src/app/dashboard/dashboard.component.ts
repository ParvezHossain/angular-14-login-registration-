import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { Task } from '../models/task';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  isLoggedIn = false;
  loggedInUser = '';
  taskList: Task[] = [];
  private baseUrl = environment.baseUrl;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.loggedInUser = this.authService.getUsername() || '';
      this.apiService.fetchAllTasks().subscribe(
        (tasks: Task[]) => {
          this.taskList = tasks;
        },
        (error: any) => {
          console.error('Error occurred while fetching tasks:', error);
        }
      );
    } else {
      this.logout();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
