import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [
	{
		path: "", 
		redirectTo: "login", 
		pathMatch:"full"
	},
	{
		path: "login", 
		component: LoginComponent
	},
	{
		path: "logout",
		component: LogoutComponent
	},
	{
		path: "signup", 
		component: SignupComponent
	},
	{
			path: "dashboard", 
			component: DashboardComponent
	},
	{
			path: "admin-page", 
			component: AdminComponent
	},
	{
			path: "user-page", 
			component: UserComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
