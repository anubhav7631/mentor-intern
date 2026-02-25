import {
  MatCardModule
} from "./chunk-TQX7SOPS.js";
import {
  AuthService
} from "./chunk-P73SXHQA.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-AE2MA3RX.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-7UB4RGGL.js";
import {
  InternService
} from "./chunk-EZQUNZSE.js";
import "./chunk-26FXPKCV.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel
} from "./chunk-AZIYAKBY.js";
import {
  FormsModule,
  NgControlStatus,
  NgModel
} from "./chunk-JLMQQFVU.js";
import {
  CommonModule,
  HttpClient,
  HttpParams,
  MatIcon,
  MatIconModule,
  MatOption,
  NgForOf,
  NgIf,
  environment,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7QFRWQQD.js";

// src/app/core/services/dashboard.service.ts
var DashboardService = class _DashboardService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/dashboard`;
  }
  getSummary() {
    return this.http.get(`${this.apiUrl}/summary`);
  }
  getAnalytics(batch, department) {
    let params = new HttpParams();
    if (batch)
      params = params.set("batch", batch);
    if (department)
      params = params.set("department", department);
    return this.http.get(`${this.apiUrl}/analytics`, { params });
  }
  static {
    this.\u0275fac = function DashboardService_Factory(t) {
      return new (t || _DashboardService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DashboardService, factory: _DashboardService.\u0275fac, providedIn: "root" });
  }
};

// src/app/dashboard/dashboard.component.ts
function DashboardComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "mat-spinner", 5);
    \u0275\u0275elementEnd();
  }
}
function DashboardComponent_div_7_div_67_mat_option_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 30);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const b_r3 = ctx.$implicit;
    \u0275\u0275property("value", b_r3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(b_r3);
  }
}
function DashboardComponent_div_7_div_67_tr_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td")(2, "div", 31)(3, "div", 32);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div")(6, "div", 33);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 34);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(10, "td");
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td")(15, "span", 35);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "td")(18, "span", 36);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td")(21, "span", 37);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "td")(24, "div", 38);
    \u0275\u0275element(25, "div", 39);
    \u0275\u0275elementStart(26, "span");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "td");
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r4 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(a_r4.internName == null ? null : a_r4.internName.charAt(0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r4.internName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r4.internInternId);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r4.department || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r4.totalTasks);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r4.completedTasks);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r4.pendingTasks);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r4.overdueTasks);
    \u0275\u0275advance(3);
    \u0275\u0275styleProp("width", a_r4.completionPercentage, "%");
    \u0275\u0275classProp("high", a_r4.completionPercentage >= 75)("medium", a_r4.completionPercentage >= 40 && a_r4.completionPercentage < 75)("low", a_r4.completionPercentage < 40);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", a_r4.completionPercentage, "%");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r4.averageScore || "-");
  }
}
function DashboardComponent_div_7_div_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "div", 20)(2, "h2", 21);
    \u0275\u0275text(3, "Intern Performance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 22)(5, "mat-form-field", 23)(6, "mat-label");
    \u0275\u0275text(7, "Filter by Batch");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-select", 24);
    \u0275\u0275twoWayListener("ngModelChange", function DashboardComponent_div_7_div_67_Template_mat_select_ngModelChange_8_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedBatch, $event) || (ctx_r1.selectedBatch = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function DashboardComponent_div_7_div_67_Template_mat_select_selectionChange_8_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.loadAnalytics());
    });
    \u0275\u0275elementStart(9, "mat-option", 25);
    \u0275\u0275text(10, "All Batches");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, DashboardComponent_div_7_div_67_mat_option_11_Template, 2, 2, "mat-option", 26);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "div", 27)(13, "table", 28)(14, "thead")(15, "tr")(16, "th");
    \u0275\u0275text(17, "Intern");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th");
    \u0275\u0275text(19, "Department");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th");
    \u0275\u0275text(21, "Total");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "th");
    \u0275\u0275text(23, "Completed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "th");
    \u0275\u0275text(25, "Pending");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "th");
    \u0275\u0275text(27, "Overdue");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "th");
    \u0275\u0275text(29, "Completion %");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "th");
    \u0275\u0275text(31, "Avg Score");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(32, "tbody");
    \u0275\u0275template(33, DashboardComponent_div_7_div_67_tr_33_Template, 30, 18, "tr", 29);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedBatch);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.batches);
    \u0275\u0275advance(22);
    \u0275\u0275property("ngForOf", ctx_r1.analytics);
  }
}
function DashboardComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 6)(2, "div", 7)(3, "div", 8)(4, "mat-icon");
    \u0275\u0275text(5, "people");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 9);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 10);
    \u0275\u0275text(9, "Total Interns");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 7)(11, "div", 11)(12, "mat-icon");
    \u0275\u0275text(13, "person_check");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 9);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 10);
    \u0275\u0275text(17, "Active Interns");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 7)(19, "div", 12)(20, "mat-icon");
    \u0275\u0275text(21, "assignment");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 9);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 10);
    \u0275\u0275text(25, "Total Tasks");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 7)(27, "div", 13)(28, "mat-icon");
    \u0275\u0275text(29, "pending");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 9);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 10);
    \u0275\u0275text(33, "Pending Tasks");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 14)(35, "div", 7)(36, "div", 15)(37, "mat-icon");
    \u0275\u0275text(38, "check_circle");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 9);
    \u0275\u0275text(40);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "div", 10);
    \u0275\u0275text(42, "Completed Tasks");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 7)(44, "div", 16)(45, "mat-icon");
    \u0275\u0275text(46, "schedule");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 9);
    \u0275\u0275text(48);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 10);
    \u0275\u0275text(50, "Overdue Tasks");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div", 7)(52, "div", 11)(53, "mat-icon");
    \u0275\u0275text(54, "trending_up");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(55, "div", 9);
    \u0275\u0275text(56);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "div", 10);
    \u0275\u0275text(58, "Avg Completion");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 7)(60, "div", 17)(61, "mat-icon");
    \u0275\u0275text(62, "person_off");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(63, "div", 9);
    \u0275\u0275text(64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "div", 10);
    \u0275\u0275text(66, "Dropped");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(67, DashboardComponent_div_7_div_67_Template, 34, 3, "div", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate((ctx_r1.summary == null ? null : ctx_r1.summary.totalInterns) || 0);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate((ctx_r1.summary == null ? null : ctx_r1.summary.activeInterns) || 0);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate((ctx_r1.summary == null ? null : ctx_r1.summary.totalTasks) || 0);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate((ctx_r1.summary == null ? null : ctx_r1.summary.pendingTasks) || 0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate((ctx_r1.summary == null ? null : ctx_r1.summary.completedTasks) || 0);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate((ctx_r1.summary == null ? null : ctx_r1.summary.overdueTasks) || 0);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", (ctx_r1.summary == null ? null : ctx_r1.summary.avgCompletionPercentage) || 0, "%");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate((ctx_r1.summary == null ? null : ctx_r1.summary.droppedInterns) || 0);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.analytics.length > 0);
  }
}
var DashboardComponent = class _DashboardComponent {
  constructor(dashboardService, internService, auth) {
    this.dashboardService = dashboardService;
    this.internService = internService;
    this.auth = auth;
    this.summary = null;
    this.analytics = [];
    this.batches = [];
    this.selectedBatch = "";
    this.loading = true;
  }
  ngOnInit() {
    this.loadData();
  }
  loadData() {
    this.dashboardService.getSummary().subscribe((s) => {
      this.summary = s;
      this.loading = false;
    });
    this.loadAnalytics();
    this.internService.getFilters().subscribe((f) => {
      this.batches = f.batches || [];
    });
  }
  loadAnalytics() {
    this.dashboardService.getAnalytics(this.selectedBatch || void 0).subscribe((a) => {
      this.analytics = a;
    });
  }
  static {
    this.\u0275fac = function DashboardComponent_Factory(t) {
      return new (t || _DashboardComponent)(\u0275\u0275directiveInject(DashboardService), \u0275\u0275directiveInject(InternService), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 8, vars: 3, consts: [[1, "page-container"], [1, "page-header"], ["class", "loading-state", 4, "ngIf"], [4, "ngIf"], [1, "loading-state"], ["diameter", "40"], [1, "card-grid", "card-grid-4"], [1, "stat-card"], [1, "stat-icon", 2, "background", "rgba(99, 102, 241, 0.15)", "color", "#818cf8"], [1, "stat-value"], [1, "stat-label"], [1, "stat-icon", 2, "background", "rgba(16, 185, 129, 0.15)", "color", "#34d399"], [1, "stat-icon", 2, "background", "rgba(14, 165, 233, 0.15)", "color", "#38bdf8"], [1, "stat-icon", 2, "background", "rgba(245, 158, 11, 0.15)", "color", "#fbbf24"], [1, "card-grid", "card-grid-4", 2, "margin-top", "20px"], [1, "stat-icon", 2, "background", "rgba(99, 102, 241, 0.15)", "color", "#a78bfa"], [1, "stat-icon", 2, "background", "rgba(239, 68, 68, 0.15)", "color", "#f87171"], [1, "stat-icon", 2, "background", "rgba(148, 163, 184, 0.15)", "color", "#94a3b8"], ["class", "analytics-section", 4, "ngIf"], [1, "analytics-section"], [1, "section-header"], [1, "section-title"], [1, "section-filters"], ["appearance", "outline", 2, "width", "180px"], [3, "ngModelChange", "selectionChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "data-table-container"], [1, "performance-table"], [4, "ngFor", "ngForOf"], [3, "value"], [1, "intern-cell"], [1, "intern-avatar"], [1, "intern-name"], [1, "intern-id"], [1, "text-success"], [1, "text-warning"], [1, "text-danger"], [1, "progress-bar-container"], [1, "progress-bar"]], template: function DashboardComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Dashboard");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p");
        \u0275\u0275text(5);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, DashboardComponent_div_6_Template, 2, 0, "div", 2)(7, DashboardComponent_div_7_Template, 68, 9, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate1("Welcome back, ", ctx.auth.currentUser == null ? null : ctx.auth.currentUser.fullName, "! Here's your overview.");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf, MatCardModule, MatIconModule, MatIcon, MatSelectModule, MatFormField, MatLabel, MatSelect, MatOption, MatFormFieldModule, FormsModule, NgControlStatus, NgModel, MatProgressSpinnerModule, MatProgressSpinner], styles: ["\n\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.analytics-section[_ngcontent-%COMP%] {\n  margin-top: 32px;\n}\n.section-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 12px;\n}\n.section-filters[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n.performance-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.performance-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 14px 16px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  font-size: 12px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  border-bottom: 1px solid var(--border);\n}\n.performance-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border-bottom: 1px solid var(--border);\n  font-size: 14px;\n}\n.performance-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: var(--bg-surface);\n}\n.intern-cell[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.intern-avatar[_ngcontent-%COMP%] {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--secondary));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-weight: 700;\n  font-size: 13px;\n  color: white;\n}\n.intern-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 13px;\n}\n.intern-id[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n}\n.text-success[_ngcontent-%COMP%] {\n  color: #34d399;\n  font-weight: 600;\n}\n.text-warning[_ngcontent-%COMP%] {\n  color: #fbbf24;\n  font-weight: 600;\n}\n.text-danger[_ngcontent-%COMP%] {\n  color: #f87171;\n  font-weight: 600;\n}\n.progress-bar-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.progress-bar-container[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 12px;\n  font-weight: 600;\n  min-width: 35px;\n}\n.progress-bar[_ngcontent-%COMP%] {\n  height: 6px;\n  border-radius: 3px;\n  transition: width 0.5s ease;\n  min-width: 0;\n  max-width: 100px;\n}\n.progress-bar.high[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #10b981,\n      #34d399);\n}\n.progress-bar.medium[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #f59e0b,\n      #fbbf24);\n}\n.progress-bar.low[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #ef4444,\n      #f87171);\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src\\app\\dashboard\\dashboard.component.ts", lineNumber: 216 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-QNE6MHZJ.js.map
