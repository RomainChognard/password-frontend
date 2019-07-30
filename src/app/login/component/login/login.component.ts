import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginEventModel} from './LoginEventModel';
import {MatSnackBar} from '@angular/material';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   loginEventModel: LoginEventModel = {} as LoginEventModel;

   @Output() loginEvent = new EventEmitter<LoginEventModel>();

   constructor(private _matSnackBar: MatSnackBar) {
   }

   ngOnInit() {
   }

   public login(): void {
      if (this.loginEventModel.username !== undefined && this.loginEventModel.password !== undefined) {
         this.loginEvent.emit(this.loginEventModel);
      } else {
         this._matSnackBar.open('Username / password cannot be empty', 'Close', {duration: 2500});
      }
   }
}
