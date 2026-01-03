import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [Button, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
