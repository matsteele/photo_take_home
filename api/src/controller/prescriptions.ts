import { IUser, UserType, IPrescription, IPatient } from "../types/modeltypes";
import { database } from "..";
import crypto from "crypto";
import { Request, Response, Express } from "express";

class PrescriptionServices {
  app: Express;
  setApp: boolean;
  constructor(app: Express) {
    if (app) {
      this.app = app;
      this.setListeners();
    }
  }
  setListeners() {
    // this.app.get("/prescriptions", (req: Request, res: Response) => {
    //   res.json(database["prescriptions"]);
    // });

    this.app.get("/prescriptions/:patientId", (req: IGetReq, res: Response) => {
      const { patientId } = req.params;
      const prescriptions = this.getprescriptionsByPatient(patientId);
      res.json({
        prescriptions,
      });
    });

    this.app.post("/prescriptions", (req: IPostUpdateReq, res: Response) => {
      const { prescriptionInfo, userId } = req.body;
      const prescription = this.addPrescription(prescriptionInfo, userId);
      res.json({
        prescription,
      });
    });

    this.app.put("/prescriptions", (req: IPostUpdateReq, res: Response) => {
      const { prescriptionInfo, userId } = req.ReqBody;
      const prescription = this.updatePrescription(prescriptionInfo, userId);
      res.json({
        prescription,
      });
    });

    this.app.delete("/prescriptions:id", (req: IDelReq, res: Response) => {
      const { prescriptionId, userId } = req.ReqBody;
      this.deletePrescription(prescriptionId, userId);
      res.status(200).send(`prescription ${prescriptionId} deleted`);
    });
  }

  getprescriptionsByPatient(patientId: string) {
    // this is not a scalable approach, I likely would use a nested id approach with mongo
    return Object.values(database["prescriptions"]).filter(
      (p: IPrescription) => p.patient === patientId
    );
  }
  @checkPermissions()
  addPrescription(prescriptionData: IPrescription, userId: string) {
    const id = getPrescriptionId(
      prescriptionData.patient,
      prescriptionData.drugName
    );
    prescriptionData.id = id;
    database["prescriptions"][id] = prescriptionData;
  }

  @checkPermissions()
  updatePrescription(newprescriptionData: IPrescription, userId: string) {
    database["prescriptions"][newprescriptionData.id] = newprescriptionData;
    return database["prescriptions"][newprescriptionData.id];
  }

  @checkPermissions()
  deletePrescription(PrescriptionID: string, userId: string) {
    delete database["prescriptions"][PrescriptionID];
  }
}

function checkPermissions() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalFunc = descriptor.value;
    descriptor.value = function () {
      const userId = arguments[1];
      const user = database["users"][userId];
      if (user.type !== UserType.Provider) throw Error("USER IS NOT PROVIDER");
      return originalFunc.apply(this, arguments);
    };
  };
}

export const getPrescriptionId = (patientId: string, drugName: string) => {
  const prescriptionPatientandName = patientId + drugName;
  const prescriptionId = crypto
    .createHash("sha256")
    // updating data
    .update(prescriptionPatientandName)
    // Encoding to be used
    .digest("hex");
  return prescriptionId;
};

interface IGetReq extends Request {
  ReqBody: { patientId: string };
}
interface IDelReq extends Request {
  ReqBody: { prescriptionId: string; userId: string };
}
interface IPostUpdateReq extends Request {
  ReqBody: { prescriptionInfo: IPrescription; userId: string };
}

export default PrescriptionServices;
