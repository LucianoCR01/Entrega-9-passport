import { ProductsModel } from "../dao/models/products.model.js";
import { CartsModel } from "../dao/models/carts.model.js";
import Mongoose from "mongoose";


class CartsService {
    async getProducts() {
        const products = await ProductsModel.find({});
        return products
    }

    async createCart() {
        const productos = []
        const cartCreated = await CartsModel.create({ productos })
        return cartCreated
    }

    async findCart(idParam) {
        const findCart = await CartsModel.findOne({ _id: idParam }).populate('productos.product')
        return findCart
    }

    ////////////NO FUNCIONA - A un carrito le agrega un producto o le suma 1 a quatity //////////
    async agregatedProduct(idCart, idProduct) {
        let arrIni = { product: idProduct, quantity: 1 }
        let doc = await CartsModel.updateOne({ _id: idCart }, { $push: { productos: [arrIni] } })
        return doc
    }

    ////////////////////Borra un producto especifico de un carrito especifico - No funciona//////////

    async deleteProduct(cid, pid) {
        const doc = await CartsModel.findOne({ _id: cid })
        console.log(doc)

    }


    /////////A un carrito especifico se le inserta un array de productos nuevos-funciona pero a los objetos los mete dentro de un array///////
    async updateCarrito(cid, data) {
        let doc = await CartsModel.findOne({ _id: cid })
        doc.productos = data
        await doc.save()
    }

    ///////////////No funciona - el objeto que se envia por body debe ser ej.{"data":10}/////////////////////////
    async actualizarCantidad(cid, pid, dataCantidad) {
        console.log(dataCantidad)
        let arrDef = { product: pid, quantity: dataCantidad }
        let doc = await CartsModel.updateOne({ _id: cid }, { $set: { productos: [arrDef] } })
        return doc
    }

    //////////funciona - a un carrito en especifico le inserta un array vacio/////////
    async eliminarProdCarrito(cid) {
        let doc = await CartsModel.findOne({ _id: cid })
        doc.productos = []
        await doc.save()
    }

}

export const cartsService = new CartsService()