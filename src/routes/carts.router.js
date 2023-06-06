import express from "express";
import { cartsService } from "../services/carts.service.js"


export const cartsRouter = express.Router()

cartsRouter.post("/", async (req, res) => {
    try {
        return res.status(200).json({
            status: "success",
            msg: "Carrito Agregado",
            data: await cartsService.createCart()
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
})

cartsRouter.get("/:cid", async (req, res) => {
    try {
        const idCart = req.params.cid
        return res.status(200).json({
            status: "success",
            msg: "Carrito Buscado",
            data: await cartsService.findCart(idCart)
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
})

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const idCart = req.params.cid
    const idProduct = req.params.pid
    try {
        return res.status(200).json({
            status: "success",
            msg: "Producto Agregado",
            data: await cartsService.agregatedProduct(idCart, idProduct)
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
})
