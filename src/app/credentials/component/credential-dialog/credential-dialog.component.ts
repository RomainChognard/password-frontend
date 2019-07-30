import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CredentialDTO} from '../../model/CredentialDTO';
import {PasswordGeneratorService} from '../../../shared/service/password-generator.service';

@Component({
   selector: 'app-credential-dialog',
   templateUrl: './credential-dialog.component.html',
   styleUrls: ['./credential-dialog.component.scss']
})
export class CredentialDialogComponent implements OnInit {

   private static DEFAULT_PASSWORD_SIZE = 12;

   autoGeneratePassword: boolean;

   constructor(private _dialogRef: MatDialogRef<CredentialDialogComponent>, private _passwordGeneratorService: PasswordGeneratorService,
               @Inject(MAT_DIALOG_DATA) public data: CredentialDTO) {
   }

   ngOnInit() {
      // Mode new
      if (this.data === undefined || this.data === null) {
         this.data = {id: undefined, context: '', login: '', password: '', tsvEnabled: false, lastUpdate: undefined};
      }
   }

   saveCredential(): void {
      if (this.autoGeneratePassword) {
         this.data.password = this._passwordGeneratorService.generatePassword(CredentialDialogComponent.DEFAULT_PASSWORD_SIZE);
      }
      this._dialogRef.close(this.data);
   }

   close(): void {
      this._dialogRef.close();
   }
}
