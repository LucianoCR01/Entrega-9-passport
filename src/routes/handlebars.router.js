import express from "express";
import { productos } from "../clases/clases.product.js";

export const handlebarsRouter = express.Router()

handlebarsRouter.get("/", async (req, res) => {
    const arrayProd = await productos.getProducts()
    return res.status(200).render("home", { arrayProd })
})