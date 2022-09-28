// this would normally be a folder with mongoose scemas if using MongoDB
import {
  IUser,
  IPrescription,
  IPatient,
} from "./types/modeltypes";

export const prescription_schema = ({
  patient,
  drugName,
  dateCreated,
  expirationDate,
  prescriptionStatus,
}: IPrescription) => ({
  patient,
  drugName,
  dateCreated,
  expirationDate,
  prescriptionStatus,
});

export const User_schema = ({
  email,
  firstName,
  lastName,
  dateCreated,
  patients,
  type,
}: IUser) => ({
  email,
  firstName,
  lastName,
  dateCreated,
  patients,
  type,
});

export const patient_schema = ({
  email,
  firstName,
  lastName,
  prescriptions,
  dateCreated,
  pharmacist,
  provider,
}: IPatient) => ({
  email,
  firstName,
  lastName,
  prescriptions,
  dateCreated,
  pharmacist,
  provider,
});
