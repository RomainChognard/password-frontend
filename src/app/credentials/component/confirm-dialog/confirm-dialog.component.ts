import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
   selector: 'app-confirm-dialog',
   templateUrl: './confirm-dialog.component.html',
   styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

   constructor(private _dialogRef: MatDialogRef<ConfirmDialogComponent>, @Inject(MAT_DIALOG_DATA) public message: string) {
   }

   ngOnInit() {
   }

   confirm(): void {
      this._dialogRef.close(true);
   }

   cancel(): void {
      this._dialogRef.close(false);
   }
}
