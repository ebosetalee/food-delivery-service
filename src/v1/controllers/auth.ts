import { NextFunction, Request, Response } from "express";
import { UNAUTHORIZED } from "http-status";
import logger from "@root/utils/logger";
import { verifyHash } from "@root/utils";
import ErrorResponse from "@root/error";
import { UserController } from "./user";
import { generateJwtToken } from "@root/utils/jwt";

class UserAuthController extends UserController {
    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.message("user loging in..");

            const payload = req.body;

            const user = await this.getUser(payload.email, "email");

            // Wrong email or password
            if (!user || !(await verifyHash(payload.password, user.password))) {
                throw new ErrorResponse("Incorrect Email or Password", UNAUTHORIZED);
            }

            payload._id = user._id;
            payload.name = user.name;
            payload.phone = user.phone;
            payload.address = user.address;

            const token = await generateJwtToken(payload);

            const userObj = user.toJSON();
            // remove password field from response
            Reflect.deleteProperty(userObj, "password");

            // send mail notification

            const data = { message: "User signed in successfully", data: { ...userObj, token } };

            this.handleSuccess(req, res, data);
        } catch (error) {
            this.handleError(req, res, next, error);
        }
    };
}

export default new UserAuthController();
