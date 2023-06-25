import dotenv from "dotenv";

dotenv.config();

/**
 * Environment variables required for all environments (development, test, staging, production)
 */
const requiredVariables = ["port", "amqp_url"];

/**
 * Environment variables required for both staging and production
 */
const productionAndStagingVariables = ["mongo_uri"];

/**
 * Requires MongoDB and Redis credentials in production and staging, else uses MongoDB connection string directly
 * in dev or any other environment
 */
if (["production", "staging"].includes(process.env.NODE_ENV)) requiredVariables.push(...productionAndStagingVariables);
else requiredVariables.push("mongo_uri");

const env = {
    /**
     * DON'T SET THIS MANUALLY
     */
    node_env: process.env.NODE_ENV || "development",

    /**
     * Possible values are "development", "test", "production", "staging"
     */
    app_env: process.env.NODE_ENV || "development",

    port: Number(process.env.PORT),

    amqp_url: process.env.AMQP_URL,
    mongo_uri: process.env.MONGO_URI,
};

const missingVariables = requiredVariables.reduce(
    (acc, varName) => (!env[varName] ? acc.concat(varName.toUpperCase()) : acc),
    [],
);

/* eslint-disable no-extra-boolean-cast */
if (!!missingVariables.length) throw new Error(`The following required variables are missing: ${missingVariables}`);

export default env;
