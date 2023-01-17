import { Router } from "@angular/router";
import { TokenService } from "./token.service";

export class AuthService {
    constructor(private router: Router, private tokenService: TokenService){}
    
    isLoggedIn (){
        return !!this.getAccessToken() && !!this.isTokenExpired();
    }

    getAccessToken(){
        return localStorage.getItem("AccessToken");
    }

    isTokenExpired(){
        const token: string = this.getAccessToken()?? "";
        
        if (!token) return false;

        const tokenSplit: string = token.split(".")[1];
        const decodedString: string = atob(tokenSplit);
        const jsonString = JSON.parse(decodedString);
        const expiry = (jsonString).exp;
        
        return(Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
}