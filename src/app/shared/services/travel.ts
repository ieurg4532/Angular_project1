import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { TRAVELS } from '../mock-data';
import { Travel } from '../models/travel';
import { FilterOptions } from '../models/filter-options';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private allItems: Travel[] = [...TRAVELS];

  private itemsSubject$ = new BehaviorSubject<Travel[]>(this.allItems);
  public items$ = this.itemsSubject$.asObservable();

  private filterSubject$ = new BehaviorSubject<FilterOptions>({ query: '', status: 'Всі' });

  constructor() {
    this.filterSubject$
      .pipe(
        debounceTime(500),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        map((options) => {
          return this.allItems.filter((item) => {
            const matchesQuery = item.title.toLowerCase().includes(options.query.toLowerCase());
            const matchesStatus = options.status === 'Всі' || item.status === options.status;
            return matchesQuery && matchesStatus;
          });
        }),
      )
      .subscribe((filteredResult) => {
        this.itemsSubject$.next(filteredResult);
      });
  }

  getAll(): Observable<Travel[]> {
    return this.items$.pipe(delay(1000));
  }

  getById(id: number | string): Observable<Travel | undefined> {
    const currentTravels = this.itemsSubject$.value;
    const travel = currentTravels.find((t) => t.id === Number(id));
    return new BehaviorSubject<Travel | undefined>(travel).asObservable();
  }

  deleteItem(id: number): void {
    this.allItems = this.allItems.filter((item) => item.id !== id);
    this.filterSubject$.next(this.filterSubject$.getValue());
  }

  updateFilters(options: FilterOptions): void {
    this.filterSubject$.next(options);
  }

  addItem(newItem: Travel) {
    const currentItems = this.itemsSubject$.value;
    this.itemsSubject$.next([...currentItems, newItem]);
  }
}
