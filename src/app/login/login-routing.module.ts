import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from './login.guard';
import {LoginPageComponent} from './view/login-page/login-page.component';

const routes: Routes = [{
   path: '',
   component: LoginPageComponent,
   canActivate: [LoginGuard]
}];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class LoginRoutingModule {
}
