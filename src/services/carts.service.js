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

    ////////////error, no actualiza el carrito//////////
    async agregatedProduct(idCart, idProduct) {
        const cartProd = {
            product: idProduct,
            quantity: 1
        }
        const transIdProduct = `ObjectId("${idCart}")`
        const pushCartProd = await CartsModel.updateOne({ transIdProduct },
            { "$push": { "productos": cartProd } })
        return pushCartProd
        // const buscar = await this.findCart(idCart)
        // const productos = buscar.productos
        // const resultado = productos.find(fruta => fruta.product == transIdProduct);
        // if (!resultado) {
        //     productos.push(cartProd)
        //     const productUptaded = await ProductsModel.updateOne(
        //         { _id: idCart },
        //         { productos }
        //     );
        //     return productUptaded
        // }
    }

    async deleteProduct(cid, pid) {
        const objectId = new Mongoose.Types.ObjectId(pid);
        const cart = await CartsModel.findOneAndUpdate(
            { _id: cid },
            { $pull: { productos: { product: objectId } } },
            { new: true }
        );
        if (!cart) {
            return res.status(404).json({ error: 'Carrito no encontrado' });
        }
        return res.json(cart);
    }

}

export const cartsService = new CartsService()