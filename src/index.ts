import app from "./app";
import logger from "./utils/logger";
import connectToDB from "./config/database";
import env from "./config/env";
const { port } = env;

process.on("unhandledRejection", (err: Error) => {
    logger.message("UNHANDLED REJECTION! 💥 Shutting down...");
    logger.error(err);
    process.exit(1);
});

connectToDB()
    .then(() => {
        app.listen(port, () => {
            logger.message(`server is runnng on port: ${port}`);
        });
    })
    .catch(() => {
        logger.error({ name: "database", message: "Database connection failed" });
    });
