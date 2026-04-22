import { Injectable } from '@angular/core';
import { TRAVELS } from '../mock-data';
import { Travel } from '../models/travel';

@Injectable({
  providedIn: 'root',
})
export class TravelService {

  private items: Travel[] = [...TRAVELS];

  getAll(): Travel[] {
    return [...this.items];
  }

  getById(id: number): Travel | undefined {
    return this.items.find((item) => item.id === id);
  }

  deleteItem(id: number): void {
    this.items = this.items.filter((item) => item.id !== id);
  }

  filterItems(searchQuery: string, selectedStatus: string): Travel[] {
    const query = searchQuery.toLowerCase().trim();

    return this.items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(query);
      const matchesStatus = selectedStatus === 'Всі' || item.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }
}
