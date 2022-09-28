import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import { useRef, useState, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import SendIcon from "@mui/icons-material/Send";

import { AuthBoxContainer } from "./styles";

import { UserContext } from "../API_services/useUsers";
import { UserType } from "../types/modeltypes";

export default function AuthButtons() {
  const [buttonSelected, setbuttonSelected] = useState("");
  const { getUserInfo, signUpUser, user, logOut } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setemail] = useState("");
  const [type, setType] = useState("");
  const [ErrorFlag, setErrorFlag] = useState(false);
  const authContainer = useRef(null);
  const newUser = {
    firstName,
    lastName,
    email,
    type,
    dateCreated: new Date(),
  };
  const handleSubmit = async () => {
    if (buttonSelected === "register") signUpUser(newUser);
    else {
      const userCreated = await getUserInfo(newUser.email);
      if (!userCreated) setErrorFlag(true);
    }
    setbuttonSelected("");
  };

  const handleRegisterClick = () => {
    setErrorFlag(false);
    if (!buttonSelected.length || buttonSelected === "login") {
      setbuttonSelected("register");
    } else if (buttonSelected.length && buttonSelected === "register") {
      signUpUser(newUser);
    }
  };

  const handleLogInClick = () => {
    setErrorFlag(false);
    if (!buttonSelected.length && user && user.firstName) {
      logOut();
    } else if (!buttonSelected.length || buttonSelected === "register") {
      setbuttonSelected("login");
    } else if (buttonSelected.length && buttonSelected === "login") {
      setbuttonSelected("");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        typeof event.target.className === "string" &&
        event.target.className.includes("notLogIn")
      ) {
        setbuttonSelected("");
        setErrorFlag(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <AuthBoxContainer rer={authContainer}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup variant="text" aria-label="text button group">
          <Button
            className={
              buttonSelected.length && buttonSelected === "register"
                ? "selectedButton"
                : buttonSelected === "login"
                ? "notSelectedButton"
                : ""
            }
            onClick={() => handleRegisterClick()}
            size="large"
            disabled={user && user.firstName ? true : false}
          >
            {user && user.firstName
              ? `Hi ${user.type === UserType.Provider ? "Dr" : "Mr"} ${
                  user.firstName
                }!`
              : "Register"}
          </Button>
          <Button
            className={
              buttonSelected.length && buttonSelected === "login"
                ? "selectedButton"
                : buttonSelected === "register"
                ? "notSelectedButton"
                : ""
            }
            onClick={() => handleLogInClick()}
            size="large"
          >
            {user && user.firstName ? "LogOut" : "LogIn"}
          </Button>
        </ButtonGroup>
      </Box>
      {(buttonSelected || ErrorFlag) && (
        <form
          className="dropdwn"
          style={{
            height: buttonSelected === "login" || ErrorFlag ? "200px" : "400px",
          }}
          onSubmit={() => handleSubmit()}
        >
          {ErrorFlag ? (
            <h1>error logging in</h1>
          ) : (
            <>
              <TextField
                onChange={(e) => setemail(e.target.value)}
                label="email"
                id="filled-hidden-label-small"
                defaultValue=""
                variant="filled"
                size="small"
              />

              {buttonSelected === "register" && (
                <>
                  <TextField
                    onChange={(e) => setFirstName(e.target.value)}
                    label="first name"
                    id="filled-hidden-label-small"
                    defaultValue=""
                    variant="filled"
                    size="small"
                  />
                  <TextField
                    onChange={(e) => setLastName(e.target.value)}
                    label="last name"
                    id="filled-hidden-label-small"
                    defaultValue=""
                    variant="filled"
                    size="small"
                  />
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <FormControlLabel
                      value="provider"
                      control={<Radio />}
                      label="Provider"
                    />
                    <FormControlLabel
                      value="pharmacist"
                      control={<Radio />}
                      label="Pharmacist"
                    />
                  </RadioGroup>
                </>
              )}
              <Button
                onClick={() => handleSubmit()}
                variant="contained"
                endIcon={<SendIcon />}
              />
            </>
          )}
        </form>
      )}
    </AuthBoxContainer>
  );
}
