import { useEffect, useContext } from "react";
import usePatients from "../API_services/usePatients";
import PrescriptionsDisplay from "./prescriptionsDisplay";
import PatientsDisplay from "./patientsDisplay";

import { DislayLayout } from "./styles";

import { UserContext } from "../API_services/useUsers";

export default function Display() {
  const { user } = useContext(UserContext);

  const {
    getPatientsByUser,
    deletePatientInfo,
    patients,
    set_patientSelected,
    patientSelected,
    set_patients,
    addPatient
    
  } = usePatients();

  useEffect(() => {
    if(user.email)
    getPatientsByUser(user.email);
    else
    set_patients([])
  }, [user, getPatientsByUser, set_patients]);

  return (
    <DislayLayout className="notLogIn">
      <div className="display-container">
        <PatientsDisplay
          patientSelected={patientSelected}
          set_patientsSelected={set_patientSelected}
          patients={patients}
          deletePatientInfo={deletePatientInfo}
          addPatient={addPatient}
        />
        <PrescriptionsDisplay patientSelected={patientSelected} />
      </div>
    </DislayLayout>
  );
}
