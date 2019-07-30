import {Component} from '@angular/core';
import {ThemeService} from './shared/service/theme.service';

@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.scss']
})
export class AppComponent {

   constructor(private _themeService: ThemeService) {
   }

   public isDarkTheme(): boolean {
      return this._themeService.isDarkTheme;
   }
}
