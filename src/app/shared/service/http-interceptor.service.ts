import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {SessionService} from './session.service';
import {Router} from '@angular/router';
import {catchError} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Injectable({
   providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

   constructor(private _sessionService: SessionService, private _matSnackBar: MatSnackBar, private _router: Router) {
   }

   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(req).pipe(catchError(err => this.handleError(err)));
   }

   private handleError(error: HttpErrorResponse) {
      if (error.error.code === 'INVALID_TOKEN') {
         this._sessionService.logout();
         this._router.navigate(['/login']);
      }

      this._matSnackBar.open(error.error.message, 'Ok', {duration: 2500});
      return throwError(error.error);
   }
}
