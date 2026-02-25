import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DashboardSummary, InternAnalytics } from '../models/models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
    private apiUrl = `${environment.apiUrl}/dashboard`;

    constructor(private http: HttpClient) { }

    getSummary(): Observable<DashboardSummary> {
        return this.http.get<DashboardSummary>(`${this.apiUrl}/summary`);
    }

    getAnalytics(batch?: string, department?: string): Observable<InternAnalytics[]> {
        let params = new HttpParams();
        if (batch) params = params.set('batch', batch);
        if (department) params = params.set('department', department);
        return this.http.get<InternAnalytics[]>(`${this.apiUrl}/analytics`, { params });
    }
}
