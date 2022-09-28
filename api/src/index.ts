import express from "express";
import { IDatabase } from "./types/modeltypes";
const cors = require("cors");
import { buildSeedInputs } from "./controller/seedData";
import setServices from "./controller";

const app = express();
app.use(express.json());
const port = 3001;

app.use(
  cors({
    origin: "*",
  })
);

export const services = setServices(app);

if (!process.env.JEST_WORKER_ID)
  app.listen(port, () => {
    // buildSeedInputs(services);

    console.log(`Photon API listening on port ${port}`);
  });

export const database: IDatabase = {
  users: {},
  patients: {},
  prescriptions: {},
};
