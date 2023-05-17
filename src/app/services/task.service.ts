import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl: string = `${environment.baseUrl}` 

  constructor(private http: HttpClient) { }

  getAllTask(): any{
    const url = `${this.baseUrl}/tasks`
    return this.http.get(url)
  }
}
