import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideTransloco } from '@jsverse/transloco';
import Aura from '@primeuix/themes/aura';
import { TranslocoHttpLoader } from './transloco-loader';
import { translocoConfig } from './transloco.config';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideTransloco({
      config: translocoConfig,
      loader: TranslocoHttpLoader
    })
  ]
};
