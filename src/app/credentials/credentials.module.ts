import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CredentialsRoutingModule} from './credentials-routing.module';
import {CredentialListComponent} from './component/credential-list/credential-list.component';
import {CredentialPageComponent} from './view/credential-page/credential-page.component';
import {CredentialGuard} from './credential.guard';
import {
   MatButtonModule,
   MatCheckboxModule,
   MatDialogModule,
   MatFormFieldModule,
   MatIconModule,
   MatInputModule,
   MatMenuModule,
   MatPaginatorModule,
   MatTableModule,
   MatTabsModule
} from '@angular/material';
import {CredentialService} from './service/credential.service';
import {CredentialDialogComponent} from './component/credential-dialog/credential-dialog.component';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from './component/confirm-dialog/confirm-dialog.component';

@NgModule({
   declarations: [CredentialListComponent, CredentialPageComponent, CredentialDialogComponent, ConfirmDialogComponent],
   imports: [
      CommonModule,
      CredentialsRoutingModule, MatTableModule, MatTabsModule, MatFormFieldModule, MatInputModule, FormsModule,
      MatCheckboxModule, MatMenuModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatDialogModule
   ],
   entryComponents: [CredentialDialogComponent, ConfirmDialogComponent],
   providers: [CredentialGuard, CredentialService]
})
export class CredentialsModule {
}
