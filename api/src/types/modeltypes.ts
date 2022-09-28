enum PrescriptionStatus {
  Pending = "pending",
  InProgress = "in_progress",
  Failed = "failed",
}

enum UserType {
  Provider = "provider",
  Pharmacist = "pharmacist",
}

interface IPrescription {
  id?:string;
  patient: string;
  drugName: string;
  dateCreated: Date;
  expirationDate: Date;
  prescriptionStatus: PrescriptionStatus;
}

interface IPatient extends IPerson {
  prescriptions: string[];
  pharmacist: string | null
  provider: string | null;
}

// USERS
interface IUser extends IPerson {
  patients?: string[] | [];
  type: UserType;
}

interface IPerson {
  email: string;
  firstName: string;
  lastName: string;
  dateCreated?: Date;
}

interface IDatabase {
  users: Record<string | number, IUser>;
  patients: Record<string | number, IPatient>;
  prescriptions: Record<string | number, IPrescription>;
}

export {
  IUser,
  UserType,
  PrescriptionStatus,
  IPrescription,
  IPatient,
  IDatabase,
};
