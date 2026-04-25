import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Travel } from '../models/travel';

@Injectable({
  providedIn: 'root',
})
export class TravelService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/travels';

  private travelsSubject = new BehaviorSubject<Travel[]>([]);
  public travels$ = this.travelsSubject.asObservable();

  constructor() {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.http.get<Travel[]>(this.apiUrl).subscribe({
      next: (data) => this.travelsSubject.next(data),
      error: (err) => console.error('Помилка завантаження:', err),
    });
  }

  getById(id: string | number): Observable<Travel> {
    return this.http.get<Travel>(`${this.apiUrl}/${id}`);
  }

  addItem(newItem: Travel): Observable<Travel> {
    return this.http.post<Travel>(this.apiUrl, newItem).pipe(
      tap(() => this.loadInitialData()),
    );
  }

  deleteItem(id: number | string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadInitialData()),
    );
  }
}
