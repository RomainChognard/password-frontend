import {Injectable} from '@angular/core';

@Injectable({
   providedIn: 'root'
})
export class LocalStorageService {

   constructor() {
   }

   public contains(key: string): boolean {
      return this.get(key) !== null;
   }

   public get(key: string): string {
      return localStorage.getItem(key);
   }

   public put(key: string, value: string): void {
      localStorage.setItem(key, value);
   }

   public remove(key: string): void {
      localStorage.removeItem(key);
   }
}
