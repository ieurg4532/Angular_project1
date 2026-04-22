import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TRAVELS } from '../../shared/mock-data';
import { TravelCardComponent } from '../../shared/components/travel-card/travel-card';
import { TravelStatus } from '../../shared/models/travel';

@Component({
  selector: 'app-travel-list',
  standalone: true,
  imports: [TravelCardComponent, FormsModule],
  templateUrl: './travel-list.html',
  styleUrl: './travel-list.css',
})
export class TravelListComponent {
  public allTravels = TRAVELS;
  public filteredTravels = [...this.allTravels];

  public searchQuery = '';
  public selectedStatus = 'Всі';

  public statuses = ['Всі', ...Object.values(TravelStatus)];

  handleCardAction(id: number): void {
    console.log(`Користувач обрав подорож з ID: ${id}`);
  }

  filterItems(): void {
    const query = this.searchQuery.toLowerCase().trim();

    this.filteredTravels = this.allTravels.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(query);
      const matchesStatus = this.selectedStatus === 'Всі' || item.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  resetFilters(inputElement: HTMLInputElement): void {
    this.searchQuery = '';
    this.selectedStatus = 'Всі';
    this.filterItems();
    inputElement.focus();
  }
}
