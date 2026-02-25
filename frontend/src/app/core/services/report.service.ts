import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReportService {
    private apiUrl = `${environment.apiUrl}/reports`;

    constructor(private http: HttpClient) { }

    downloadInternPerformance(): void {
        this.http.get(`${this.apiUrl}/intern-performance`, { responseType: 'blob' }).subscribe(blob => {
            this.downloadFile(blob, 'intern_performance_report.xlsx');
        });
    }

    downloadTaskSummary(): void {
        this.http.get(`${this.apiUrl}/task-summary`, { responseType: 'blob' }).subscribe(blob => {
            this.downloadFile(blob, 'task_summary_report.xlsx');
        });
    }

    private downloadFile(blob: Blob, fileName: string): void {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
    }
}
