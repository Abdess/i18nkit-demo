import { inject } from '@angular/core';
import { Routes, CanActivateFn } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { translocoConfig } from './transloco.config';

const defaultLang = translocoConfig.defaultLang;
const availableLangs = translocoConfig.availableLangs as string[];

const langGuard: CanActivateFn = (route) => {
  const lang = route.paramMap.get('lang');
  if (!lang || !availableLangs.includes(lang)) return false;

  const transloco = inject(TranslocoService);
  transloco.setActiveLang(lang);
  localStorage.setItem('lang', lang);
  return true;
};

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: () => `/${localStorage.getItem('lang') ?? defaultLang}/demo`
  },
  {
    path: ':lang',
    canActivate: [langGuard],
    loadComponent: () => import('./layouts/lang-layout.component').then(m => m.LangLayoutComponent),
    children: [
      { path: '', redirectTo: 'demo', pathMatch: 'full' },
      { path: 'demo', loadComponent: () => import('./components/demo/demo.component').then(m => m.DemoComponent) }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];
