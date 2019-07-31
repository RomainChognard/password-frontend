import {Component, OnInit} from '@angular/core';
import {CredentialGroupDTO} from '../../model/CredentialGroupDTO';
import {CredentialService} from '../../service/credential.service';
import {SessionService} from '../../../shared/service/session.service';
import {CredentialDTO} from '../../model/CredentialDTO';
import {Observable} from 'rxjs';
import {MatDialog, MatSnackBar, MatTabChangeEvent} from '@angular/material';
import {CredentialDialogComponent} from '../../component/credential-dialog/credential-dialog.component';
import {ConfirmDialogComponent} from '../../component/confirm-dialog/confirm-dialog.component';

@Component({
   selector: 'app-credential-page',
   templateUrl: './credential-page.component.html',
   styleUrls: ['./credential-page.component.scss']
})
export class CredentialPageComponent implements OnInit {

   groups: CredentialGroupDTO[] = [];

   /**
    * Used to keep track of current group id
    * Since i cannot manage how to access current MatTab content I map mat tab index -> groupId
    */
   private _currentGroupId = 0;
   private _groupIds = new Map<number, number>();

   constructor(private _credentialService: CredentialService, private _sessionService: SessionService, private _dialog: MatDialog,
               private _matSnackBar: MatSnackBar) {
   }

   ngOnInit() {
      this._refreshDataSource();
   }

   /**
    * This method return credentials for current group and also register group in map
    * @param groupId the current group id
    */
   public getCredentials(groupId: number): Observable<CredentialDTO[]> {
      this._groupIds.set(this._groupIds.size, groupId);
      return this._credentialService.getCredentials(groupId);
   }

   /**
    * Callback method triggered by credential page when user click on "+" button
    */
   public addCredential(): void {
      const dialogRef = this._dialog.open(CredentialDialogComponent, {width: '250px'});
      dialogRef.afterClosed().subscribe((credential: CredentialDTO) => {
         if (credential !== undefined) {
            this._credentialService.createCredential(credential, this._currentGroupId).subscribe(val => this._refreshDataSource());
         }
      });
   }

   /**
    * Callback method triggered by list component when user click "Copy Password"
    * @param credential the credential to be decrypted and copied to the clipboard
    */
   public decryptAndCopyCredential(credential: CredentialDTO): void {
      this._credentialService.decryptPassword(this._currentGroupId, credential).subscribe(password => {
         this._copyToClipboard(password);
         this._matSnackBar.open('Password copied to clipboard', 'Ok', {duration: 2500});
      });
   }

   /**
    * Callback method triggered by list component when user click "Edit"
    * @param credential the credential to be edited
    */
   public editCredential(credential: CredentialDTO): void {
      const dialogRef = this._dialog.open(CredentialDialogComponent, {width: '250px', data: credential});
      dialogRef.afterClosed().subscribe((editedCredential: CredentialDTO) => {
         if (editedCredential !== undefined) {
            this._credentialService.editCredential(editedCredential, this._currentGroupId).subscribe(val => this._refreshDataSource());
         }
      });
   }

   /**
    * Callback method triggered by list component when user click "Delete"
    * @param credential the credential to be deleted
    */
   public deleteCredential(credential: CredentialDTO): void {
      const dialogRef = this._dialog.open(ConfirmDialogComponent, {width: '250px', data: 'Are you sure ?'});
      dialogRef.afterClosed().subscribe((status: boolean) => {
         if (status) {
            this._credentialService.deleteCredential(credential, this._currentGroupId).subscribe(val => this._refreshDataSource());
         }
      });
   }

   /**
    * Triggered by mat tab group each time the current tab change
    * used to update current group id
    * @param tabChangeEvent the mat tab change event
    */
   public tabChangeEvent(tabChangeEvent: MatTabChangeEvent) {
      this._currentGroupId = this._groupIds.get(tabChangeEvent.index);
   }

   private _refreshDataSource(): void {
      this._credentialService.getGroups().subscribe(groups => {
         this.groups = groups;
      });
   }

   private _copyToClipboard(value: string): void {
      const selBox: HTMLTextAreaElement = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = value;
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
   }
}
