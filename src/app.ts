import "module-alias/register";
import "dotenv/config";
import compression from "compression";
import express from "express";
import logger from "./utils/logger";
import errorHandler from "./middleware/error-handler";
import bodyParser from "./middleware/body-parser";
import v1Routes from "./v1";

const app = express();

app.use(compression());
app.use(bodyParser);
app.use(express.static("public"));

app.use("/api/v1", v1Routes);

app.get("/", (req, res) =>
    res.status(200).json({ status: "success", message: "FDS service up and running", data: null }),
);

app.use(errorHandler);

process.on("uncaughtException", err => {
    logger.error(err, "UNCAUGHT EXCEPTION! 💥 Shutting down...");
    process.exit(1);
});

export default app;
