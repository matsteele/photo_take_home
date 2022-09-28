import { useState } from "react";
import axios from "axios";
import { IPatient } from "../types/modeltypes";
import { tcWrapper } from "./util";
import { GridRowId } from "@mui/x-data-grid";

export default function usePatients() {
  const [patients, set_patients] = useState<IPatient[]>([]);
  const [patientSelected, set_patientSelected] = useState<GridRowId>("");
  const [loading, set_loading] = useState(false);
  const [error, set_error] = useState(false);

  const options = (type: string, data = {}) => ({
    method: type,
    url: `${process.env.REACT_APP_hostURL}/patients`,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    qs: {},
    data,
    json: true,
  });

  const addPatient = async (patientInfo: IPatient) => {
    await axios(options("POST", {patientInfo}));
    set_patients((patients) => [...patients, patientInfo]);
  };

  const getPatientsByUser = async (userId: string) => {
    const PatientInfo = await axios(options("GET", { userId }));
    const patientDataArray: IPatient[] = Object.values(PatientInfo.data);
    set_patients(patientDataArray);
  };

  const updatePatientInfo = async (newPatientData: IPatient) => {
    const PatientInfo = await axios(options("PUT", newPatientData));
    set_patients((pats) => [...pats, PatientInfo.data[0]]);
  };

  const deletePatientInfo = (patientId: string) => {
    axios(options("DELETE", { patientId }))
      .catch(console.error)
      .then(() =>
        set_patients((patients) => patients.filter((p) => p.email !== patientId))
      );
  };

  tcWrapper(
    [addPatient, getPatientsByUser, updatePatientInfo, deletePatientInfo],
    set_loading,
    set_error
  );

  return {
    patients,
    loading,
    error,
    addPatient,
    getPatientsByUser,
    updatePatientInfo,
    deletePatientInfo,
    patientSelected,
    set_patients,
    set_patientSelected,
  };
}
