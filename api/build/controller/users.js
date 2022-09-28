"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const seedData_1 = require("./seedData");
// using email as user id for now -
// doesn't make sense long term- particularly because users would want to change their email
// would normally check for user token here , maybe set this up as a class with token data
class UserServices {
    constructor(app) {
        if (app) {
            this.app = app;
            this.setListeners();
        }
    }
    setListeners() {
        this.app.get("/users", (req, res) => {
            res.json(__1.database["users"]);
        });
        this.app.get("/users/:userId", (req, res) => {
            const { userId } = req.params;
            const user = this.getUser(userId);
            res.json({
                user,
            });
        });
        this.app.post("/users", (req, res) => {
            const userInfo = req.body;
            (0, seedData_1.buildSeedInputs)(userInfo);
            // addUser(userInfo)
            res.json({
                userInfo,
            });
        });
        this.app.put("/users/:id", (req, res) => {
            const { userInfo } = req.ReqBody;
            const user = this.updateUser(userInfo.email, userInfo);
            res.json({
                user,
            });
        });
        this.app.delete("/users:id", (req, res) => {
            const { userId } = req.ReqBody;
            const user = this.deleteUser(userId);
            res.status(200).send(`user ${userId} deleted`);
        });
    }
    getUser(userId) {
        return __1.database["users"][userId];
    }
    addUser(UserData) {
        __1.database["users"][UserData.email] = UserData;
        return __1.database["users"][UserData.email];
    }
    updateUser(userId, NewUserData) {
        __1.database["users"][userId] = NewUserData;
        return __1.database["users"][userId];
    }
    deleteUser(userId) {
        // might make more sense to set deleted tag
        // in order to restore user info later
        delete __1.database["users"][userId];
    }
}
exports.default = UserServices;
//# sourceMappingURL=users.js.map