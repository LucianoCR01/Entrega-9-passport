//@ts-check
import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    productos: {
        type: [
            {
                product: { type: Schema.Types.ObjectId, ref: "productos", required: true },
                quantity: { type: Number, default: 1 },
            },
        ],
        default: [],
    },
});
cartSchema.pre('findOne', function () {
    this.populate('productos.product');
});

cartSchema.pre('find', function () {
    this.populate('productos.product');
});

export const CartsModel = model("carts", cartSchema);