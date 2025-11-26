import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = environment.apiUrl;

  private authState = new BehaviorSubject<boolean>(this.hasToken());
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient) {}

  private hasToken(): boolean {
    return !!localStorage.getItem('access');
  }

  register(data: any): Observable<any> { 
    return this.http.post(`${this.baseUrl}/user/register/`, data); 
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login/`, data).pipe(
      tap((res: any) => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);

        this.authState.next(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    this.authState.next(false);
  }

  isLoggedIn() {
    return this.authState.value;
  }

  getToken() {
    return localStorage.getItem('access');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn();
  }
}
