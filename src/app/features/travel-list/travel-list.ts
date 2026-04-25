import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { TravelCardComponent } from '../../shared/components/travel-card/travel-card';
import { TravelStatus, Travel } from '../../shared/models/travel';
import { TravelService } from '../../shared/services/travel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-travel-list',
  standalone: true,
  imports: [TravelCardComponent, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './travel-list.html',
  styleUrl: './travel-list.css',
})
export class TravelListComponent implements OnInit {
  private travelService = inject(TravelService);

  public travels$!: Observable<Travel[]>;

  public searchQuery = '';
  public selectedStatus = 'Всі';
  public statuses = ['Всі', ...Object.values(TravelStatus)];

  ngOnInit(): void {
    this.applyFilters();
  }

  handleCardAction(id: number): void {
    this.travelService.deleteItem(id).subscribe();
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  private applyFilters(): void {
    this.travels$ = this.travelService.travels$.pipe(
      map((items) =>
        items.filter((item) => {
          const matchesQuery = item.title.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchesStatus =
            this.selectedStatus === 'Всі' || item.status === this.selectedStatus;
          return matchesQuery && matchesStatus;
        }),
      ),
    );
  }

  resetFilters(inputElement: HTMLInputElement): void {
    this.searchQuery = '';
    this.selectedStatus = 'Всі';
    this.applyFilters();
    inputElement.focus();
  }
}
