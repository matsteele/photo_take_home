import PatientServices from "./patients";
import PrescriptionServices from "./prescriptions";
import UserServices from "./users";
import { Express } from "express";

export default function setServices(app: Express) {
  return {
    patientServices: new PatientServices(app),
    prescriptionServices: new PrescriptionServices(app),
    userServices: new UserServices(app),
  };
}
