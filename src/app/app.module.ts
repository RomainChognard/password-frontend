import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToolbarComponent} from './shared/component/toolbar/toolbar.component';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpInterceptorService} from './shared/service/http-interceptor.service';

@NgModule({
   declarations: [
      AppComponent,
      ToolbarComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      MatToolbarModule, MatButtonModule, MatSnackBarModule,
      MatIconModule, MatFormFieldModule, MatInputModule,
      MatMenuModule, FormsModule, HttpClientModule
   ],
   providers: [{provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true}],
   bootstrap: [AppComponent]
})
export class AppModule {
}
