"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseModule = void 0;
const common_1 = require("@nestjs/common");
const firebase_app_provider_1 = require("./utils/firebase.app.provider");
const firebase_app_storage_provider_1 = require("./utils/firebase.app.storage.provider");
const firebase_app_storage_ref_provider_1 = require("./utils/firebase.app.storage.ref.provider");
const firebase_service_1 = require("./firebase.service");
let FirebaseModule = class FirebaseModule {
};
FirebaseModule = __decorate([
    (0, common_1.Module)({
        providers: [firebase_app_provider_1.appFirebaseProvider, firebase_app_storage_provider_1.appStorageProvider, firebase_app_storage_ref_provider_1.appStorageRefProvider, firebase_service_1.FirebaseService],
        exports: [firebase_app_provider_1.appFirebaseProvider, firebase_app_storage_provider_1.appStorageProvider, firebase_app_storage_ref_provider_1.appStorageRefProvider, firebase_service_1.FirebaseService],
    })
], FirebaseModule);
exports.FirebaseModule = FirebaseModule;
//# sourceMappingURL=firebase.module.js.map