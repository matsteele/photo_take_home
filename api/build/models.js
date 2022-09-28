"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patient_schema = exports.User_schema = exports.prescription_schema = void 0;
const prescription_schema = ({ patient, drugName, dateCreated, expirationDate, prescriptionStatus, }) => ({
    patient,
    drugName,
    dateCreated,
    expirationDate,
    prescriptionStatus,
});
exports.prescription_schema = prescription_schema;
const User_schema = ({ email, firstName, lastName, dateCreated, patients, type, }) => ({
    email,
    firstName,
    lastName,
    dateCreated,
    patients,
    type,
});
exports.User_schema = User_schema;
const patient_schema = ({ email, firstName, lastName, prescriptions, dateCreated, pharmacist, provider, }) => ({
    email,
    firstName,
    lastName,
    prescriptions,
    dateCreated,
    pharmacist,
    provider,
});
exports.patient_schema = patient_schema;
//# sourceMappingURL=models.js.map