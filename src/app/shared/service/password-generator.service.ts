import {Injectable} from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class PasswordGeneratorService {

   constructor() {
   }

   public generatePassword(size: number): string {
      return Array(size)
         .fill('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$')
         .map(x => x[Math.floor(crypto.getRandomValues(new Uint32Array(1))[0] / (0xffffffff + 1) * x.length)])
         .join('');
   }
}
