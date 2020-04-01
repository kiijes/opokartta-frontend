import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ContentPageComponent } from './components/content-page/content-page.component';


const routes: Routes = [
  { path: '', component: MainPageComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginPageComponent },
  { path: 'page/:id', component: ContentPageComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
