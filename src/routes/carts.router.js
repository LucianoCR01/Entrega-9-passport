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

cartsRouter.post("/:cid/products/:pid", async (req, res) => {
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

cartsRouter.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;
    try {
        return res.status(200).json({
            status: "success",
            msg: "Producto Eliminado",
            data: await cartsService.deleteProduct(cid, pid)
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        })
    }
})

cartsRouter.put("/:cid", async (req, res) => {
    const { cid } = req.params
    const productos = req.body
    try {
        return res.status(200).json({
            status: "success",
            msg: "Carrito Actualizado",
            data: await cartsService.updateCarrito(cid, productos)
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        })
    }
})

cartsRouter.put("/:cid/products/:pid", async (req, res) => {
    const dataCantidad = req.body.data
    const { cid } = req.params
    const { pid } = req.params
    try {
        return res.status(200).json({
            status: "success",
            msg: "Cantidad Actualizada",
            data: await cartsService.actualizarCantidad(cid, pid, dataCantidad)
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        })
    }
})

cartsRouter.delete("/:cid", async (req, res) => {
    const { cid } = req.params
    try {
        return res.status(200).json({
            status: "success",
            msg: "Productos Borrados",
            data: await cartsService.eliminarProdCarrito(cid)
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        })
    }
})