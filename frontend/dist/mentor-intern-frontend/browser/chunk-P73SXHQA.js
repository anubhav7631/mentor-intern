import {
  BehaviorSubject,
  HttpClient,
  environment,
  tap,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-7QFRWQQD.js";

// src/app/core/services/auth.service.ts
var AuthService = class _AuthService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/auth`;
    this.currentUserSubject = new BehaviorSubject(null);
    this.currentUser$ = this.currentUserSubject.asObservable();
    const stored = localStorage.getItem("currentUser");
    if (stored) {
      this.currentUserSubject.next(JSON.parse(stored));
    }
  }
  get currentUser() {
    return this.currentUserSubject.value;
  }
  get isLoggedIn() {
    return !!this.currentUser?.token;
  }
  get isMentor() {
    return this.currentUser?.role === "MENTOR";
  }
  login(username, password) {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(tap((user) => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      this.currentUserSubject.next(user);
    }));
  }
  register(data) {
    return this.http.post(`${this.apiUrl}/register`, data).pipe(tap((user) => {
      localStorage.setItem("currentUser", JSON.stringify(user));
      this.currentUserSubject.next(user);
    }));
  }
  logout() {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
  }
  static {
    this.\u0275fac = function AuthService_Factory(t) {
      return new (t || _AuthService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
  }
};

export {
  AuthService
};
//# sourceMappingURL=chunk-P73SXHQA.js.map
