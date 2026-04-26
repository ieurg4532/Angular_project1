import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';

interface AuthResponse {
  accessToken: string;
  user: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  private authSubject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));
  public isAuth$ = this.authSubject.asObservable();

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: AuthResponse) => {
        // Додано тип, щоб не було 'unknown'
        localStorage.setItem('token', res.accessToken);
        this.authSubject.next(true);
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.authSubject.next(false);
  }
}
