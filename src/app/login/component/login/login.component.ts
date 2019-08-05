import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LoginEventModel} from './LoginEventModel';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

   loginForm: FormGroup;

   @Output() loginEvent = new EventEmitter<LoginEventModel>();

   constructor(private _matSnackBar: MatSnackBar) {
   }

   ngOnInit(): void {
      this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
            masterPassword: new FormControl('', [Validators.required])
         }
      );
   }

   public login(): void {
      if (this.loginForm.valid) {
         this.loginEvent.emit(this.loginForm.value);
      } else {
         this._matSnackBar.open('Username / password cannot be empty', 'Close', {duration: 2500});
      }
   }
}
