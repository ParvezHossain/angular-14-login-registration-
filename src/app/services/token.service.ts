import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { RefreshTokenRequest } from "../models/refresh-token-request";

@Injectable({
    providedIn: "root",
})
export class TokenService {
    private baseUrl: string = environment.baseUrl+'/token'
    constructor(private http: HttpClient){}

    generateRefreshToken(data: RefreshTokenRequest){
        const url = this.baseUrl+"/refresh";
        return this.http.post<RefreshTokenRequest>(url, data);
    }

    revokeRefreshToken(){
        const url = this.baseUrl + "/revoke";
        return this.http.post(url, null);
    }

    }