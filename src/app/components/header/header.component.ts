import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslocoService, TranslocoPipe } from '@jsverse/transloco';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-header',
  imports: [FormsModule, Select, TranslocoPipe],
  template: `
    <header class="flex justify-between items-center p-4">
      <span>{{ 'header.text.language' | transloco }}</span>
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
  private router = inject(Router);

  readonly languages = (this.transloco.getAvailableLangs() as string[]).map(code => ({
    code,
    label: code.toUpperCase()
  }));

  selectedLang = this.transloco.getActiveLang();

  onLangChange(newLang: string): void {
    const currentUrl = this.router.url;
    const newUrl = currentUrl.replace(/^\/[^/]+/, `/${newLang}`);
    this.router.navigateByUrl(newUrl);
  }
}
