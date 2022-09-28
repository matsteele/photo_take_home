import { IUser } from "../types/modeltypes";
import { database } from "..";

import { Request, Response, Express } from "express";
import { buildSeedInputs } from "./seedData";

// using email as user id for now -
// doesn't make sense long term- particularly because users would want to change their email
// would normally check for user token here , maybe set this up as a class with token data

class UserServices {
  app: Express | any;
  setApp: boolean;
  constructor(app: Express) {
    if (app) {
      this.app = app;
      this.setListeners();
    }
  }
  setListeners() {
    this.app.get("/users", (req: Request, res: Response) => {
      res.json(database["users"]);
    });

    this.app.get("/users/:userId", (req: IGetReq, res: Response) => {
      const { userId } = req.params;
      const user = this.getUser(userId);
      res.json({
        user,
      });
    });

    this.app.post("/users", (req: IPostReq, res: Response) => {
      const userInfo = req.body;

      buildSeedInputs(userInfo)
      // addUser(userInfo)
      res.json({
        userInfo,
      });
    });

    this.app.put("/users/:id", (req: IPostReq, res: Response) => {
      const { userInfo } = req.ReqBody;
      const user = this.updateUser(userInfo.email, userInfo);
      res.json({
        user,
      });
    });

    this.app.delete("/users:id", (req: IGetReq, res: Response) => {
      const { userId } = req.ReqBody;
      const user = this.deleteUser(userId);
      res.status(200).send(`user ${userId} deleted`);
    });
  }

  getUser(userId: string): IUser {
    return database["users"][userId];
  }
  addUser(UserData: IUser): IUser {
    database["users"][UserData.email] = UserData;
    return database["users"][UserData.email];
  }
  updateUser(userId: string, NewUserData: IUser): IUser {
    database["users"][userId] = NewUserData;
    return database["users"][userId];
  }
  deleteUser(userId: string) {
    // might make more sense to set deleted tag
    // in order to restore user info later
    delete database["users"][userId];
  }
}
interface IGetReq extends Request {
  ReqBody: { userId: string };
}
interface IPostReq extends Request {
  ReqBody: { userInfo: IUser };
}
export default UserServices;
