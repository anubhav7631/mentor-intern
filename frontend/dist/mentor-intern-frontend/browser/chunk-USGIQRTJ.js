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
  MatInput,
  MatInputModule
} from "./chunk-XNFM5PTO.js";
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

// src/app/auth/login/login.component.ts
function LoginComponent_mat_spinner_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 23);
  }
}
function LoginComponent_span_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "Sign In");
    \u0275\u0275elementEnd();
  }
}
var LoginComponent = class _LoginComponent {
  constructor(auth, router, snackBar) {
    this.auth = auth;
    this.router = router;
    this.snackBar = snackBar;
    this.username = "";
    this.password = "";
    this.hidePassword = true;
    this.loading = false;
  }
  onLogin() {
    if (!this.username || !this.password)
      return;
    this.loading = true;
    this.auth.login(this.username, this.password).subscribe({
      next: (user) => {
        this.loading = false;
        if (user.role === "MENTOR") {
          this.router.navigate(["/dashboard"]);
        } else {
          this.router.navigate(["/my-tasks"]);
        }
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open("Invalid credentials. Please try again.", "Close", { duration: 3e3 });
      }
    });
  }
  static {
    this.\u0275fac = function LoginComponent_Factory(t) {
      return new (t || _LoginComponent)(\u0275\u0275directiveInject(AuthService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 45, vars: 7, consts: [[1, "auth-container"], [1, "auth-left"], [1, "auth-illustration"], [1, "floating-shapes"], [1, "shape", "shape-1"], [1, "shape", "shape-2"], [1, "shape", "shape-3"], [1, "illustration-content"], [1, "illustration-icon"], [1, "auth-right"], [1, "auth-form-wrapper"], [1, "auth-header"], [1, "auth-form", 3, "ngSubmit"], ["appearance", "outline"], ["matInput", "", "name", "username", "required", "", 3, "ngModelChange", "ngModel"], ["matPrefix", ""], ["matInput", "", "name", "password", "required", "", 3, "ngModelChange", "type", "ngModel"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["mat-raised-button", "", "type", "submit", 1, "btn-primary", "login-btn", 3, "disabled"], ["diameter", "20", 4, "ngIf"], [4, "ngIf"], [1, "auth-footer"], ["routerLink", "/register"], ["diameter", "20"]], template: function LoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275element(4, "div", 4)(5, "div", 5)(6, "div", 6);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(7, "div", 7)(8, "mat-icon", 8);
        \u0275\u0275text(9, "school");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "h2");
        \u0275\u0275text(11, "MentorHub");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "p");
        \u0275\u0275text(13, "Enterprise Mentor-Intern Management System");
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(14, "div", 9)(15, "div", 10)(16, "div", 11)(17, "h1");
        \u0275\u0275text(18, "Welcome Back");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(19, "p");
        \u0275\u0275text(20, "Sign in to your account to continue");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(21, "form", 12);
        \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_21_listener() {
          return ctx.onLogin();
        });
        \u0275\u0275elementStart(22, "mat-form-field", 13)(23, "mat-label");
        \u0275\u0275text(24, "Username");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(25, "input", 14);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_25_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.username, $event) || (ctx.username = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(26, "mat-icon", 15);
        \u0275\u0275text(27, "person");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(28, "mat-form-field", 13)(29, "mat-label");
        \u0275\u0275text(30, "Password");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(31, "input", 16);
        \u0275\u0275twoWayListener("ngModelChange", function LoginComponent_Template_input_ngModelChange_31_listener($event) {
          \u0275\u0275twoWayBindingSet(ctx.password, $event) || (ctx.password = $event);
          return $event;
        });
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(32, "mat-icon", 15);
        \u0275\u0275text(33, "lock");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(34, "button", 17);
        \u0275\u0275listener("click", function LoginComponent_Template_button_click_34_listener() {
          return ctx.hidePassword = !ctx.hidePassword;
        });
        \u0275\u0275elementStart(35, "mat-icon");
        \u0275\u0275text(36);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(37, "button", 18);
        \u0275\u0275template(38, LoginComponent_mat_spinner_38_Template, 1, 0, "mat-spinner", 19)(39, LoginComponent_span_39_Template, 2, 0, "span", 20);
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(40, "div", 21)(41, "span");
        \u0275\u0275text(42, "Don't have an account?");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(43, "a", 22);
        \u0275\u0275text(44, "Create Account");
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(25);
        \u0275\u0275twoWayProperty("ngModel", ctx.username);
        \u0275\u0275advance(6);
        \u0275\u0275property("type", ctx.hidePassword ? "password" : "text");
        \u0275\u0275twoWayProperty("ngModel", ctx.password);
        \u0275\u0275advance(5);
        \u0275\u0275textInterpolate(ctx.hidePassword ? "visibility_off" : "visibility");
        \u0275\u0275advance();
        \u0275\u0275property("disabled", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.loading);
      }
    }, dependencies: [CommonModule, NgIf, FormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, NgModel, NgForm, RouterLink, MatCardModule, MatFormFieldModule, MatFormField, MatLabel, MatPrefix, MatSuffix, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatSnackBarModule, MatProgressSpinnerModule, MatProgressSpinner], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  display: flex;\n  height: 100vh;\n  background: var(--bg-dark);\n}\n.auth-left[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background:\n    linear-gradient(\n      135deg,\n      #1e1b4b,\n      #312e81,\n      #1e3a5f);\n  position: relative;\n  overflow: hidden;\n}\n.floating-shapes[_ngcontent-%COMP%] {\n  position: absolute;\n  inset: 0;\n}\n.shape[_ngcontent-%COMP%] {\n  position: absolute;\n  border-radius: 50%;\n  opacity: 0.1;\n  animation: _ngcontent-%COMP%_float 6s ease-in-out infinite;\n}\n.shape-1[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 300px;\n  background: var(--primary);\n  top: 10%;\n  left: 10%;\n}\n.shape-2[_ngcontent-%COMP%] {\n  width: 200px;\n  height: 200px;\n  background: var(--secondary);\n  bottom: 20%;\n  right: 10%;\n  animation-delay: -2s;\n}\n.shape-3[_ngcontent-%COMP%] {\n  width: 150px;\n  height: 150px;\n  background: var(--accent);\n  top: 60%;\n  left: 50%;\n  animation-delay: -4s;\n}\n@keyframes _ngcontent-%COMP%_float {\n  0%, 100% {\n    transform: translateY(0) rotate(0deg);\n  }\n  50% {\n    transform: translateY(-20px) rotate(5deg);\n  }\n}\n.illustration-content[_ngcontent-%COMP%] {\n  text-align: center;\n  z-index: 1;\n  position: relative;\n}\n.illustration-icon[_ngcontent-%COMP%] {\n  font-size: 80px;\n  width: 80px;\n  height: 80px;\n  color: white;\n  margin-bottom: 16px;\n}\n.illustration-content[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 36px;\n  font-weight: 800;\n  color: white;\n}\n.illustration-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 16px;\n  margin-top: 8px;\n}\n.auth-right[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.auth-form-wrapper[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n  padding: 40px;\n}\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  font-weight: 700;\n  margin-bottom: 4px;\n}\n.auth-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary);\n  margin-bottom: 32px;\n}\n.auth-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 8px;\n}\n.login-btn[_ngcontent-%COMP%] {\n  height: 48px;\n  font-size: 16px;\n  margin-top: 8px;\n  width: 100%;\n}\n.auth-footer[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-top: 24px;\n  color: var(--text-secondary);\n}\n.auth-footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: var(--primary-light);\n  text-decoration: none;\n  font-weight: 600;\n  margin-left: 4px;\n}\n@media (max-width: 768px) {\n  .auth-left[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=login.component.css.map */"] });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src\\app\\auth\\login\\login.component.ts", lineNumber: 190 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-USGIQRTJ.js.map
