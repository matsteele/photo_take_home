import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect } from "react";
import usePrescriptions from "../API_services/usePrescription";

export default function PrescriptionDisplay({ patientSelected }) {
  const { PrescriptionsData, getPrescriptionsByPatient } = usePrescriptions();

  useEffect(() => {
    if (patientSelected && patientSelected.length)
      getPrescriptionsByPatient(patientSelected);
  }, [patientSelected, getPrescriptionsByPatient]);


  return patientSelected && PrescriptionsData && PrescriptionsData.length ? (
    <div className="table scriptsDisplay">
      PRESCRIPTIONS
      <DataGrid
        rows={PrescriptionsData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection={false}
      />
    </div>
  ) : (
    <></>
  );
}

const columns: GridColDef[] = [
  { field: "drugName", headerName: "Drug Name", width: 130 },
  { field: "expirationDate", headerName: "Expiration Date", width: 130 },
  {
    field: "prescriptionStatus",
    headerName: "Status",
    type: "string",
    width: 120,
  },
];
