import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ToolbarService} from '../../service/toolbar.service';
import {SessionService} from '../../service/session.service';
import {ThemeService} from '../../service/theme.service';

@Component({
   selector: 'app-toolbar',
   templateUrl: './toolbar.component.html',
   styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

   constructor(private _router: Router, private _toolbarService: ToolbarService,
               private _sessionService: SessionService, private _themeService: ThemeService) {
   }

   isCredentialsPage(): boolean {
      return this._router.url === '/credentials';
   }

   isLogged(): boolean {
      return this._sessionService.isLogged();
   }

   applyFilter(value: string): void {
      this._toolbarService.applyFilter(value);
   }

   logout(): void {
      this._sessionService.logout();
      this._router.navigate(['/login']);
   }

   public toggleDarkTheme(): void {
      this._themeService.setDarkTheme(!this._themeService.isDarkTheme);
   }

   public getThemeToToggle(): string {
      return this._themeService.isDarkTheme ? 'Light Theme' : 'Dark Theme';
   }
}
