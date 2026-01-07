import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-lang-layout',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <main class="p-4">
      <router-outlet />
    </main>
  `
})
export class LangLayoutComponent {}
