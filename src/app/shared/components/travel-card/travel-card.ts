import { Travel } from '../../models/travel';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-travel-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './travel-card.html',
  styleUrl: './travel-card.css',
})

export class TravelCardComponent {
  @Input({ required: true }) travel!: Travel;
  @Output() addToCart = new EventEmitter<number>();

  onActionClick() {
    this.addToCart.emit(this.travel.id);
  }
}
