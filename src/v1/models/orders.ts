import mongoose, { Schema } from "mongoose";
import { createID } from "@root/utils";

const orderQuantitySchema = new mongoose.Schema({
    menuId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Menu",
    },
    quantity: {
        type: Number,
        default: 1,
    },
});
const ordersSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            default: createID(),
        },
        items: {
            type: [orderQuantitySchema],
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        total: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["processing", "ready", "on the way", "delivered"],
        },
    },
    {
        timestamps: true,
    },
);

const Orders = mongoose.model("Orders", ordersSchema);

export default Orders;
