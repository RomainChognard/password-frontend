import {Component} from '@angular/core';
import {LoginService} from '../../service/login.service';
import {LoginEventModel} from '../../component/login/LoginEventModel';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TokenDTO} from '../../model/TokenDTO';

@Component({
   selector: 'app-login-page',
   templateUrl: './login-page.component.html',
   styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

   constructor(private _loginService: LoginService, private _router: Router, private _matSnackBar: MatSnackBar) {
   }

   public login(loginEventDto: LoginEventModel): void {
      this._loginService.login(loginEventDto).subscribe((token: TokenDTO) =>
         this._loginService.validateMasterPassword(token.testHash, loginEventDto.masterPassword).subscribe(value => {
            if (value) {
               this._loginService.handleLogin(token, loginEventDto.masterPassword);
               this._router.navigate(['/credentials']);
            } else {
               this._matSnackBar.open('Invalid master password', 'Ok', {duration: 2500});
            }
         })
      );
   }
}
