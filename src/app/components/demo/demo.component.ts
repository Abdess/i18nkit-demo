import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from 'primeng/button';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Fluid } from 'primeng/fluid';
import { Select } from 'primeng/select';
import { Checkbox } from 'primeng/checkbox';
import { Tag } from 'primeng/tag';
import { Message } from 'primeng/message';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, Button, Card, InputText, Fluid, Select, Checkbox, Tag, Message],
  templateUrl: './demo.component.html',
  host: { class: 'block' },
})
export class DemoComponent {
  name = '';
  email = '';
  selectedCity: City | null = null;
  newsletter = false;

  readonly cities: City[] = [
    { name: 'Paris', code: 'PAR' },
    { name: 'Lyon', code: 'LYO' },
    { name: 'Marseille', code: 'MAR' },
    { name: 'Toulouse', code: 'TLS' },
    { name: 'Bordeaux', code: 'BDX' },
  ];
}
