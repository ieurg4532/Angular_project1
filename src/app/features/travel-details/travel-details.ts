import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { TravelService } from '../../shared/services/travel';
import { Travel } from '../../shared/models/travel';
import { StatusColorPipe } from '../../shared/pipes/status-color-pipe';

@Component({
  selector: 'app-travel-details',
  standalone: true,
  imports: [CommonModule, RouterLink, StatusColorPipe],
  templateUrl: './travel-details.html',
  styleUrl: './travel-details.css',
})
export class TravelDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private travelService = inject(TravelService);
  public travel$!: Observable<Travel>;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.travel$ = this.travelService.getById(id);
    }
  }
}
