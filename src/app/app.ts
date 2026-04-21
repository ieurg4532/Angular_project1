import { Component, signal } from '@angular/core';
import { Header } from './core/header/header';
import { Footer } from './core/footer/footer';
import { TravelListComponent } from './features/travel-list/travel-list';

@Component({
  selector: 'travel-root',
  imports: [TravelListComponent, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('my-angular-app');
}
