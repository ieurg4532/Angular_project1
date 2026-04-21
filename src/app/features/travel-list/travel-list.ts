import { Component } from '@angular/core';
import { TRAVELS } from '../../shared/mock-data';
import { TravelCardComponent } from '../../shared/components/travel-card/travel-card';

@Component({
  selector: 'app-travel-list',
  standalone: true,
  imports: [TravelCardComponent],
  templateUrl: './travel-list.html',
  styleUrl: './travel-list.css',
})
export class TravelListComponent {
  public travels = TRAVELS;
}
