import {
  AuthService
} from "./chunk-P73SXHQA.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-AE2MA3RX.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-XNFM5PTO.js";
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
  Router,
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
  MatLabel,
  MatPrefix,
  MatSuffix
} from "./chunk-AZIYAKBY.js";
import {
  DefaultValueAccessor,
  FormsModule,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-JLMQQFVU.js";
import {
  CommonModule,
  MatIcon,
  MatIconModule,
  MatOption,
  NgIf,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-7QFRWQQD.js";

// src/app/auth/register/register.component.ts
function RegisterComponent_mat_spinner_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 27);
  }
}
function RegisterComponent_span_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Create Account");
    \u0275\u0275elementEnd();
  }
}
var RegisterComponent = class _RegisterComponent {
  constructor(auth, router, snackBar) {
    this.auth = auth;
    this.router = router;
    this.snackBar = snackBar;
    this.fullName = "";
    this.username = "";
    this.email = "";
    this.password = "";
    this.role = "MENTOR";
    this.hidePassword = true;
    this.loading = false;
  }
  onRegister() {
    if (!this.fullName || !this.username || !this.email || !this.password)
      return;
    this.loading = true;
    this.auth.register({
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    }).subscribe({
      next: (user) => {
        this.loading = false;
        this.snackBar.open("Account created successfully!", "Close", { duration: 3e3 });
        this.router.navigate([user.role === "MENTOR" ? "/dashboard" : "/my-tasks"]);
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || "Registration failed", "Close", { duration: 3e3 });
      }
    });
  }
  static {
    this.\u0275fac = function RegisterComponent_Factory(t) {
      return new (t || _RegisterComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RegisterComponent, selectors: [["app-register"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 66, vars: 10, consts: [[1, "auth-container"], [1, "auth-left"], [1, "floating-shapes"], [1, "shape", "shape-1"], [1, "shape", "shape-2"], [1, "shape", "shape-3"], [1, "illustration-content"], [1, "illustration-icon"], [1, "auth-right"], [1, "auth-form-wrapper"], [1, "auth-header"], [1, "auth-form", 3, "ngSubmit"], ["appearance", "outline"], ["matInput", "", "name", "fullName", "required", "", 3, "ngModelChange", "ngModel"], ["matPrefix", ""], ["matInput", "", "name", "username", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", "name", "email", "type", "email", "required", "", 3, "ngModelChange", "ngModel"], ["matInput", "", "name", "password", "required", "", 3, "ngModelChange", "type", "ngModel"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["name", "role", 3, "ngModelChange", "ngModel"], ["value", "MENTOR"], ["value", "INTERN"], ["mat-raised-button", "", "type", "submit", 1, "btn-primary", "login-btn", 3, "disabled"], ["diameter", "20", 4, "ngIf"], [4, "ngIf"], [1, "auth-footer"], ["routerLink", "/login"], ["diameter", "20"]], template: function RegisterComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2);
        \u0275\u0275element(3, "div", 3)(4, "div", 4)(5, "div", 5);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "div", 6)(7, "mat-icon", 7);
        \u0275\u0275text(8, "group_add");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(9, "h2");
        \u0275\u0275text(10, "Join MentorHub");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(11, "p");
        \u0275\u0275text(12, "Create your account and start managing");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(13, "div", 8)(14, "div", 9)(15, "div", 10)(16, "h1");
        \u0275\u0275text(17, "Create Account");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(18, "p");
        \u0275\u0275text(19, "Fill in the details to get started");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(20, "form", 11);
        \u0275\u0275listener("ngSubmit", function RegisterComponent_Template_form_ngSubmit_20_listener() {
          return ctx.onRegister();
        });
        \u0275\u0275elementStart(21, "mat-form-field", 12)(22, "mat-label");
        \u0275\u0275text(23, "Full Name");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "input", 13);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_24_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.fullName, $event) || (ctx.fullName = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "mat-icon", 14);
        \u0275\u0275text(26, "badge");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(27, "mat-form-field", 12)(28, "mat-label");
        \u0275\u0275text(29, "Username");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(30, "input", 15);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_30_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.username, $event) || (ctx.username = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "mat-icon", 14);
        \u0275\u0275text(32, "person");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(33, "mat-form-field", 12)(34, "mat-label");
        \u0275\u0275text(35, "Email");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(36, "input", 16);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_36_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.email, $event) || (ctx.email = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(37, "mat-icon", 14);
        \u0275\u0275text(38, "email");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(39, "mat-form-field", 12)(40, "mat-label");
        \u0275\u0275text(41, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(42, "input", 17);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_input_ngModelChange_42_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "mat-icon", 14);
        \u0275\u0275text(44, "lock");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(45, "button", 18);
        \u0275\u0275listener("click", function RegisterComponent_Template_button_click_45_listener() {
          return ctx.hidePassword = !ctx.hidePassword;
        });
        \u0275\u0275elementStart(46, "mat-icon");
        \u0275\u0275text(47);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(48, "mat-form-field", 12)(49, "mat-label");
        \u0275\u0275text(50, "Role");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(51, "mat-select", 19);
        \u0275\u0275twoWayListener("ngModelChange", function RegisterComponent_Template_mat_select_ngModelChange_51_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.role, $event) || (ctx.role = $event);
          return $event;
        });
        \u0275\u0275elementStart(52, "mat-option", 20);
        \u0275\u0275text(53, "Mentor / Admin");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(54, "mat-option", 21);
        \u0275\u0275text(55, "Intern");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(56, "mat-icon", 14);
        \u0275\u0275text(57, "work");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(58, "button", 22);
        \u0275\u0275template(59, RegisterComponent_mat_spinner_59_Template, 1, 0, "mat-spinner", 23)(60, RegisterComponent_span_60_Template, 2, 0, "span", 24);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(61, "div", 25)(62, "span");
        \u0275\u0275text(63, "Already have an account?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(64, "a", 26);
        \u0275\u0275text(65, "Sign In");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(24);
        \u0275\u0275twoWayProperty("ngModel", ctx.fullName);
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.username);
        \u0275\u0275advance(6);
        \u0275\u0275twoWayProperty("ngModel", ctx.email);
        \u0275\u0275advance(6);
        \u0275\u0275property("type", ctx.hidePassword ? "password" : "text");
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.hidePassword ? "visibility_off" : "visibility");
        \u0275\u0275advance(4);
        \u0275\u0275twoWayProperty("ngModel", ctx.role);
        \u0275\u0275advance(7);
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterLink, MatFormFieldModule, MatFormField, MatLabel, MatPrefix, MatSuffix, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatSelectModule, MatSelect, MatOption, MatSnackBarModule, MatProgressSpinnerModule, MatProgressSpinner], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  background: var(--bg-dark);\n}\n.auth-left[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #1e3a5f,\n      #0f766e,\n      #1e1b4b);\n  position: relative;\n  overflow: hidden;\n}\n.floating-shapes[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.shape[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  opacity: 0.1;\n  animation: _ngcontent-%COMP%_float 6s ease-in-out infinite;\n}\n.shape-1[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  background: var(--success);\n  top: 10%;\n  left: 10%;\n}\n.shape-2[_ngcontent-%COMP%] {\n  width: 200px;\n  height: 200px;\n  background: var(--primary);\n  bottom: 20%;\n  right: 10%;\n  animation-delay: -2s;\n}\n.shape-3[_ngcontent-%COMP%] {\n  width: 150px;\n  height: 150px;\n  background: var(--secondary);\n  top: 60%;\n  left: 50%;\n  animation-delay: -4s;\n}\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% {\n    transform: translateY(0);\n  }\n  50% {\n    transform: translateY(-20px);\n  }\n}\n.illustration-content[_ngcontent-%COMP%] {\n  text-align: center;\n  z-index: 1;\n  position: relative;\n}\n.illustration-icon[_ngcontent-%COMP%] {\n  font-size: 80px;\n  width: 80px;\n  height: 80px;\n  color: white;\n  margin-bottom: 16px;\n}\n.illustration-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 36px;\n  font-weight: 800;\n  color: white;\n}\n.illustration-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 16px;\n  margin-top: 8px;\n}\n.auth-right[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  overflow-y: auto;\n}\n.auth-form-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  padding: 40px;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  margin-bottom: 4px;\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-bottom: 24px;\n}\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 4px;\n}\n.login-btn[_ngcontent-%COMP%] {\n  height: 48px;\n  font-size: 16px;\n  margin-top: 8px;\n  width: 100%;\n}\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n  color: var(--text-secondary);\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--primary-light);\n  text-decoration: none;\n  font-weight: 600;\n  margin-left: 4px;\n}\n@media (max-width: 768px) {\n  .auth-left[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=register.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RegisterComponent, { className: "RegisterComponent", filePath: "src\\app\\auth\\register\\register.component.ts", lineNumber: 121 });
})();
export {
  RegisterComponent
};
//# sourceMappingURL=chunk-FK5P6AG5.js.map
