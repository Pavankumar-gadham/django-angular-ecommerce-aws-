import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(params?: any): Observable<any> {
    return this.http.get(this.baseUrl, { params });
  }

  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/`);
  }

  getAllProducts(): Observable<any> {
  return this.http.get(`${this.baseUrl}`);
}

  getProductsByCategory(category: string): Observable<any> {
    return this.http.get(`${this.baseUrl}?category=${category}`);
  }

}
