import mongoose from "mongoose";
import env from "./env";

mongoose.set("strictQuery", true);
async function connectToDB(URI = env.mongo_uri) {
    return await mongoose.connect(URI);
}

export async function close() {
    return await mongoose.disconnect();
}

export default connectToDB;
