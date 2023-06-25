import { NextFunction, Request, Response } from "express";
import { CREATED, NOT_FOUND } from "http-status";
import logger from "@root/utils/logger";
import { hash } from "@root/utils";
import ErrorResponse from "@root/error";
import Orders from "@v1/models/orders";
import BaseController from "./base";

export class OrdersController extends BaseController {
    getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.message("Retieving order...");

            const order = await Orders.findById(req.params.id);

            if (!order) {
                throw new ErrorResponse("Order not available", NOT_FOUND);
            }

            const data = { message: "User details retrieved", data: order };

            this.handleSuccess(req, res, data);
        } catch (error) {
            this.handleError(req, res, next, error);
        }
    };

    getMany = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.message("Retieving multiple orders...");

            const orders = await this.getOrder(req.user._id, "user");

            const data = { message: "Orders retrieved successfully", data: orders };

            this.handleSuccess(req, res, data);
        } catch (error) {
            this.handleError(req, res, next, error);
        }
    };

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            logger.message("Creating new order...");

            const payload = req.body;

            if (!req.user.address || !payload.address)
                throw new ErrorResponse("Kindly provide address for delivery", NOT_FOUND);

            payload.password = await hash(payload.password.toString());
            payload.userId = req.user._id;
            payload.address = !payload.address ? req.user.address : payload.address;

            const order = await Orders.create(payload);

            const data = { message: "Order Created Successfully", data: order };

            this.handleSuccess(req, res, data, CREATED);
        } catch (error) {
            this.handleError(req, res, next, error);
        }
    };

    async getOrder(param: string, attribute: string, status = false) {
        const query =
            attribute == "id"
                ? { _id: { $in: param } }
                : status
                ? { userId: param, status: attribute }
                : { userId: param };
        return await Orders.find(query);
    }
}

export default new OrdersController();
