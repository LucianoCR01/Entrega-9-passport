//@ts-check
import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    productos: {
        type: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'products',
                },
            },
        ],
        default: [],
    }
});
cartSchema.pre('findOne', function () {
    this.populate('productos.product');
});

cartSchema.pre('find', function () {
    this.populate('productos.product');
});

export const CartsModel = model("carts", cartSchema);