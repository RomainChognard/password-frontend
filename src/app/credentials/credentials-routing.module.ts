import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CredentialPageComponent} from './view/credential-page/credential-page.component';
import {CredentialGuard} from './credential.guard';

const routes: Routes = [
   {
      path: '',
      component: CredentialPageComponent,
      canActivate: [CredentialGuard]
   }
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule]
})
export class CredentialsRoutingModule {
}
