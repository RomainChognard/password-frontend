import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
   providedIn: 'root'
})
export class SessionService {

   private static MASTER_PASSWORD = 'masterPassword';
   private static ACESS_TOKEN = 'accessToken';

   constructor(private _localStorageService: LocalStorageService) {
   }

   public isLogged(): boolean {
      return this.getMasterPassword() !== undefined && this.getMasterPassword() !== null;
   }

   public getMasterPassword(): string {
      return this._localStorageService.get(SessionService.MASTER_PASSWORD);
   }

   private getAccessToken(): string {
      return this._localStorageService.get(SessionService.ACESS_TOKEN);
   }

   /**
    * Get http headers to use with secure endpoint
    */
   public getHttpHeaders(): HttpHeaders {
      return new HttpHeaders({'Content-Type': 'application/json', Authorization: this.getAccessToken()});
   }

   /**
    * Log the current user by storing master password in local storage
    *
    * @param masterPassword the master password
    * @param accessToken the access token to query api with
    */
   public login(masterPassword: string, accessToken: string): void {
      this._localStorageService.put(SessionService.MASTER_PASSWORD, masterPassword);
      this._localStorageService.put(SessionService.ACESS_TOKEN, accessToken);
   }

   public logout(): void {
      // todo maybe clear instead ?
      this._localStorageService.remove(SessionService.MASTER_PASSWORD);
      this._localStorageService.remove(SessionService.ACESS_TOKEN);
   }
}
