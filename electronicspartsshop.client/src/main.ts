import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { AdminPanelComponent } from './app/admin-panel/admin-panel.component';
import { ShopComponent } from './app/shop/shop.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appConfig } from './app/app.config';


registerLocaleData(localePl, 'pl');


bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));;

