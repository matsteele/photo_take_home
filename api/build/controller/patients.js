"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
class PatientServices {
    constructor(app) {
        if (app) {
            this.app = app;
            this.setListeners();
        }
    }
    setListeners() {
        this.app.get("/patients", (req, res) => {
            res.json(__1.database["patients"]);
        });
        this.app.get("/patients", (req, res) => {
            const { userId } = req.body;
            const patients = this.getPatientsByUser(userId);
            res.json({
                patients,
            });
        });
        this.app.post("/patients", (req, res) => {
            const { patientInfo } = req.body;
            const patient = this.addPatient(patientInfo);
            res.json({
                patient,
            });
        });
        this.app.put("/patients", (req, res) => {
            const { patientInfo } = req.body;
            const patient = this.updatePatient(patientInfo.email, patientInfo);
            res.json({
                patient,
            });
        });
        this.app.delete("/patients", (req, res) => {
            const { patientId } = req.body;
            this.deletePatient(patientId);
            res.status(200).send(`patient ${patientId} deleted`);
        });
    }
    getPatientsByUser(userID) {
        // this is not a scalable approach, likely would use a nested id approach with mongo
        return Object.values(__1.database["patients"]).filter((p) => p.provider === userID || p.pharmacist === userID);
    }
    addPatient(patientData) {
        __1.database["patients"][patientData.email] = patientData;
    }
    updatePatient(patientEmail, newPatientData) {
        __1.database["patients"][patientEmail] = newPatientData;
    }
    deletePatient(patientEmail) {
        delete __1.database["patients"][patientEmail];
    }
}
exports.default = PatientServices;
//# sourceMappingURL=patients.js.map