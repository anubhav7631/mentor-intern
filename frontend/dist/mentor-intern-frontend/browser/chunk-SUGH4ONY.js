import {
  HttpClient,
  environment,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-7QFRWQQD.js";

// src/app/core/services/task.service.ts
var TaskService = class _TaskService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/tasks`;
  }
  getAll() {
    return this.http.get(this.apiUrl);
  }
  getMyTasks() {
    return this.http.get(`${this.apiUrl}/my-tasks`);
  }
  getById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  create(task) {
    return this.http.post(this.apiUrl, task);
  }
  update(id, task) {
    return this.http.put(`${this.apiUrl}/${id}`, task);
  }
  delete(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  assignToInterns(taskId, internIds) {
    return this.http.post(`${this.apiUrl}/${taskId}/assign`, internIds);
  }
  completeAssignment(assignmentId, remarks, score) {
    return this.http.put(`${this.apiUrl}/assignments/${assignmentId}/complete`, { remarks, score });
  }
  completeAll(taskId, remarks, score) {
    return this.http.put(`${this.apiUrl}/${taskId}/complete-all`, { remarks, score });
  }
  updateAssignmentStatus(assignmentId, status) {
    return this.http.put(`${this.apiUrl}/assignments/${assignmentId}/status`, { status });
  }
  getInternAssignments(internId) {
    return this.http.get(`${this.apiUrl}/intern/${internId}/assignments`);
  }
  static {
    this.\u0275fac = function TaskService_Factory(t) {
      return new (t || _TaskService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TaskService, factory: _TaskService.\u0275fac, providedIn: "root" });
  }
};

export {
  TaskService
};
//# sourceMappingURL=chunk-SUGH4ONY.js.map
