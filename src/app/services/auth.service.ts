import { Router } from "@angular/router";
import { TokenService } from "./token.service";
import { JwtHelperService } from "@auth0/angular-jwt";
import { RefreshTokenRequest } from "../models/refresh-token-request";

export class AuthService {
    constructor(private router: Router, private tokenService: TokenService){}
    
    isLoggedIn (){
        return !!this.getAccessToken() && !!this.isTokenExpired();
    }

    addUserName(username: string){
        localStorage.setItem("username", username);
    }

    addAccessToken(accessToken: string){
        localStorage.setItem("accessToken", accessToken);
    }

    addRefreshToken(refreshToken: string){
        localStorage.setItem("refreshToken", refreshToken)
    }

    getAccessToken(){
        return localStorage.getItem("AccessToken");
    }

    getUsername () {
        return localStorage.getItem("username");
    }
    getRereshToken(){
        return localStorage.getItem("refreshToken");
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

    logout() {
        localStorage.removeItem("username");
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("refreshToken");
        this.router.navigate(['/login']);
    }

    getUserRole() {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(this.getAccessToken()??"");
        if (decodedToken) {
            const role = decodedToken[''];
            return role;
        }
        return "";
    }

    async refreshingToken(): Promise<boolean> {
        const token = this.getAccessToken();
        const refreshToken = this.getRereshToken();
        if(!token || !refreshToken){
            return false;
        }

        let success!: boolean;
        const data: RefreshTokenRequest = {
            accessToken: token,
            refreshToken: refreshToken
        } 

        this.tokenService.generateRefreshToken(data).subscribe({
            next: (response) => {
                this.addAccessToken(response.accessToken);
                this.addRefreshToken(response.refreshToken);
            },
            error: (error) => {
                console.log(error);
                success = false;
            }
        })

        return success;
    }
}