import { Travel } from '../../models/travel';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TruncatePipe } from '../../pipes/truncate-pipe';
import { HighlightDirective } from '../../directives/highlight';
import { StatusColorPipe } from '../../pipes/status-color-pipe';

@Component({
  selector: 'app-travel-card',
  standalone: true,
  imports: [CommonModule, RouterLink, TruncatePipe, HighlightDirective, StatusColorPipe],
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
