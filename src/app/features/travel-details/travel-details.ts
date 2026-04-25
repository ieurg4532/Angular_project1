import { Component, Input, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Travel } from '../../shared/models/travel';
import { TravelService } from '../../shared/services/travel';
import { StatusColorPipe } from '../../shared/pipes/status-color-pipe';

@Component({
  selector: 'app-travel-details',
  standalone: true,
  imports: [CommonModule, AsyncPipe, RouterLink, StatusColorPipe],
  templateUrl: './travel-details.html',
  styleUrl: './travel-details.css',
})
export class TravelDetailsComponent implements OnInit {
  @Input() id!: string;

  private travelService = inject(TravelService);
  public travel$!: Observable<Travel | undefined>;

  ngOnInit(): void {
    this.travel$ = this.travelService.getById(this.id);
  }
}
