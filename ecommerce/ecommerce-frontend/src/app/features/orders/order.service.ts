
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = `${environment.apiUrl}/orders/`;

  constructor(private http: HttpClient) {}

  createOrder(orderData: any): Observable<any> {
    const token = localStorage.getItem('access_token'); 
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.post(this.baseUrl, orderData, { headers });
  }

  getMyOrders(dateFilter?: string): Observable<any> {
    const token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${token}` };

    let params: any = {};
    if (dateFilter && dateFilter !== 'all') {
      params['date_filter'] = dateFilter;
    }

    return this.http.get(this.baseUrl, { headers, params });
  }
}
