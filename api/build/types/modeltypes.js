"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionStatus = exports.UserType = void 0;
var PrescriptionStatus;
(function (PrescriptionStatus) {
    PrescriptionStatus["Pending"] = "pending";
    PrescriptionStatus["InProgress"] = "in_progress";
    PrescriptionStatus["Failed"] = "failed";
})(PrescriptionStatus || (PrescriptionStatus = {}));
exports.PrescriptionStatus = PrescriptionStatus;
var UserType;
(function (UserType) {
    UserType["Provider"] = "provider";
    UserType["Pharmacist"] = "pharmacist";
})(UserType || (UserType = {}));
exports.UserType = UserType;
//# sourceMappingURL=modeltypes.js.map