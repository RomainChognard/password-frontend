import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToolbarComponent} from './shared/component/toolbar/toolbar.component';
import {
   MatButtonModule,
   MatFormFieldModule,
   MatIconModule,
   MatInputModule,
   MatMenuModule,
   MatSnackBarModule,
   MatToolbarModule
} from '@angular/material';
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
