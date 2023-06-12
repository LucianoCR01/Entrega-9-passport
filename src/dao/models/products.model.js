//@ts-check
import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: { type: String, required: true, max: 100 },
    description: { type: String, required: true, max: 100 },
    code: { type: Number, required: true, unique: true },
    price: { type: Number, required: true },
    status: { type: Boolean, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, max: 100 },
    picture: { type: String, required: true, max: 100 }
});

productSchema.plugin(mongoosePaginate)
export const ProductsModel = model("productos", productSchema);