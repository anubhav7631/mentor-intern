import {
  HttpClient,
  HttpParams,
  environment,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-7QFRWQQD.js";

// src/app/core/services/intern.service.ts
var InternService = class _InternService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/interns`;
  }
  getAll() {
    return this.http.get(this.apiUrl);
  }
  getById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  create(intern) {
    return this.http.post(this.apiUrl, intern);
  }
  update(id, intern) {
    return this.http.put(`${this.apiUrl}/${id}`, intern);
  }
  delete(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  search(params) {
    let httpParams = new HttpParams();
    Object.keys(params).forEach((key) => {
      if (params[key])
        httpParams = httpParams.set(key, params[key]);
    });
    return this.http.get(`${this.apiUrl}/search`, { params: httpParams });
  }
  getFilters() {
    return this.http.get(`${this.apiUrl}/filters`);
  }
  uploadExcel(file) {
    const formData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.apiUrl}/upload`, formData);
  }
  static {
    this.\u0275fac = function InternService_Factory(t) {
      return new (t || _InternService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _InternService, factory: _InternService.\u0275fac, providedIn: "root" });
  }
};

export {
  InternService
};
//# sourceMappingURL=chunk-EZQUNZSE.js.map
