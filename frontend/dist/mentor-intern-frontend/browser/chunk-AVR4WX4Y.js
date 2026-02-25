import {
  MatCardModule
} from "./chunk-TQX7SOPS.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-E6QWQJ5U.js";
import "./chunk-26FXPKCV.js";
import {
  MatButtonModule
} from "./chunk-BIDWELU5.js";
import {
  CommonModule,
  HttpClient,
  MatIcon,
  MatIconModule,
  environment,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵtext
} from "./chunk-7QFRWQQD.js";

// src/app/core/services/report.service.ts
var ReportService = class _ReportService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/reports`;
  }
  downloadInternPerformance() {
    this.http.get(`${this.apiUrl}/intern-performance`, { responseType: "blob" }).subscribe((blob) => {
      this.downloadFile(blob, "intern_performance_report.xlsx");
    });
  }
  downloadTaskSummary() {
    this.http.get(`${this.apiUrl}/task-summary`, { responseType: "blob" }).subscribe((blob) => {
      this.downloadFile(blob, "task_summary_report.xlsx");
    });
  }
  downloadFile(blob, fileName) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  }
  static {
    this.\u0275fac = function ReportService_Factory(t) {
      return new (t || _ReportService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReportService, factory: _ReportService.\u0275fac, providedIn: "root" });
  }
};

// src/app/reports/reports.component.ts
var ReportsComponent = class _ReportsComponent {
  constructor(reportService, snackBar) {
    this.reportService = reportService;
    this.snackBar = snackBar;
  }
  downloadInternReport() {
    this.reportService.downloadInternPerformance();
    this.snackBar.open("Downloading intern performance report...", "Close", { duration: 2e3 });
  }
  downloadTaskReport() {
    this.reportService.downloadTaskSummary();
    this.snackBar.open("Downloading task summary report...", "Close", { duration: 2e3 });
  }
  static {
    this.\u0275fac = function ReportsComponent_Factory(t) {
      return new (t || _ReportsComponent)(\u0275\u0275directiveInject(ReportService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReportsComponent, selectors: [["app-reports"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 51, vars: 0, consts: [[1, "page-container"], [1, "page-header"], [1, "reports-grid"], [1, "report-card"], [1, "report-icon", 2, "background", "linear-gradient(135deg, #6366f1, #818cf8)"], [1, "report-info"], [1, "report-includes"], [1, "btn-primary", "download-btn", 3, "click"], [1, "report-icon", 2, "background", "linear-gradient(135deg, #0ea5e9, #38bdf8)"], [1, "btn-primary", "download-btn", 2, "background", "linear-gradient(135deg, #0ea5e9, #0284c7) !important", 3, "click"]], template: function ReportsComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "Reports & Export");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p");
        \u0275\u0275text(5, "Download detailed performance and task reports as Excel files");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(6, "div", 2)(7, "div", 3)(8, "div", 4)(9, "mat-icon");
        \u0275\u0275text(10, "people");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(11, "div", 5)(12, "h3");
        \u0275\u0275text(13, "Intern Performance Report");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(14, "p");
        \u0275\u0275text(15, "Comprehensive report with each intern's task completion rate, average scores, and overall performance metrics.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "ul", 6)(17, "li");
        \u0275\u0275text(18, "Intern details & status");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "li");
        \u0275\u0275text(20, "Task completion percentage");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(21, "li");
        \u0275\u0275text(22, "Average scores & ranking");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(23, "li");
        \u0275\u0275text(24, "Department & batch breakdown");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(25, "button", 7);
        \u0275\u0275listener("click", function ReportsComponent_Template_button_click_25_listener() {
          return ctx.downloadInternReport();
        });
        \u0275\u0275elementStart(26, "mat-icon");
        \u0275\u0275text(27, "download");
        \u0275\u0275elementEnd();
        \u0275\u0275text(28, " Download Report ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(29, "div", 3)(30, "div", 8)(31, "mat-icon");
        \u0275\u0275text(32, "assignment");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(33, "div", 5)(34, "h3");
        \u0275\u0275text(35, "Task Summary Report");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "p");
        \u0275\u0275text(37, "Detailed task breakdown showing assignment distribution, completion status, and overdue analysis.");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(38, "ul", 6)(39, "li");
        \u0275\u0275text(40, "Task details & priority");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(41, "li");
        \u0275\u0275text(42, "Assignment distribution");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "li");
        \u0275\u0275text(44, "Completion vs pending counts");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "li");
        \u0275\u0275text(46, "Overdue task analysis");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(47, "button", 9);
        \u0275\u0275listener("click", function ReportsComponent_Template_button_click_47_listener() {
          return ctx.downloadTaskReport();
        });
        \u0275\u0275elementStart(48, "mat-icon");
        \u0275\u0275text(49, "download");
        \u0275\u0275elementEnd();
        \u0275\u0275text(50, " Download Report ");
        \u0275\u0275elementEnd()()()();
      }
    }, dependencies: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatIcon, MatSnackBarModule], styles: ['\n\n.reports-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));\n  gap: 24px;\n}\n.report-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  padding: 28px;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.report-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: var(--shadow-lg);\n}\n.report-icon[_ngcontent-%COMP%] {\n  width: 56px;\n  height: 56px;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-bottom: 20px;\n}\n.report-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: white;\n  font-size: 28px;\n  width: 28px;\n  height: 28px;\n}\n.report-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 18px;\n  font-weight: 700;\n  margin-bottom: 8px;\n}\n.report-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 14px;\n  line-height: 1.6;\n  margin-bottom: 16px;\n}\n.report-includes[_ngcontent-%COMP%] {\n  list-style: none;\n  padding: 0;\n  margin-bottom: 24px;\n}\n.report-includes[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  padding: 4px 0;\n  color: var(--text-secondary);\n  font-size: 13px;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.report-includes[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]::before {\n  content: "\\2713";\n  color: var(--success);\n  font-weight: 700;\n}\n.download-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  width: 100%;\n  justify-content: center;\n}\n/*# sourceMappingURL=reports.component.css.map */'] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReportsComponent, { className: "ReportsComponent", filePath: "src\\app\\reports\\reports.component.ts", lineNumber: 123 });
})();
export {
  ReportsComponent
};
//# sourceMappingURL=chunk-AVR4WX4Y.js.map
