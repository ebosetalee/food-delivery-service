import { format, transports, createLogger, config, Logger } from "winston";
const { combine, errors, json, timestamp, splat } = format;
import { Request, Response } from "express";

interface ILogger {
    error(err: Error, message?: string);
    message(message: string);
    logAPIRequest(req: Request);
    logAPIResponse(req: Request, res: Response);
}

class logger implements ILogger {
    private log: Logger;
    constructor() {
        /**
         * Create a logger for debug
         */

        this.log = createLogger({
            level: "debug",
            levels: config.npm.levels,
            format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), splat(), json()),
            transports: [new transports.Console()],
        });
    }
    // private static readonly transport = ["production", "staging"].includes(env.app_env)
    //     ? new transports.Console({ format: combine(cli(), splat(), json()) })
    //     : new transports.Console();

    // private static readonly format = (["production", "staging"].includes(env.app_env)
    //     ? combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), splat(), json())
    //     : combine(cli(), splat()));
    /**
     * Logs an error along with information describing the
     * error.
     * @param err Error object
     * @param info Additional information about the error.
     */
    error(err: Error, info?: string) {
        this.log.error({ err, info });
    }
    /**
     * Logs arbitrary data
     * @param message Arbitrary data to be logged
     */
    message(message: string) {
        this.log.debug(message);
    }

    /**
     * Logs an incoming HTTP request
     * @param req Express request
     */
    logAPIRequest(req: Request) {
        this.log.info({ req });
    }

    /**
     * Logs an outgoing HTTP response
     * @param req Express request
     * @param res Express responser
     */
    logAPIResponse(req: Request, res: Response) {
        this.log.info({
            res,
            headers: req.baseUrl,
        });
    }
}

export default new logger();
