"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrescriptionId = void 0;
const modeltypes_1 = require("../types/modeltypes");
const __1 = require("..");
const crypto_1 = __importDefault(require("crypto"));
class PrescriptionServices {
    constructor(app) {
        if (app) {
            this.app = app;
            this.setListeners();
        }
    }
    setListeners() {
        // this.app.get("/prescriptions", (req: Request, res: Response) => {
        //   res.json(database["prescriptions"]);
        // });
        this.app.get("/prescriptions/:patientId", (req, res) => {
            const { patientId } = req.params;
            const prescriptions = this.getprescriptionsByPatient(patientId);
            res.json({
                prescriptions,
            });
        });
        this.app.post("/prescriptions", (req, res) => {
            const { prescriptionInfo, userId } = req.body;
            const prescription = this.addPrescription(prescriptionInfo, userId);
            res.json({
                prescription,
            });
        });
        this.app.put("/prescriptions", (req, res) => {
            const { prescriptionInfo, userId } = req.ReqBody;
            const prescription = this.updatePrescription(prescriptionInfo, userId);
            res.json({
                prescription,
            });
        });
        this.app.delete("/prescriptions:id", (req, res) => {
            const { prescriptionId, userId } = req.ReqBody;
            this.deletePrescription(prescriptionId, userId);
            res.status(200).send(`prescription ${prescriptionId} deleted`);
        });
    }
    getprescriptionsByPatient(patientId) {
        // this is not a scalable approach, I likely would use a nested id approach with mongo
        return Object.values(__1.database["prescriptions"]).filter((p) => p.patient === patientId);
    }
    addPrescription(prescriptionData, userId) {
        const id = (0, exports.getPrescriptionId)(prescriptionData.patient, prescriptionData.drugName);
        prescriptionData.id = id;
        __1.database["prescriptions"][id] = prescriptionData;
    }
    updatePrescription(newprescriptionData, userId) {
        __1.database["prescriptions"][newprescriptionData.id] = newprescriptionData;
        return __1.database["prescriptions"][newprescriptionData.id];
    }
    deletePrescription(PrescriptionID, userId) {
        delete __1.database["prescriptions"][PrescriptionID];
    }
}
__decorate([
    checkPermissions()
], PrescriptionServices.prototype, "addPrescription", null);
__decorate([
    checkPermissions()
], PrescriptionServices.prototype, "updatePrescription", null);
__decorate([
    checkPermissions()
], PrescriptionServices.prototype, "deletePrescription", null);
function checkPermissions() {
    return function (target, propertyKey, descriptor) {
        const originalFunc = descriptor.value;
        descriptor.value = function () {
            const userId = arguments[1];
            const user = __1.database["users"][userId];
            if (user.type !== modeltypes_1.UserType.Provider)
                throw Error("USER IS NOT PROVIDER");
            return originalFunc.apply(this, arguments);
        };
    };
}
const getPrescriptionId = (patientId, drugName) => {
    const prescriptionPatientandName = patientId + drugName;
    const prescriptionId = crypto_1.default
        .createHash("sha256")
        // updating data
        .update(prescriptionPatientandName)
        // Encoding to be used
        .digest("hex");
    return prescriptionId;
};
exports.getPrescriptionId = getPrescriptionId;
exports.default = PrescriptionServices;
//# sourceMappingURL=prescriptions.js.map