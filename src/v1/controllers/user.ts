import { NextFunction, Request, Response } from "express";
import { CONFLICT, CREATED, NOT_FOUND } from "http-status";
import logger from "@root/utils/logger";
import { hash } from "@root/utils";
import ErrorResponse from "@root/error";
import User from "@v1/models/users";
import BaseController from "./base";

export class UserController extends BaseController {
    getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.message("Retieving user...");

            const user = await this.getUser(req.user._id, "id");

            if (!user) {
                throw new ErrorResponse("User not available", NOT_FOUND);
            }

            const data = { message: "User details retrieved", data: user };

            this.handleSuccess(req, res, data);
        } catch (error) {
            this.handleError(req, res, next, error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.message("Creating new user...");

            const payload = req.body;

            await User.findOneAndDelete({ email: payload.email });
            const userAvailable = await this.getUser(payload.email, "email");

            if (userAvailable) {
                throw new ErrorResponse("User Available", CONFLICT);
            }

            payload.password = await hash(payload.password.toString());

            const user = await User.create(payload);

            // remove password field from response
            Reflect.deleteProperty(user, "password");

            const data = { message: "User Created Successfully", data: user };

            this.handleSuccess(req, res, data, CREATED);
        } catch (error) {
            this.handleError(req, res, next, error);
        }
    };

    async getUser(param: string, attribute: string) {
        const query = attribute == "id" ? { _id: param } : attribute == "phone" ? { phone: param } : { email: param };
        return await User.findOne(query).select("+password");
    }
}

export default new UserController();
