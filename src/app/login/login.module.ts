import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LoginRoutingModule} from './login-routing.module';
import {LoginComponent} from './component/login/login.component';
import {LoginPageComponent} from './view/login-page/login-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {FormsModule} from '@angular/forms';

@NgModule({
   declarations: [LoginComponent, LoginPageComponent],
   imports: [
      CommonModule,
      LoginRoutingModule, MatFormFieldModule, FormsModule, MatInputModule, MatButtonModule, MatSnackBarModule
   ]
})
export class LoginModule {
}
