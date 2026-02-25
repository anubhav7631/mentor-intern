import {
  AuthService
} from "./chunk-P73SXHQA.js";
import {
  MatProgressSpinnerModule
} from "./chunk-AE2MA3RX.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-XNFM5PTO.js";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-E6QWQJ5U.js";
import "./chunk-26FXPKCV.js";
import {
  TaskService
} from "./chunk-SUGH4ONY.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-JDAZKFSF.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-BIDWELU5.js";
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel
} from "./chunk-AZIYAKBY.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MaxValidator,
  MinValidator,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-JLMQQFVU.js";
import {
  CommonModule,
  DatePipe,
  MatIcon,
  MatIconModule,
  NgClass,
  NgForOf,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7QFRWQQD.js";

// src/app/tasks/task-detail/task-detail.component.ts
function TaskDetailComponent_div_0_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "button", 22);
    \u0275\u0275listener("click", function TaskDetailComponent_div_0_div_17_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.completeAll());
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Mark All Complete ");
    \u0275\u0275elementEnd()();
  }
}
function TaskDetailComponent_div_0_th_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th");
    \u0275\u0275text(1, "Actions");
    \u0275\u0275elementEnd();
  }
}
function TaskDetailComponent_div_0_tr_59_td_18_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 25);
    \u0275\u0275listener("click", function TaskDetailComponent_div_0_tr_59_td_18_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const a_r4 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.openComplete(a_r4));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "check");
    \u0275\u0275elementEnd()();
  }
}
function TaskDetailComponent_div_0_tr_59_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td");
    \u0275\u0275template(1, TaskDetailComponent_div_0_tr_59_td_18_button_1_Template, 3, 0, "button", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r4 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", a_r4.status !== "COMPLETED");
  }
}
function TaskDetailComponent_div_0_tr_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td")(6, "span", 7);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "td");
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td");
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td");
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, TaskDetailComponent_div_0_tr_59_td_18_Template, 2, 1, "td", 18);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const a_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r4.internName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r4.internInternId);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", "status-" + (a_r4.status == null ? null : a_r4.status.toLowerCase()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r4.status == null ? null : a_r4.status.replace("_", " "));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 9, a_r4.assignedDate, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r4.completionDate ? \u0275\u0275pipeBind2(13, 12, a_r4.completionDate, "mediumDate") : "-");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r4.score || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r4.remarks || "-");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.auth.isMentor);
  }
}
function TaskDetailComponent_div_0_tr_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 26);
    \u0275\u0275text(2, " No assignments yet ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.auth.isMentor ? 8 : 7);
  }
}
function TaskDetailComponent_div_0_div_61_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275listener("click", function TaskDetailComponent_div_0_div_61_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.completingAssignment = null);
    });
    \u0275\u0275elementStart(1, "div", 28);
    \u0275\u0275listener("click", function TaskDetailComponent_div_0_div_61_Template_div_click_1_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "h3");
    \u0275\u0275text(3, "Complete Assignment");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "p");
    \u0275\u0275text(5, "For: ");
    \u0275\u0275elementStart(6, "strong");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-form-field", 29)(9, "mat-label");
    \u0275\u0275text(10, "Remarks");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "textarea", 30);
    \u0275\u0275twoWayListener("ngModelChange", function TaskDetailComponent_div_0_div_61_Template_textarea_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.completeRemarks, $event) || (ctx_r1.completeRemarks = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "mat-form-field", 29)(13, "mat-label");
    \u0275\u0275text(14, "Score (0-100)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 31);
    \u0275\u0275twoWayListener("ngModelChange", function TaskDetailComponent_div_0_div_61_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.completeScore, $event) || (ctx_r1.completeScore = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "div", 32)(17, "button", 33);
    \u0275\u0275listener("click", function TaskDetailComponent_div_0_div_61_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.completingAssignment = null);
    });
    \u0275\u0275text(18, "Cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "button", 22);
    \u0275\u0275listener("click", function TaskDetailComponent_div_0_div_61_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.submitComplete());
    });
    \u0275\u0275text(20, "Mark Complete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.completingAssignment.internName);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.completeRemarks);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.completeScore);
  }
}
function TaskDetailComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "a", 3)(3, "mat-icon");
    \u0275\u0275text(4, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Back to Tasks");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 4)(7, "div")(8, "div", 5)(9, "span", 6);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "span", 7);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "h1");
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "p");
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(17, TaskDetailComponent_div_0_div_17_Template, 5, 0, "div", 8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 9)(19, "div", 10)(20, "div", 11);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 12);
    \u0275\u0275text(23, "Total Assigned");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 10)(25, "div", 13);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 12);
    \u0275\u0275text(28, "Completed");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 10)(30, "div", 14);
    \u0275\u0275text(31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 12);
    \u0275\u0275text(33, "Pending");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 10)(35, "div", 15);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "div", 12);
    \u0275\u0275text(38, "Overdue");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(39, "div", 16)(40, "table", 17)(41, "thead")(42, "tr")(43, "th");
    \u0275\u0275text(44, "Intern");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "th");
    \u0275\u0275text(46, "Intern ID");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "th");
    \u0275\u0275text(48, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "th");
    \u0275\u0275text(50, "Assigned");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "th");
    \u0275\u0275text(52, "Completed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "th");
    \u0275\u0275text(54, "Score");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "th");
    \u0275\u0275text(56, "Remarks");
    \u0275\u0275elementEnd();
    \u0275\u0275template(57, TaskDetailComponent_div_0_th_57_Template, 2, 0, "th", 18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(58, "tbody");
    \u0275\u0275template(59, TaskDetailComponent_div_0_tr_59_Template, 19, 15, "tr", 19)(60, TaskDetailComponent_div_0_tr_60_Template, 3, 1, "tr", 18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(61, TaskDetailComponent_div_0_div_61_Template, 21, 3, "div", 20);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("ngClass", "type-" + (ctx_r1.task.taskType == null ? null : ctx_r1.task.taskType.toLowerCase()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.task.taskType);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "priority-" + (ctx_r1.task.priority == null ? null : ctx_r1.task.priority.toLowerCase()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.task.priority);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.task.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.task.description);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.auth.isMentor);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.task.totalAssigned);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.task.completedCount);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.task.pendingCount);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.task.overdueCount);
    \u0275\u0275advance(21);
    \u0275\u0275property("ngIf", ctx_r1.auth.isMentor);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.task.assignments);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(ctx_r1.task.assignments == null ? null : ctx_r1.task.assignments.length));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.completingAssignment);
  }
}
var TaskDetailComponent = class _TaskDetailComponent {
  constructor(route, taskService, auth, snackBar) {
    this.route = route;
    this.taskService = taskService;
    this.auth = auth;
    this.snackBar = snackBar;
    this.task = null;
    this.completingAssignment = null;
    this.completeRemarks = "";
    this.completeScore = null;
  }
  ngOnInit() {
    this.loadTask();
  }
  loadTask() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.taskService.getById(id).subscribe((t) => this.task = t);
  }
  openComplete(a) {
    this.completingAssignment = a;
    this.completeRemarks = "";
    this.completeScore = null;
  }
  submitComplete() {
    if (!this.completingAssignment)
      return;
    this.taskService.completeAssignment(this.completingAssignment.id, this.completeRemarks, this.completeScore).subscribe(() => {
      this.snackBar.open("Assignment marked complete", "Close", { duration: 2e3 });
      this.completingAssignment = null;
      this.loadTask();
    });
  }
  completeAll() {
    if (!this.task || !confirm("Mark all assignments as complete?"))
      return;
    this.taskService.completeAll(this.task.id, "", null).subscribe(() => {
      this.snackBar.open("All assignments marked complete", "Close", { duration: 2e3 });
      this.loadTask();
    });
  }
  static {
    this.\u0275fac = function TaskDetailComponent_Factory(t) {
      return new (t || _TaskDetailComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(TaskService), \u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TaskDetailComponent, selectors: [["app-task-detail"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["class", "page-container", 4, "ngIf"], [1, "page-container"], [1, "page-header"], ["routerLink", "/tasks", 1, "back-link"], [1, "header-row"], [1, "header-badges"], [1, "type-badge", 3, "ngClass"], [1, "status-badge", 3, "ngClass"], ["class", "header-actions", 4, "ngIf"], [1, "card-grid", "card-grid-4", 2, "margin-bottom", "24px"], [1, "stat-card"], [1, "stat-value"], [1, "stat-label"], [1, "stat-value", 2, "color", "#34d399"], [1, "stat-value", 2, "color", "#fbbf24"], [1, "stat-value", 2, "color", "#f87171"], [1, "data-table-container"], [1, "performance-table"], [4, "ngIf"], [4, "ngFor", "ngForOf"], ["class", "complete-dialog-overlay", 3, "click", 4, "ngIf"], [1, "header-actions"], [1, "btn-primary", 3, "click"], [1, "fw-600"], ["mat-icon-button", "", "color", "primary", "title", "Mark Complete", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "primary", "title", "Mark Complete", 3, "click"], [2, "text-align", "center", "padding", "30px", "color", "var(--text-muted)"], [1, "complete-dialog-overlay", 3, "click"], [1, "complete-dialog", 3, "click"], ["appearance", "outline"], ["matInput", "", "rows", "3", 3, "ngModelChange", "ngModel"], ["matInput", "", "type", "number", "min", "0", "max", "100", 3, "ngModelChange", "ngModel"], [1, "dialog-actions"], ["mat-button", "", 3, "click"]], template: function TaskDetailComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, TaskDetailComponent_div_0_Template, 62, 15, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.task);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, DatePipe, FormsModule, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, MinValidator, MaxValidator, NgModel, RouterLink, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatSnackBarModule, MatProgressSpinnerModule, MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput], styles: ["\n\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  color: var(--text-secondary);\n  text-decoration: none;\n  margin-bottom: 12px;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: var(--primary-light);\n}\n.header-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n  gap: 16px;\n  flex-wrap: wrap;\n}\n.header-badges[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  margin-bottom: 8px;\n}\n.header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n}\n.type-badge[_ngcontent-%COMP%] {\n  font-size: 11px;\n  font-weight: 700;\n  text-transform: uppercase;\n  padding: 4px 10px;\n  border-radius: 4px;\n}\n.type-daily[_ngcontent-%COMP%] {\n  background: rgba(14, 165, 233, 0.15);\n  color: #38bdf8;\n}\n.type-weekly[_ngcontent-%COMP%] {\n  background: rgba(168, 85, 247, 0.15);\n  color: #c084fc;\n}\n.type-project[_ngcontent-%COMP%] {\n  background: rgba(245, 158, 11, 0.15);\n  color: #fbbf24;\n}\n.type-assignment[_ngcontent-%COMP%] {\n  background: rgba(16, 185, 129, 0.15);\n  color: #34d399;\n}\n.performance-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.performance-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 14px 16px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  font-size: 12px;\n  text-transform: uppercase;\n  border-bottom: 1px solid var(--border);\n}\n.performance-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border-bottom: 1px solid var(--border);\n  font-size: 14px;\n}\n.performance-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background: var(--bg-surface);\n}\n.fw-600[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.complete-dialog-overlay[_ngcontent-%COMP%] {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.6);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n}\n.complete-dialog[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  padding: 24px;\n  width: 400px;\n  max-width: 90vw;\n}\n.complete-dialog[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n.complete-dialog[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-bottom: 16px;\n}\n.dialog-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 16px;\n}\n/*# sourceMappingURL=task-detail.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TaskDetailComponent, { className: "TaskDetailComponent", filePath: "src\\app\\tasks\\task-detail\\task-detail.component.ts", lineNumber: 154 });
})();
export {
  TaskDetailComponent
};
//# sourceMappingURL=chunk-4CWHQL7B.js.map
