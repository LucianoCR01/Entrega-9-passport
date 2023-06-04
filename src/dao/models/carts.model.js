//@ts-check
import { Schema, model } from "mongoose";

const schema = new Schema({
    _id: { type: String },
    productos: { type: Object, required: true }
});

export const CartsModel = model("carts", schema);