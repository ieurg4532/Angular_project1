import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TravelCardComponent } from '../../shared/components/travel-card/travel-card';
import { TravelStatus, Travel } from '../../shared/models/travel';
import { TravelService } from '../../shared/services/travel';

@Component({
  selector: 'app-travel-list',
  standalone: true,
  imports: [TravelCardComponent, FormsModule],
  templateUrl: './travel-list.html',
  styleUrl: './travel-list.css',
})

export class TravelListComponent implements OnInit {

  private travelService = inject(TravelService);

  public filteredTravels: Travel[] = [];
  public searchQuery = '';
  public selectedStatus = 'Всі';
  public statuses = ['Всі', ...Object.values(TravelStatus)];

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.filteredTravels = this.travelService.getAll();
  }

  handleCardAction(id: number): void {
    this.travelService.deleteItem(id);
    this.filterItems();
  }

  filterItems(): void {
    this.filteredTravels = this.travelService.filterItems(this.searchQuery, this.selectedStatus);
  }

  resetFilters(inputElement: HTMLInputElement): void {
    this.searchQuery = '';
    this.selectedStatus = 'Всі';
    this.loadData();
    inputElement.focus();
  }
}
