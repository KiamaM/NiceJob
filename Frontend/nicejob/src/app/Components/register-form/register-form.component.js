"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterFormComponent = void 0;
const common_1 = require("@angular/common");
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const router_1 = require("@angular/router");
const login_component_1 = require("../login/login.component");
let RegisterFormComponent = (() => {
    let _classDecorators = [(0, core_1.Component)({
            selector: 'app-register-form',
            standalone: true,
            imports: [forms_1.ReactiveFormsModule, common_1.CommonModule, router_1.RouterLink, router_1.RouterLinkActive, login_component_1.LoginComponent],
            templateUrl: './register-form.component.html',
            styleUrl: './register-form.component.css'
        })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _instanceExtraInitializers = [];
    let _dialog_decorators;
    let _dialog_initializers = [];
    var RegisterFormComponent = _classThis = class {
        constructor(fb, modalService) {
            this.fb = (__runInitializers(this, _instanceExtraInitializers), fb);
            this.modalService = modalService;
            this.dialog = __runInitializers(this, _dialog_initializers, void 0);
            this.registerForm = this.fb.group({
                firstName: [],
                lastName: [],
                email: [],
                phoneNumber: [],
                password: [],
            });
        }
        openLoginModal() {
            this.modalService.openModal.call;
        }
        registerClient() {
        }
    };
    __setFunctionName(_classThis, "RegisterFormComponent");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _dialog_decorators = [(0, core_1.ViewChild)('dialog')];
        __esDecorate(null, null, _dialog_decorators, { kind: "field", name: "dialog", static: false, private: false, access: { has: obj => "dialog" in obj, get: obj => obj.dialog, set: (obj, value) => { obj.dialog = value; } }, metadata: _metadata }, _dialog_initializers, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        RegisterFormComponent = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return RegisterFormComponent = _classThis;
})();
exports.RegisterFormComponent = RegisterFormComponent;