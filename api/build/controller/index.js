"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("./patients"));
const prescriptions_1 = __importDefault(require("./prescriptions"));
const users_1 = __importDefault(require("./users"));
function setServices(app) {
    return {
        patientServices: new patients_1.default(app),
        prescriptionServices: new prescriptions_1.default(app),
        userServices: new users_1.default(app),
    };
}
exports.default = setServices;
//# sourceMappingURL=index.js.map