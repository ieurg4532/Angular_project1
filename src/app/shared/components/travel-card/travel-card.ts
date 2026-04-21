import { Travel } from '../../models/travel';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-travel-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './travel-card.html',
  styleUrl: './travel-card.css',
})
export class TravelCardComponent {
  @Input({ required: true }) travel!: Travel;
}
