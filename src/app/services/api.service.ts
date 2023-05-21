import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  fetchAllTasks(): Observable<Task[]> {
    const url = `${this.baseUrl}/tasks`;
    return this.http.get<Task[]>(url);
  }
  createtask(body: any): Observable<Task> {
    const url = `${this.baseUrl}/tasks`;
    return this.http.post<Task>(url, body)
  }
}
