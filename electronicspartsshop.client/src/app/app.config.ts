import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';

registerLocaleData(localePl, 'pl');
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(),
  { provide: LOCALE_ID, useValue: 'pl-PL' }, provideAnimationsAsync()]
};
