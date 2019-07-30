import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './component/login/login.component';
import {LoginGuard} from './login.guard';
import {LoginService} from './service/login.service';
import {LoginPageComponent} from './view/login-page/login-page.component';
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatSnackBarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

@NgModule({
   declarations: [LoginComponent, LoginPageComponent],
   imports: [
      CommonModule,
      LoginRoutingModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatSnackBarModule
   ], providers: [LoginGuard, LoginService]
})
export class LoginModule {
}
