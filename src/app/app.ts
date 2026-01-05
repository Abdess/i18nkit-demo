import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { DemoComponent } from './components/demo/demo.component';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [HeaderComponent, DemoComponent],
  templateUrl: './app.html',
})
export class App {}
