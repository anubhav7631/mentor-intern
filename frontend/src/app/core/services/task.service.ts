import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Task, TaskAssignment, TaskCreateRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class TaskService {
    private apiUrl = `${environment.apiUrl}/tasks`;

    constructor(private http: HttpClient) { }

    getAll(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }

    getMyTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/my-tasks`);
    }

    getById(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${id}`);
    }

    create(task: TaskCreateRequest): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, task);
    }

    update(id: number, task: TaskCreateRequest): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    assignToInterns(taskId: number, internIds: number[]): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/${taskId}/assign`, internIds);
    }

    completeAssignment(assignmentId: number, remarks: string, score: number): Observable<TaskAssignment> {
        return this.http.put<TaskAssignment>(`${this.apiUrl}/assignments/${assignmentId}/complete`, { remarks, score });
    }

    completeAll(taskId: number, remarks: string, score: number): Observable<TaskAssignment[]> {
        return this.http.put<TaskAssignment[]>(`${this.apiUrl}/${taskId}/complete-all`, { remarks, score });
    }

    updateAssignmentStatus(assignmentId: number, status: string): Observable<TaskAssignment> {
        return this.http.put<TaskAssignment>(`${this.apiUrl}/assignments/${assignmentId}/status`, { status });
    }

    getInternAssignments(internId: number): Observable<TaskAssignment[]> {
        return this.http.get<TaskAssignment[]>(`${this.apiUrl}/intern/${internId}/assignments`);
    }
}
