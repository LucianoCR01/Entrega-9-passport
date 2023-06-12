import express from "express";
import { uploader } from "../utils.js";
import { productsService } from "../services/products.service.js"

export const productsRouter = express.Router()

productsRouter.get("/", async (req, res) => {
    try {
        const page = req.query.page ?? 1
        const limit = req.query.limit ?? 10
        const filtro = req.query.filtro
        const sort = req.query.sort ?? 1

        const products = await productsService.getProducts(limit, page, sort, filtro)
        res.status(200).render("products", { products });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
})

productsRouter.get("/:pid", async (req, res) => {
    const idParam = req.params.pid
    try {
        const findProducts = await productsService.findProducts(idParam)
        return res.status(200).json({
            status: "success",
            msg: "listado de usuarios",
            data: findProducts,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
})

productsRouter.post("/", uploader.single("file"), async (req, res) => {
    try {
        const { title, description, code, price, status, stock, category, picture } = req.body;
        const productCreated = await productsService.createProduct(title, description, code, price, status, stock, category, picture);
        return res.status(201).json({
            status: "success",
            msg: "product created",
            data: productCreated,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }

})

productsRouter.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, code, price, status, stock, category, picture } = req.body;
    try {
        const productUptaded = await productsService.updateProduct(id, title, description, code, price, status, stock, category, picture)
        return res.status(201).json({
            status: "success",
            msg: "user uptaded",
            data: productUptaded,
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }

})

productsRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await productsService.deleteProduct(id);
        return res.status(200).json({
            status: "success",
            msg: "product deleted",
            data: {},
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
})

