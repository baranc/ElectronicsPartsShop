import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { AdminPanelComponent } from './app/admin-panel/admin-panel.component';
import { ShopComponent } from './app/shop/shop.component';


registerLocaleData(localePl, 'pl');


bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter([
      { path: '', component: ShopComponent },
      { path: 'admin', component: AdminPanelComponent },
    ]),
    { provide: LOCALE_ID, useValue: 'pl-PL' }
  ],
}).catch((err) => console.error(err));;

