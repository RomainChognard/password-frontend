import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
   {
      path: 'login',
      loadChildren: './login/login.module#LoginModule'
   },
   {
      path: 'credentials',
      loadChildren: './credentials/credentials.module#CredentialsModule'
   },
   {
      path: '',
      redirectTo: 'login',
      pathMatch: 'full'
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule {
}
