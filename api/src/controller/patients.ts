import {
  IUser,
  UserType,
  PrescriptionStatus,
  IPrescription,
  IPatient,
} from "../types/modeltypes";
import { Request, Response, Express } from "express";
import { database } from "..";

class PatientServices {
  app: Express | any;
  setApp: boolean;
  constructor(app: Express) {
    if (app) {
      this.app = app;
      this.setListeners();
    }
  }
  setListeners() {
    this.app.get("/patients", (req: Request, res: Response) => {
      res.json(database["patients"]);
    });

    this.app.get("/patients", (req: IGetReq, res: Response) => {
      const { userId } = req.body;
      const patients = this.getPatientsByUser(userId);
      res.json({
        patients,
      });
    });

    this.app.post("/patients", (req: IPostReq, res: Response) => {
      const { patientInfo } = req.body;
      const patient = this.addPatient(patientInfo);
      res.json({
        patient,
      });
    });

    this.app.put("/patients", (req: IPostReq, res: Response) => {
      const { patientInfo } = req.body;
      const patient = this.updatePatient(patientInfo.email, patientInfo);
      res.json({
        patient,
      });
    });

    this.app.delete("/patients", (req: IDelReq, res: Response) => {
      const { patientId } = req.body;
      this.deletePatient(patientId);
      res.status(200).send(`patient ${patientId} deleted`);
    });
  }

  getPatientsByUser(userID: string) {
    // this is not a scalable approach, likely would use a nested id approach with mongo
    return Object.values(database["patients"]).filter(
      (p: IPatient) => p.provider === userID || p.pharmacist === userID
    );
  }
  addPatient(patientData: IPatient) {
    database["patients"][patientData.email] = patientData;
  }
  updatePatient(patientEmail: string, newPatientData: IPatient) {
    database["patients"][patientEmail] = newPatientData;
  }
  deletePatient(patientEmail: string) {
    delete database["patients"][patientEmail];
  }
}

interface IGetReq extends Request {
  body: { userId: string };
}
interface IDelReq extends Request {
  body: { patientId: string; userId: string };
}
interface IPostReq extends Request {
  body: { patientInfo: IPatient };
}

export default PatientServices;
