import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';

@Injectable({
   providedIn: 'root'
})
export class ThemeService {

   private static IS_DARK_THEME_KEY = 'isDarkTheme';

   isDarkTheme: boolean;

   constructor(private _localStorageService: LocalStorageService) {
      this.isDarkTheme = this._localStorageService.get(ThemeService.IS_DARK_THEME_KEY) === 'true';
   }

   public setDarkTheme(isDarkTheme: boolean) {
      this.isDarkTheme = isDarkTheme;
      this._localStorageService.put(ThemeService.IS_DARK_THEME_KEY, isDarkTheme ? 'true' : 'false');
   }
}

