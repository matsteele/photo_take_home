import { buildSeedInputs } from "../seedData";
import  { getPrescriptionId } from "../prescriptions";
import { database, services } from "../..";


// partient object should be updated with prescription
// doctor object should be updated if present
// pharmacist object should be updated if present.

// populate database with seed data
// check specific examples.

let testDataBase = database;

const { patientServices, prescriptionServices, userServices } = services;


const newUser = {
  firstName: "test",
  lastName: "testsss",
  email: "etstadd",
  type: "provider",
  dateCreated: new Date(),
};

const { users, patients, prescriptions } = buildSeedInputs(newUser);

afterAll(() => {
  testDataBase = {};
});

describe("data seeds properly", () => {
  test("database has prescriptions", () => {
    expect(Object.keys(testDataBase.prescriptions).length).toBeGreaterThan(0);
  });
  test("database has patients", () => {
    expect(Object.keys(testDataBase.patients).length).toBeGreaterThan(0);
  });
  test("database has users", () => {
    expect(testDataBase.users[users[0].email]).toBeDefined();
    expect(Object.keys(testDataBase.users).length).toBeGreaterThan(0);
  });
});

describe("users data", () => {
  test("id built based on email", () => {
    const newUser = users[0];
    userServices.addUser(newUser);
    expect(testDataBase["users"][newUser.email].email).toBe(newUser.email);
  });
});

describe("patients data", () => {
  let newPatient;
  let userID;
  beforeAll(() => {
    newPatient = patients[0];
    userID = users[0].email;
    patientServices.addPatient(newPatient);
  });

  test("you can find a patient based on it's email", () => {
    expect(testDataBase["patients"][newPatient.email]).toBeDefined();
  });

  test("you can pull all patients based on a user", () => {
    const patientsByUser = patientServices.getPatientsByUser(userID);
    expect(patientsByUser.length).toBeGreaterThan(0);
  });


});

describe("prescription data", () => {
  let newPrescription = prescriptions[0];

  test("find presciption by id based on hash of patient id and prescription name", () => {
    const prescriptionId = getPrescriptionId(
      newPrescription.patient,
      newPrescription.drugName
    );
    expect(testDataBase.prescriptions[prescriptionId]).toBeDefined();
  });

  test("only doctors can add prescriptions", () => {
    const newUserPharmacy = users.filter((u) => u.type === "pharmacist")[0];

    expect(() =>
      prescriptionServices.addPrescription(
        prescriptions[0],
        newUserPharmacy.email
      )
    ).toThrow("USER IS NOT PROVIDER");
  });

  test("you can pull all presciptions based on a patient", () => {
    const patient = patients[0];
    const prescriptions = prescriptionServices.getprescriptionsByPatient(
      patient.email
    );
    expect(prescriptions.length).toBeGreaterThan(0);
  });

  test("update prescriptions", () => {
    const newUserProvider = users.filter((u) => u.type === "provider")[0];
    const now = new Date();
    prescriptions[0].expirationDate = now;
    const NewScript = prescriptionServices.updatePrescription(
      prescriptions[0],
      newUserProvider.email
    );
    expect(testDataBase["prescriptions"][NewScript.id].expirationDate).toBe(
      now
    );
  });

  test("only doctors can delete or update prescriptions", () => {
    const newUserPharmacy = users.filter((u) => u.type === "pharmacist")[0];

    expect(() =>
      prescriptionServices.deletePrescription(
        prescriptions[0],
        newUserPharmacy.email
      )
    ).toThrow("USER IS NOT PROVIDER");

    expect(() =>
      prescriptionServices.updatePrescription(
        prescriptions[2],
        newUserPharmacy.email
      )
    ).toThrow("USER IS NOT PROVIDER");
  });
});
