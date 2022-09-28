import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ExitIcon from "@mui/icons-material/ExitToApp";

import { useState } from "react";
import Addform from "./addform";
import { colors } from "../util/colors";

export default function PatientDisplay({
  patients,
  deletePatientInfo,
  patientSelected,
  set_patientsSelected,
  addPatient,
}) {
  const [addNewPatient, setaddNewPatient] = useState(false);

  return patients && patients.length ? (
    <div className="tableHeader">
      <header>
        <h1>PATIENTS</h1>
        <div className="buttons">
          {patientSelected && (
            <Button
              className="delete"
              onClick={() => deletePatientInfo(patientSelected)}
              variant="contained"
              endIcon={<DeleteIcon />}
            />
          )}
          <Button
            className="add"
            onClick={() => {
              setaddNewPatient((b) => !b);
              set_patientsSelected("");
            }}
            variant="contained"
            style={{ background: addNewPatient ? "grey" : colors.lightGreen }}
            endIcon={addNewPatient ? <ExitIcon /> : <AddIcon />}
          />
        </div>
      </header>
      <div className="table patientsDisplay">
        {addNewPatient ? (
          <Addform addPatient={addPatient} exit={setaddNewPatient} />
        ) : (
          <DataGrid
            rows={patients}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={(row) => row.email}
            onSelectionModelChange={(rows) => set_patientsSelected(rows[0])}
          />
        )}
      </div>
    </div>
  ) : (
    <></>
  );
}

const columns: GridColDef[] = [
  { field: "email", headerName: "email", width: 150 },
  { field: "firstName", headerName: "First name", width: 100 },
  { field: "lastName", headerName: "Last name", width: 100 },
  {
    field: "dateCreated",
    headerName: "Created",
    type: "date",
    width: 90,
  },
  {
    field: "pharmacist",
    headerName: "Pharmacist",
    type: "date",
    width: 90,
  },
];
