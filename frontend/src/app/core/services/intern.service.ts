import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Intern } from '../models/models';

@Injectable({ providedIn: 'root' })
export class InternService {
    private apiUrl = `${environment.apiUrl}/interns`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Intern[]> {
        return this.http.get<Intern[]>(this.apiUrl);
    }

    getById(id: number): Observable<Intern> {
        return this.http.get<Intern>(`${this.apiUrl}/${id}`);
    }

    create(intern: Intern): Observable<Intern> {
        return this.http.post<Intern>(this.apiUrl, intern);
    }

    update(id: number, intern: Intern): Observable<Intern> {
        return this.http.put<Intern>(`${this.apiUrl}/${id}`, intern);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    search(params: any): Observable<Intern[]> {
        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            if (params[key]) httpParams = httpParams.set(key, params[key]);
        });
        return this.http.get<Intern[]>(`${this.apiUrl}/search`, { params: httpParams });
    }

    getFilters(): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/filters`);
    }

    uploadExcel(file: File): Observable<any> {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<any>(`${this.apiUrl}/upload`, formData);
    }
}
