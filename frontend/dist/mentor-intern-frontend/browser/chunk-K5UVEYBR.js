import {
  AuthService
} from "./chunk-P73SXHQA.js";
import {
  MatChipsModule
} from "./chunk-HFHD3YW4.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-AE2MA3RX.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-E6QWQJ5U.js";
import "./chunk-26FXPKCV.js";
import {
  TaskService
} from "./chunk-SUGH4ONY.js";
import {
  Router,
  RouterLink
} from "./chunk-JDAZKFSF.js";
import {
  MatButtonModule,
  MatIconButton
} from "./chunk-BIDWELU5.js";
import "./chunk-AZIYAKBY.js";
import "./chunk-JLMQQFVU.js";
import {
  CommonModule,
  DatePipe,
  MatIcon,
  MatIconModule,
  NgClass,
  NgForOf,
  NgIf,
  SlicePipe,
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
  ɵɵpipeBind3,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-7QFRWQQD.js";

// src/app/tasks/task-list/task-list.component.ts
function TaskListComponent_a_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 6)(1, "mat-icon");
    \u0275\u0275text(2, "add");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Create Task ");
    \u0275\u0275elementEnd();
  }
}
function TaskListComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7);
    \u0275\u0275element(1, "mat-spinner", 8);
    \u0275\u0275elementEnd();
  }
}
function TaskListComponent_div_10_div_1_span_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", task_r2.overdueCount, " overdue");
  }
}
function TaskListComponent_div_10_div_1_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "button", 28);
    \u0275\u0275listener("click", function TaskListComponent_div_10_div_1_div_30_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r4);
      const task_r2 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.deleteTask(task_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function TaskListComponent_div_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275listener("click", function TaskListComponent_div_10_div_1_Template_div_click_0_listener() {
      const task_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.viewTask(task_r2));
    });
    \u0275\u0275elementStart(1, "div", 13)(2, "div", 14);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 15);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "h3", 16);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 17);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "slice");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 18)(12, "div", 19)(13, "mat-icon");
    \u0275\u0275text(14, "calendar_today");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span");
    \u0275\u0275text(16);
    \u0275\u0275pipe(17, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 19)(19, "mat-icon");
    \u0275\u0275text(20, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "span");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 20)(24, "div", 21)(25, "span");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275template(27, TaskListComponent_div_10_div_1_span_27_Template, 2, 1, "span", 22);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 23);
    \u0275\u0275element(29, "div", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(30, TaskListComponent_div_10_div_1_div_30_Template, 4, 0, "div", 25);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const task_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", "type-" + (task_r2.taskType == null ? null : task_r2.taskType.toLowerCase()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r2.taskType);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "priority-" + (task_r2.priority == null ? null : task_r2.priority.toLowerCase()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(task_r2.priority);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(task_r2.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind3(10, 15, task_r2.description, 0, 100), "", (task_r2.description == null ? null : task_r2.description.length) > 100 ? "..." : "", "");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("Due: ", \u0275\u0275pipeBind2(17, 19, task_r2.dueDate, "MMM d, y"), "");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(task_r2.createdByName);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2("", task_r2.completedCount, " / ", task_r2.totalAssigned, " completed");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", task_r2.overdueCount > 0);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", task_r2.totalAssigned > 0 ? task_r2.completedCount / task_r2.totalAssigned * 100 : 0, "%");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.auth.isMentor);
  }
}
function TaskListComponent_div_10_div_2_a_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 31);
    \u0275\u0275text(1, "Create First Task");
    \u0275\u0275elementEnd();
  }
}
function TaskListComponent_div_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 29)(1, "mat-icon");
    \u0275\u0275text(2, "assignment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No tasks created yet");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, TaskListComponent_div_10_div_2_a_5_Template, 2, 0, "a", 30);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r2.auth.isMentor);
  }
}
function TaskListComponent_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275template(1, TaskListComponent_div_10_div_1_Template, 31, 22, "div", 10)(2, TaskListComponent_div_10_div_2_Template, 6, 1, "div", 11);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.tasks);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.tasks.length === 0);
  }
}
var TaskListComponent = class _TaskListComponent {
  constructor(taskService, auth, router, snackBar) {
    this.taskService = taskService;
    this.auth = auth;
    this.router = router;
    this.snackBar = snackBar;
    this.tasks = [];
    this.loading = true;
  }
  ngOnInit() {
    this.loadTasks();
  }
  loadTasks() {
    this.loading = true;
    this.taskService.getAll().subscribe((t) => {
      this.tasks = t;
      this.loading = false;
    });
  }
  viewTask(task) {
    this.router.navigate(["/tasks", task.id]);
  }
  deleteTask(task) {
    if (confirm(`Delete task "${task.title}"?`)) {
      this.taskService.delete(task.id).subscribe(() => {
        this.snackBar.open("Task deleted", "Close", { duration: 2e3 });
        this.loadTasks();
      });
    }
  }
  static {
    this.\u0275fac = function TaskListComponent_Factory(t) {
      return new (t || _TaskListComponent)(\u0275\u0275directiveInject(TaskService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaskListComponent, selectors: [["app-task-list"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 11, vars: 3, consts: [[1, "page-container"], [1, "page-header"], [1, "header-row"], ["routerLink", "/tasks/create", "class", "btn-primary create-btn", 4, "ngIf"], ["class", "loading-state", 4, "ngIf"], ["class", "task-grid", 4, "ngIf"], ["routerLink", "/tasks/create", 1, "btn-primary", "create-btn"], [1, "loading-state"], ["diameter", "40"], [1, "task-grid"], ["class", "task-card", 3, "click", 4, "ngFor", "ngForOf"], ["class", "empty-card", 4, "ngIf"], [1, "task-card", 3, "click"], [1, "task-header"], [1, "task-type-badge", 3, "ngClass"], [1, "status-badge", 3, "ngClass"], [1, "task-title"], [1, "task-desc"], [1, "task-meta"], [1, "meta-item"], [1, "task-progress"], [1, "progress-info"], ["class", "text-danger", 4, "ngIf"], [1, "progress-track"], [1, "progress-fill"], ["class", "task-actions", 4, "ngIf"], [1, "text-danger"], [1, "task-actions"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "empty-card"], ["routerLink", "/tasks/create", "class", "btn-primary", "style", "margin-top: 16px;", 4, "ngIf"], ["routerLink", "/tasks/create", 1, "btn-primary", 2, "margin-top", "16px"]], template: function TaskListComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div")(4, "h1");
        \u0275\u0275text(5, "Task Management");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p");
        \u0275\u0275text(7, "Create, assign, and track tasks for interns");
        \u0275\u0275elementEnd()();
        \u0275\u0275template(8, TaskListComponent_a_8_Template, 4, 0, "a", 3);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(9, TaskListComponent_div_9_Template, 2, 0, "div", 4)(10, TaskListComponent_div_10_Template, 3, 2, "div", 5);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance(8);
        \u0275\u0275property("ngIf", ctx.auth.isMentor);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [
      CommonModule,
      NgClass,
      NgForOf,
      NgIf,
      SlicePipe,
      DatePipe,
      RouterLink,
      MatButtonModule,
      MatIconButton,
      MatIconModule,
      MatIcon,
      MatChipsModule,
      MatProgressSpinnerModule,
      MatProgressSpinner,
      MatSnackBarModule
    ], styles: ["\n\n.header-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.create-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  text-decoration: none;\n}\n.loading-state[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  padding: 60px;\n}\n.task-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));\n  gap: 20px;\n}\n.task-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  padding: 20px;\n  cursor: pointer;\n  transition: all 0.2s;\n  position: relative;\n}\n.task-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: var(--shadow-lg);\n  border-color: var(--primary);\n}\n.task-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 12px;\n}\n.task-type-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  padding: 4px 10px;\n  border-radius: 4px;\n}\n.type-daily[_ngcontent-%COMP%] {\n  background: rgba(14, 165, 233, 0.15);\n  color: #38bdf8;\n}\n.type-weekly[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.15);\n  color: #c084fc;\n}\n.type-project[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #fbbf24;\n}\n.type-assignment[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.15);\n  color: #34d399;\n}\n.task-title[_ngcontent-%COMP%] {\n  font-size: 16px;\n  font-weight: 700;\n  margin-bottom: 6px;\n}\n.task-desc[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  font-size: 13px;\n  margin-bottom: 16px;\n  line-height: 1.5;\n}\n.task-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  margin-bottom: 16px;\n}\n.meta-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  color: var(--text-muted);\n  font-size: 12px;\n}\n.meta-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n}\n.task-progress[_ngcontent-%COMP%] {\n}\n.progress-info[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  font-size: 12px;\n  color: var(--text-secondary);\n  margin-bottom: 6px;\n}\n.progress-track[_ngcontent-%COMP%] {\n  height: 4px;\n  background: var(--bg-surface);\n  border-radius: 2px;\n}\n.progress-fill[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      var(--success));\n  border-radius: 2px;\n  transition: width 0.5s;\n}\n.text-danger[_ngcontent-%COMP%] {\n  color: #f87171;\n  font-weight: 600;\n}\n.task-actions[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 8px;\n  right: 8px;\n  opacity: 0;\n  transition: opacity 0.2s;\n}\n.task-card[_ngcontent-%COMP%]:hover   .task-actions[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.empty-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px dashed var(--border);\n  border-radius: var(--radius);\n  padding: 60px;\n  text-align: center;\n  color: var(--text-muted);\n  grid-column: 1 / -1;\n}\n.empty-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  margin-bottom: 8px;\n}\n/*# sourceMappingURL=task-list.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaskListComponent, { className: "TaskListComponent", filePath: "src\\app\\tasks\\task-list\\task-list.component.ts", lineNumber: 139 });
})();
export {
  TaskListComponent
};
//# sourceMappingURL=chunk-K5UVEYBR.js.map
