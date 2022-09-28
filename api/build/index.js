"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = exports.services = void 0;
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const controller_1 = __importDefault(require("./controller"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3001;
app.use(cors({
    origin: "*",
}));
exports.services = (0, controller_1.default)(app);
if (!process.env.JEST_WORKER_ID)
    app.listen(port, () => {
        // buildSeedInputs(services);
        console.log(`Photon API listening on port ${port}`);
    });
exports.database = {
    users: {},
    patients: {},
    prescriptions: {},
};
//# sourceMappingURL=index.js.map