import {Injectable} from '@angular/core';
import {CredentialsModule} from '../credentials.module';
import {CredentialGroupDTO} from '../model/CredentialGroupDTO';
import {CredentialDTO} from '../model/CredentialDTO';
import {HttpClient} from '@angular/common/http';
import {SessionService} from '../../shared/service/session.service';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PasswordDTO} from '../model/PasswordDTO';
import {map} from 'rxjs/operators';
import {EncryptionService} from '../../shared/service/encryption.service';

@Injectable({
   providedIn: CredentialsModule
})
export class CredentialService {

   constructor(private httpClient: HttpClient, private _sessionService: SessionService, private _encryptionService: EncryptionService) {
   }

   public getGroups(): Observable<CredentialGroupDTO[]> {
      return this.httpClient.get<CredentialGroupDTO[]>(environment.apiUrl + '/groups',
         {headers: this._sessionService.getHttpHeaders()}
      );
   }

   public getCredentials(groupId: number): Observable<CredentialDTO[]> {
      return this.httpClient.get<CredentialDTO[]>(environment.apiUrl + '/groups/' + groupId + '/credentials',
         {headers: this._sessionService.getHttpHeaders()}
      );
   }

   public decryptPassword(groupId: number, credential: CredentialDTO): Observable<string> {
      return this.httpClient.get<PasswordDTO>(environment.apiUrl + '/groups/' + groupId + '/credentials/' + credential.id + '/password',
         {headers: this._sessionService.getHttpHeaders()})
         .pipe(map((password: PasswordDTO) =>
            this._encryptionService.decrypt(password.password, this._sessionService.getMasterPassword())
         ));
   }

   private _cryptPassword(credential: CredentialDTO): CredentialDTO {
      return {
         ...credential,
         password: this._encryptionService.encrypt(credential.password, this._sessionService.getMasterPassword())
      };
   }

   public createCredential(credential: CredentialDTO, groupId: number): Observable<CredentialDTO> {
      return this.httpClient.post<CredentialDTO>(environment.apiUrl + '/groups/' + groupId + '/credentials',
         this._cryptPassword(credential), {headers: this._sessionService.getHttpHeaders()});
   }

   public editCredential(credential: CredentialDTO, groupId: number): Observable<CredentialDTO> {
      return this.httpClient.put<CredentialDTO>(environment.apiUrl + '/groups/' + groupId + '/credentials/' + credential.id,
         this._cryptPassword(credential), {headers: this._sessionService.getHttpHeaders()});
   }

   public deleteCredential(credential: CredentialDTO, groupId: number): Observable<boolean> {
      return this.httpClient.delete<boolean>(environment.apiUrl + '/groups/' + groupId + '/credentials/' + credential.id,
         {headers: this._sessionService.getHttpHeaders()});
   }
}
