import {Injectable} from '@angular/core';
import {LoginModule} from '../login.module';
import {AuthenticationRequestDTO} from '../model/AuthenticationRequestDTO';
import {LoginEventModel} from '../component/login/LoginEventModel';
import {SessionService} from '../../shared/service/session.service';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TokenDTO} from '../model/TokenDTO';
import {EncryptionService} from '../../shared/service/encryption.service';

@Injectable({
   providedIn: LoginModule
})
export class LoginService {

   constructor(private _sessionService: SessionService, private _encryptionService: EncryptionService, private _httpClient: HttpClient) {
   }

   public login(loginEvent: LoginEventModel): Observable<TokenDTO> {
      const authenticationRequest: AuthenticationRequestDTO = {
         username: loginEvent.username,
         password: loginEvent.password,
      };

      return this._httpClient.post<TokenDTO>(environment.apiUrl + '/tokens', authenticationRequest);
   }

   public validateMasterPassword(testHash: string, masterPassword: string): Observable<boolean> {
      // if testHash is null therefore feature disabled
      return of(testHash === null || this._encryptionService.decrypt(testHash, masterPassword) === environment.validationHashKey);
   }

   public handleLogin(token: TokenDTO, masterPassword: string): void {
      this._sessionService.login(masterPassword, token.token);
   }
}
