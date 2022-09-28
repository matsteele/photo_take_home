import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import { UserType } from "../types/modeltypes";

import { UserContext } from "../API_services/useUsers";
import { useContext, useState } from "react";
// email: string;
// firstName: string;
// lastName: string;
// dateCreated?: Date;

// prescriptions: string[];
// pharmacist: string | null
// provider: string | null;

export default function Addform({ addPatient, exit }) {
  const { user } = useContext(UserContext);

  const [email, set_email] = useState("");
  const [firstName, set_firstName] = useState("");
  const [lastName, set_lastName] = useState("");

  const [pharmacist, set_pharmacist] = useState("");
  const [provider, set_provider] = useState("");

  const [error, set_error] = useState(false);

  const newPatient = {
    email,
    firstName,
    lastName,
    dateCreated: new Date(),
    prescriptions: [],
    pharmacist,
    provider,
  };

  const handleCreatePatient = () => {
    const isAllFilledOut = Object.values(newPatient).filter(
      (val) => typeof val === "string" && val.length > 1
    );

    if (!(isAllFilledOut.length === 4)) {
      set_error(true);
    } else {
      const response = addPatient(newPatient);
      if (!response) set_error(true);
      else exit(false);
    }
  };

  return (
    <form>
      <TextField
        onChange={(e) => set_email(e.target.value)}
        label="email"
        id="filled-hidden-label-small"
        defaultValue=""
        variant="filled"
        size="small"
      />
      <TextField
        onChange={(e) => set_firstName(e.target.value)}
        label="first name"
        id="filled-hidden-label-small"
        defaultValue=""
        variant="filled"
        size="small"
      />
      <TextField
        onChange={(e) => set_lastName(e.target.value)}
        label="last name"
        id="filled-hidden-label-small"
        defaultValue=""
        variant="filled"
        size="small"
      />
      <TextField
        disabled={user.type === UserType.Provider ? true : false}
        onChange={(e) => set_provider(e.target.value)}
        label="provider id"
        id="filled-hidden-label-small"
        defaultValue={user.type === UserType.Provider ? user.email : ""}
        variant="filled"
        size="small"
      />{" "}
      <TextField
        disabled={user.type === UserType.Pharmacist ? true : false}
        onChange={(e) => set_pharmacist(e.target.value)}
        label="pharmacist id"
        id="filled-hidden-label-small"
        defaultValue={user.type === UserType.Pharmacist ? user.email : ""}
        variant="filled"
        size="small"
      />{" "}
      <Button
        onClick={() => handleCreatePatient()}
        variant="contained"
        endIcon={<SendIcon />}
      />
      {error && <div>error adding patient</div>}
    </form>
  );
}
