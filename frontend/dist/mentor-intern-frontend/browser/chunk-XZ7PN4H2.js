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
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-E6QWQJ5U.js";
import "./chunk-26FXPKCV.js";
import {
  TaskService
} from "./chunk-SUGH4ONY.js";
import {
  MatButtonModule
} from "./chunk-BIDWELU5.js";
import {
  MatFormField,
  MatFormFieldModule
} from "./chunk-AZIYAKBY.js";
import {
  FormsModule
} from "./chunk-JLMQQFVU.js";
import {
  CommonModule,
  DatePipe,
  MatIcon,
  MatIconModule,
  MatOption,
  NgClass,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-7QFRWQQD.js";

// src/app/intern-portal/intern-tasks.component.ts
function InternTasksComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4);
    \u0275\u0275element(1, "mat-spinner", 5);
    \u0275\u0275elementEnd();
  }
}
function InternTasksComponent_div_7_div_35_span_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span")(1, "mat-icon");
    \u0275\u0275text(2, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Completed: ", \u0275\u0275pipeBind2(4, 1, a_r1.completionDate, "mediumDate"), "");
  }
}
function InternTasksComponent_div_7_div_35_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Score: ", a_r1.score, "");
  }
}
function InternTasksComponent_div_7_div_35_mat_form_field_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 26)(1, "mat-select", 27);
    \u0275\u0275listener("selectionChange", function InternTasksComponent_div_7_div_35_mat_form_field_16_Template_mat_select_selectionChange_1_listener($event) {
      \u0275\u0275restoreView(_r2);
      const a_r1 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateStatus(a_r1, $event.value));
    });
    \u0275\u0275elementStart(2, "mat-option", 28);
    \u0275\u0275text(3, "Not Started");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-option", 29);
    \u0275\u0275text(5, "In Progress");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const a_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("value", a_r1.status);
  }
}
function InternTasksComponent_div_7_div_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 18)(2, "div", 19)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 20)(6, "span")(7, "mat-icon");
    \u0275\u0275text(8, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275template(11, InternTasksComponent_div_7_div_35_span_11_Template, 5, 4, "span", 3);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 21);
    \u0275\u0275template(13, InternTasksComponent_div_7_div_35_span_13_Template, 2, 1, "span", 22);
    \u0275\u0275elementStart(14, "span", 23);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, InternTasksComponent_div_7_div_35_mat_form_field_16_Template, 6, 1, "mat-form-field", 24);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r1 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(a_r1.taskTitle);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" Assigned: ", \u0275\u0275pipeBind2(10, 7, a_r1.assignedDate, "mediumDate"), "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", a_r1.completionDate);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", a_r1.score);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "status-" + (a_r1.status == null ? null : a_r1.status.toLowerCase()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r1.status == null ? null : a_r1.status.replace("_", " "));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", a_r1.status !== "COMPLETED");
  }
}
function InternTasksComponent_div_7_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "mat-icon");
    \u0275\u0275text(2, "inbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No tasks assigned to you yet");
    \u0275\u0275elementEnd()();
  }
}
function InternTasksComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "div", 6)(2, "div", 7)(3, "div", 8)(4, "mat-icon");
    \u0275\u0275text(5, "assignment");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 9);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 10);
    \u0275\u0275text(9, "Total Assigned");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 7)(11, "div", 11)(12, "mat-icon");
    \u0275\u0275text(13, "check_circle");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 9);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 10);
    \u0275\u0275text(17, "Completed");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 7)(19, "div", 12)(20, "mat-icon");
    \u0275\u0275text(21, "hourglass_empty");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 9);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 10);
    \u0275\u0275text(25, "In Progress");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 7)(27, "div", 13)(28, "mat-icon");
    \u0275\u0275text(29, "warning");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div", 9);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 10);
    \u0275\u0275text(33, "Overdue");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "div", 14);
    \u0275\u0275template(35, InternTasksComponent_div_7_div_35_Template, 17, 10, "div", 15)(36, InternTasksComponent_div_7_div_36_Template, 5, 0, "div", 16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r2.assignments.length);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.countByStatus("COMPLETED"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.countByStatus("IN_PROGRESS"));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r2.countByStatus("OVERDUE"));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r2.assignments);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.assignments.length === 0);
  }
}
var InternTasksComponent = class _InternTasksComponent {
  constructor(taskService, auth, snackBar) {
    this.taskService = taskService;
    this.auth = auth;
    this.snackBar = snackBar;
    this.assignments = [];
    this.loading = true;
  }
  ngOnInit() {
    this.loadTasks();
  }
  loadTasks() {
    this.loading = true;
    this.taskService.getMyTasks().subscribe({
      next: (tasks) => {
        this.assignments = [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  countByStatus(status) {
    return this.assignments.filter((a) => a.status === status).length;
  }
  updateStatus(a, status) {
    this.taskService.updateAssignmentStatus(a.id, status).subscribe({
      next: (updated) => {
        a.status = updated.status;
        this.snackBar.open("Status updated", "Close", { duration: 2e3 });
      },
      error: () => {
        this.snackBar.open("Failed to update status", "Close", { duration: 3e3 });
      }
    });
  }
  static {
    this.\u0275fac = function InternTasksComponent_Factory(t) {
      return new (t || _InternTasksComponent)(\u0275\u0275directiveInject(TaskService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InternTasksComponent, selectors: [["app-intern-tasks"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 8, vars: 2, consts: [[1, "page-container"], [1, "page-header"], ["class", "loading-state", 4, "ngIf"], [4, "ngIf"], [1, "loading-state"], ["diameter", "40"], [1, "card-grid", "card-grid-4", 2, "margin-bottom", "24px"], [1, "stat-card"], [1, "stat-icon", 2, "background", "rgba(99, 102, 241, 0.15)", "color", "#818cf8"], [1, "stat-value"], [1, "stat-label"], [1, "stat-icon", 2, "background", "rgba(16, 185, 129, 0.15)", "color", "#34d399"], [1, "stat-icon", 2, "background", "rgba(14, 165, 233, 0.15)", "color", "#38bdf8"], [1, "stat-icon", 2, "background", "rgba(239, 68, 68, 0.15)", "color", "#f87171"], [1, "task-list"], ["class", "task-item", 4, "ngFor", "ngForOf"], ["class", "empty-state", 4, "ngIf"], [1, "task-item"], [1, "task-left"], [1, "task-info"], [1, "task-meta"], [1, "task-right"], ["class", "score-badge", 4, "ngIf"], [1, "status-badge", 3, "ngClass"], ["appearance", "outline", "class", "status-select", 4, "ngIf"], [1, "score-badge"], ["appearance", "outline", 1, "status-select"], [3, "selectionChange", "value"], ["value", "NOT_STARTED"], ["value", "IN_PROGRESS"], [1, "empty-state"]], template: function InternTasksComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1");
        \u0275\u0275text(3, "My Tasks");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(4, "p");
        \u0275\u0275text(5, "View and update the status of tasks assigned to you");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(6, InternTasksComponent_div_6_Template, 2, 0, "div", 2)(7, InternTasksComponent_div_7_Template, 37, 6, "div", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(6);
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, DatePipe, FormsModule, MatIconModule, MatIcon, MatButtonModule, MatSelectModule, MatFormField, MatSelect, MatOption, MatFormFieldModule, MatSnackBarModule, MatProgressSpinnerModule, MatProgressSpinner], styles: ["\n\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.task-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.task-item[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  padding: 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 16px;\n  transition: border-color 0.2s;\n}\n.task-item[_ngcontent-%COMP%]:hover {\n  border-color: var(--primary);\n}\n.task-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  margin-bottom: 6px;\n}\n.task-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.task-meta[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  color: var(--text-muted);\n  font-size: 12px;\n}\n.task-meta[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.task-right[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  flex-shrink: 0;\n}\n.score-badge[_ngcontent-%COMP%] {\n  background: rgba(99, 102, 241, 0.15);\n  color: #818cf8;\n  padding: 4px 12px;\n  border-radius: 20px;\n  font-size: 12px;\n  font-weight: 600;\n}\n.status-select[_ngcontent-%COMP%] {\n  width: 160px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px;\n  color: var(--text-muted);\n}\n.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  margin-bottom: 8px;\n}\n/*# sourceMappingURL=intern-tasks.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InternTasksComponent, { className: "InternTasksComponent", filePath: "src\\app\\intern-portal\\intern-tasks.component.ts", lineNumber: 125 });
})();
export {
  InternTasksComponent
};
//# sourceMappingURL=chunk-XZ7PN4H2.js.map
