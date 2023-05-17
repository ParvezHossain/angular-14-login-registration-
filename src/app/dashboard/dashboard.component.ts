import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn = false;
  loggedInUser = '';
  taskList: any[] = [];
  private baseUrl = environment.baseUrl;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.loggedInUser = this.authService.getUsername() || '';
      this.fetchAllTasks();
    }else{
      this.logout();
    }
  }

  fetchAllTasks(): void {
    this.getAllTask().subscribe(
      (result: any[]) => {
        this.taskList = result;
      },
      (error: any) => {
        console.error('Error occurred while fetching tasks:', error);
      }
    );
  }

  getAllTask(): Observable<any[]> {
    const url = `${this.baseUrl}/tasks`;
    return this.http.get<any[]>(url);
  }

  logout(): void {
    this.authService.logout();
  }
}
