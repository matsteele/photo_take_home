import { useState } from "react";
import axios from "axios";
import { IPrescription } from "../types/modeltypes";
import { tcWrapper } from "./util";
import {  GridRowId } from "@mui/x-data-grid";



export default function usePrescriptionsData() {
  const [PrescriptionsData, set_prescriptionData] = useState<GridRowId[]>([]);
  const [loading, set_loading] = useState(false);
  const [error, set_error] = useState(false);

  const options = (type: string, data = {}) => ({
    method: type,
    url: `${process.env.REACT_APP_hostURL}/prescriptions`,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    qs: {},
    data: {
      data
    },
    // json: true,
  });

  const addPrescription = async (newPrescriptionData: IPrescription) => {
    const _options = options("POST", newPrescriptionData)
    await axios(_options);
  };

  const getPrescriptionsByPatient = async (patientId: GridRowId,) => {
    const PrescriptionInfo = await axios.get(`${process.env.REACT_APP_hostURL}/prescriptions/${patientId}`,);
    set_prescriptionData(PrescriptionInfo.data.prescriptions);
  };

  const updatePrescriptionInfo = async (newPrescriptionData: IPrescription) => {
    const PrescriptionInfo = await axios(options("PUT", newPrescriptionData));
    set_prescriptionData(PrescriptionInfo.data);
  };

  const deletePrescriptionInfo = async (PrescriptionId: string) => {
    const PrescriptionInfo = await axios(options("DELETE", { PrescriptionId }));
    set_prescriptionData(PrescriptionInfo.data);
  };

  tcWrapper(
    [addPrescription, getPrescriptionsByPatient, updatePrescriptionInfo, deletePrescriptionInfo],
    set_loading,
    set_error
  );

  return {
    PrescriptionsData,
    loading,
    error,
    addPrescription,
    getPrescriptionsByPatient,
    updatePrescriptionInfo,
    deletePrescriptionInfo,
  };
}
