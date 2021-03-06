import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ContentPageComponent } from './components/content-page/content-page.component';
import { SourcesPageComponent } from './components/sources-page/sources-page.component';


const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'pages', component: MainPageComponent, canActivate: [AuthGuardService] },
  { path: 'page/:id', component: ContentPageComponent, canActivate: [AuthGuardService] },
  { path: 'page/:id/content/:pid', component: SourcesPageComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
