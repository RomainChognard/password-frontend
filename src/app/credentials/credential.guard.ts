import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CredentialsModule} from './credentials.module';
import {SessionService} from '../shared/service/session.service';

@Injectable({
   providedIn: CredentialsModule
})
export class CredentialGuard implements CanActivate {

   constructor(private _sessionService: SessionService, private _router: Router) {
   }

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this._sessionService.isLogged()) {
         return this._router.createUrlTree(['/login']);
      }
      return true;
   }
}
