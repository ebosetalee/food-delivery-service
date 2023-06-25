import mongoose, { Schema } from "mongoose";

const menuSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        content: {
            type: String,
            required: true,
        },
        restaurantId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Restaurant",
        },
        amount: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;
