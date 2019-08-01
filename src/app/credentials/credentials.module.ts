import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CredentialListComponent} from './component/credential-list/credential-list.component';
import {CredentialPageComponent} from './view/credential-page/credential-page.component';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {CredentialDialogComponent} from './component/credential-dialog/credential-dialog.component';
import {FormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from './component/confirm-dialog/confirm-dialog.component';
import {CredentialsRoutingModule} from './credentials-routing.module';

@NgModule({
   declarations: [CredentialListComponent, CredentialPageComponent, CredentialDialogComponent, ConfirmDialogComponent],
   imports: [
      CommonModule, MatTableModule, MatTabsModule, MatFormFieldModule, MatInputModule, FormsModule,
      MatCheckboxModule, MatMenuModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatDialogModule,
      CredentialsRoutingModule
   ],
   entryComponents: [CredentialDialogComponent, ConfirmDialogComponent]
})
export class CredentialsModule {
}
