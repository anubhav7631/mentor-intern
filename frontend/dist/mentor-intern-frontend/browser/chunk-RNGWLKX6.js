import {
  MatCardModule
} from "./chunk-TQX7SOPS.js";
import {
  MatChipsModule
} from "./chunk-HFHD3YW4.js";
import {
  MatProgressSpinnerModule
} from "./chunk-AE2MA3RX.js";
import {
  InternService
} from "./chunk-EZQUNZSE.js";
import {
  TaskService
} from "./chunk-SUGH4ONY.js";
import {
  ActivatedRoute,
  RouterLink
} from "./chunk-JDAZKFSF.js";
import {
  MatButtonModule
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
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-7QFRWQQD.js";

// src/app/interns/intern-profile/intern-profile.component.ts
function InternProfileComponent_div_0_tr_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td")(4, "span", 8);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td");
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td");
    \u0275\u0275text(10);
    \u0275\u0275pipe(11, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "td");
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const a_r1 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r1.taskTitle);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", "status-" + (a_r1.status == null ? null : a_r1.status.toLowerCase()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(a_r1.status == null ? null : a_r1.status.replace("_", " "));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(8, 7, a_r1.assignedDate, "mediumDate"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r1.completionDate ? \u0275\u0275pipeBind2(11, 10, a_r1.completionDate, "mediumDate") : "-");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(a_r1.score || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(a_r1.remarks || "-");
  }
}
function InternProfileComponent_div_0_tr_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 28);
    \u0275\u0275text(2, "No tasks assigned yet");
    \u0275\u0275elementEnd()();
  }
}
function InternProfileComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "a", 3)(3, "mat-icon");
    \u0275\u0275text(4, "arrow_back");
    \u0275\u0275elementEnd();
    \u0275\u0275text(5, " Back to Interns");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "h1");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "div", 4)(9, "div", 5)(10, "div", 6)(11, "div", 7);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div")(14, "h2");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span", 8);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 9)(19, "div", 10)(20, "mat-icon");
    \u0275\u0275text(21, "badge");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 10)(25, "mat-icon");
    \u0275\u0275text(26, "email");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span");
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 10)(30, "mat-icon");
    \u0275\u0275text(31, "phone");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "span");
    \u0275\u0275text(33);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(34, "div", 10)(35, "mat-icon");
    \u0275\u0275text(36, "school");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "span");
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "div", 10)(40, "mat-icon");
    \u0275\u0275text(41, "domain");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "span");
    \u0275\u0275text(43);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(44, "div", 10)(45, "mat-icon");
    \u0275\u0275text(46, "date_range");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "span");
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "date");
    \u0275\u0275pipe(50, "date");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(51, "div", 11)(52, "h3", 12);
    \u0275\u0275text(53, "Performance Summary");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 13)(55, "div", 14)(56, "div", 15);
    \u0275\u0275text(57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "div", 16);
    \u0275\u0275text(59, "Total Tasks");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(60, "div", 14)(61, "div", 17);
    \u0275\u0275text(62);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 16);
    \u0275\u0275text(64, "Completed");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "div", 14)(66, "div", 18);
    \u0275\u0275text(67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(68, "div", 16);
    \u0275\u0275text(69, "Completion");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(70, "div", 14)(71, "div", 19);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div", 16);
    \u0275\u0275text(74, "Remaining");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(75, "div", 20);
    \u0275\u0275element(76, "div", 21);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(77, "div", 22)(78, "h3", 12);
    \u0275\u0275text(79, "Assigned Tasks");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(80, "div", 23)(81, "table", 24)(82, "thead")(83, "tr")(84, "th");
    \u0275\u0275text(85, "Task");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(86, "th");
    \u0275\u0275text(87, "Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "th");
    \u0275\u0275text(89, "Assigned");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(90, "th");
    \u0275\u0275text(91, "Completed");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(92, "th");
    \u0275\u0275text(93, "Score");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(94, "th");
    \u0275\u0275text(95, "Remarks");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(96, "tbody");
    \u0275\u0275template(97, InternProfileComponent_div_0_tr_97_Template, 16, 13, "tr", 25)(98, InternProfileComponent_div_0_tr_98_Template, 3, 0, "tr", 26);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.intern.name);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.intern.name == null ? null : ctx_r1.intern.name.charAt(0));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.intern.name);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", "status-" + (ctx_r1.intern.status == null ? null : ctx_r1.intern.status.toLowerCase()));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.intern.status);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.intern.internId);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.intern.email);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.intern.phone || "-");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.intern.college || "-");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.intern.department || "-");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(49, 20, ctx_r1.intern.startDate, "mediumDate"), " - ", \u0275\u0275pipeBind2(50, 23, ctx_r1.intern.endDate, "mediumDate"), "");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.intern.totalTasks);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.intern.completedTasks);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.intern.completionPercentage, "%");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.intern.totalTasks - ctx_r1.intern.completedTasks);
    \u0275\u0275advance(4);
    \u0275\u0275styleProp("width", ctx_r1.intern.completionPercentage, "%");
    \u0275\u0275advance(21);
    \u0275\u0275property("ngForOf", ctx_r1.assignments);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.assignments.length === 0);
  }
}
var InternProfileComponent = class _InternProfileComponent {
  constructor(route, internService, taskService) {
    this.route = route;
    this.internService = internService;
    this.taskService = taskService;
    this.intern = null;
    this.assignments = [];
  }
  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.internService.getById(id).subscribe((i) => this.intern = i);
    this.taskService.getInternAssignments(id).subscribe((a) => this.assignments = a);
  }
  static {
    this.\u0275fac = function InternProfileComponent_Factory(t) {
      return new (t || _InternProfileComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(InternService), \u0275\u0275directiveInject(TaskService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _InternProfileComponent, selectors: [["app-intern-profile"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 1, vars: 1, consts: [["class", "page-container", 4, "ngIf"], [1, "page-container"], [1, "page-header"], ["routerLink", "/interns", 1, "back-link"], [1, "card-grid", "card-grid-2"], [1, "profile-card"], [1, "profile-header"], [1, "profile-avatar"], [1, "status-badge", 3, "ngClass"], [1, "profile-details"], [1, "detail-row"], [1, "stats-card"], [1, "section-title"], [1, "card-grid", "card-grid-2", 2, "gap", "12px"], [1, "mini-stat"], [1, "mini-val"], [1, "mini-label"], [1, "mini-val", "text-success"], [1, "mini-val", "text-primary"], [1, "mini-val", "text-warning"], [1, "big-progress"], [1, "big-progress-bar"], [1, "section", 2, "margin-top", "24px"], [1, "data-table-container"], [1, "performance-table"], [4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "fw-600"], ["colspan", "6", 2, "text-align", "center", "padding", "30px", "color", "var(--text-muted)"]], template: function InternProfileComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275template(0, InternProfileComponent_div_0_Template, 99, 26, "div", 0);
      }
      if (rf & 2) {
        \u0275\u0275property("ngIf", ctx.intern);
      }
    }, dependencies: [
      CommonModule,
      NgClass,
      NgForOf,
      NgIf,
      DatePipe,
      RouterLink,
      MatCardModule,
      MatIconModule,
      MatIcon,
      MatButtonModule,
      MatChipsModule,
      MatProgressSpinnerModule
    ], styles: ["\n\n.back-link[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  gap: 4px;\n  color: var(--text-secondary);\n  text-decoration: none;\n  margin-bottom: 12px;\n  font-size: 14px;\n}\n.back-link[_ngcontent-%COMP%]:hover {\n  color: var(--primary-light);\n}\n.profile-card[_ngcontent-%COMP%], .stats-card[_ngcontent-%COMP%] {\n  background: var(--bg-card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  padding: 24px;\n}\n.profile-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  margin-bottom: 24px;\n}\n.profile-avatar[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  background:\n    linear-gradient(\n      135deg,\n      var(--primary),\n      var(--secondary));\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 28px;\n  font-weight: 800;\n  color: white;\n}\n.profile-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 22px;\n  font-weight: 700;\n}\n.profile-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n.detail-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  color: var(--text-secondary);\n}\n.detail-row[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n  color: var(--text-muted);\n}\n.mini-stat[_ngcontent-%COMP%] {\n  background: var(--bg-surface);\n  border-radius: var(--radius-sm);\n  padding: 16px;\n  text-align: center;\n}\n.mini-val[_ngcontent-%COMP%] {\n  font-size: 24px;\n  font-weight: 800;\n}\n.mini-label[_ngcontent-%COMP%] {\n  font-size: 11px;\n  color: var(--text-muted);\n  margin-top: 4px;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.text-success[_ngcontent-%COMP%] {\n  color: #34d399;\n}\n.text-primary[_ngcontent-%COMP%] {\n  color: var(--primary-light);\n}\n.text-warning[_ngcontent-%COMP%] {\n  color: #fbbf24;\n}\n.big-progress[_ngcontent-%COMP%] {\n  height: 8px;\n  background: var(--bg-surface);\n  border-radius: 4px;\n  margin-top: 16px;\n}\n.big-progress-bar[_ngcontent-%COMP%] {\n  height: 100%;\n  background:\n    linear-gradient(\n      90deg,\n      var(--primary),\n      var(--secondary));\n  border-radius: 4px;\n  transition: width 0.5s;\n}\n.performance-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.performance-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  text-align: left;\n  padding: 14px 16px;\n  color: var(--text-secondary);\n  font-weight: 600;\n  font-size: 12px;\n  text-transform: uppercase;\n  border-bottom: 1px solid var(--border);\n}\n.performance-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 14px 16px;\n  border-bottom: 1px solid var(--border);\n  font-size: 14px;\n}\n.fw-600[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n/*# sourceMappingURL=intern-profile.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(InternProfileComponent, { className: "InternProfileComponent", filePath: "src\\app\\interns\\intern-profile\\intern-profile.component.ts", lineNumber: 125 });
})();
export {
  InternProfileComponent
};
//# sourceMappingURL=chunk-RNGWLKX6.js.map
