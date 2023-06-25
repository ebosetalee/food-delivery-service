import { Request, Response, NextFunction } from "express";
import { OK } from "http-status";
import logger from "@root/utils/logger";

export default class BaseController {
    /**
     * Handles operation success and sends a HTTP response
     * @param req Express request
     * @param res Express response
     * @param data Success data
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleSuccess = (req: Request, res: Response, data: any, code: number = OK) => {
        if (res.headersSent) return;

        res.status(code).json(data);
    };

    handleError = (req: Request, res: Response, next: NextFunction, err) => {
        if (res.headersSent) return logger.error(err);

        logger.logAPIRequest(req);

        next(err);
    };
}
