import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from './category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<any>(this.baseUrl).pipe(
      map((response: any) => {
        if (Array.isArray(response)) {
          return response as Category[];
        }

        if (response && Array.isArray(response.results)) {
          return response.results as Category[];
        }
        if (response && Array.isArray(response.data)) {
          return response.data as Category[];
        }

        return [] as Category[];
      }),
      catchError(err => {
        console.error('Failed to load categories', err);
        return throwError(() => err);
      })
    );
  }
}
