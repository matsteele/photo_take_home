export enum PrescriptionStatus {
  Pending = "pending",
  InProgress = "in_progress",
  Failed = "failed",
}

export enum UserType {
  Provider = "provider",
  Pharmacist = "pharmacist",
}

export interface IPrescription {
  id?:string;
  patient: string;
  drugName: string;
  dateCreated: Date;
  expirationDate: Date;
  prescriptionStatus: PrescriptionStatus;
}

export interface IPatient extends IPerson {
  prescriptions: string[];
  pharmacist: string | null
  provider: string | null;
}

// USERS
export interface IUser extends IPerson {
  patients?: string[] | [];
  type: UserType;
}

export interface IPerson {
  email: string;
  firstName: string;
  lastName: string;
  dateCreated: Date;
}

export interface IDatabase {
  users: Record<string | number, IUser>;
  patients: Record<string | number, IPatient>;
  prescriptions: Record<string | number, IPrescription>;
}