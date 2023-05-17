import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { InterceptorService } from './services/interceptor.service';
import { LogoutComponent } from './logout/logout.component';
import { TokenInterceptorService } from './interceptors/token-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    UserComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: InterceptorService, 
      multi: true
    },{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
