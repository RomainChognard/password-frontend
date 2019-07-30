import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {LoginModule} from './login.module';
import {SessionService} from '../shared/service/session.service';

@Injectable({
   providedIn: LoginModule
})
export class LoginGuard implements CanActivate {

   constructor(private _router: Router, private _sessionService: SessionService) {
   }

   canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this._sessionService.isLogged()) {
         return this._router.createUrlTree(['/credentials']);
      }
      return true;
   }
}
