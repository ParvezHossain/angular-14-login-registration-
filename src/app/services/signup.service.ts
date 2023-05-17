import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { LoginRequestModel } from '../models/loginReqModel';
import { LoginResponseModel } from '../models/login-response';
import { SignupRquestModel } from '../models/signupReqModel';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private baseUrl = environment.baseUrl;

  constructor(private http:HttpClient) { }

  login(model: LoginRequestModel){
    return this.http.post<LoginResponseModel>(this.baseUrl+"/user/login", model);
  }

  
  signup(model: SignupRquestModel){
    delete model.confirmPassword;
    return this.http.post<Status>(this.baseUrl+"/user/register", model)
  }

  changePassoword(model: LoginRequestModel){
    return this.http.post<Status>(this.baseUrl+"/changepassword", model)
  }

}
