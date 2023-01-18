import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { Status } from "../models/status";

@Injectable({
    providedIn: "root",
})
export class ProtectorService {
    private baseUrl = environment.baseUrl;
    constructor (private http: HttpClient) {}

    getUserData() {
        return this.http.get<Status>(this.baseUrl+"/user/getUserList")
    }
}