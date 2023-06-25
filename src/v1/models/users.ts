import mongoose from "mongoose";
import { createID } from "@root/utils";

const userSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            default: createID(),
        },
        name: {
            type: String,
            required: [true, "Please input your name"],
        },
        email: {
            type: String,
            required: [true, "Please input your email"],
            unique: true,
        },
        phone: {
            type: String,
            required: [true, "Please input you phone number"],
        },
        address: {
            type: String,
            required: [true, "Please input your address"],
        },
        password: {
            type: String,
            required: [true, "Please input you preferred password"],
            minlength: 8,
            select: false,
        },
        password_reset_token: { type: String, select: false },
        password_reset_expires: { type: Date, select: false },
    },
    {
        timestamps: true,
    },
);

const User = mongoose.model("User", userSchema);

export default User;
