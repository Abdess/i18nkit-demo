import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslocoService } from '@jsverse/transloco';
import { Select } from 'primeng/select';

interface Language {
  code: string;
  label: string;
}

@Component({
  selector: 'app-header',
  imports: [FormsModule, Select],
  template: `
    <header class="flex justify-between items-center p-4">
      <span>Language</span>
      <p-select
        [options]="languages"
        [(ngModel)]="selectedLang"
        optionLabel="label"
        optionValue="code"
        (onChange)="onLangChange($event.value)"
      />
    </header>
  `
})
export class HeaderComponent {
  private transloco = inject(TranslocoService);

  readonly languages: Language[] = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' }
  ];

  selectedLang = localStorage.getItem('lang') ?? this.transloco.getActiveLang();

  constructor() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.transloco.setActiveLang(savedLang);
    }
  }

  onLangChange(lang: string): void {
    this.transloco.setActiveLang(lang);
    localStorage.setItem('lang', lang);
  }
}
