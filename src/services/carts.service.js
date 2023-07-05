import { ProductsModel } from "../dao/models/products.model.js";
import { CartsModel } from "../dao/models/carts.model.js";
import { ObjectId } from "mongodb";


class CartsService {
    async getProducts(cid) {
        const doc = await CartsModel.findById(cid).populate('products.product');
        if (!doc) {
            throw new Error('Cart not found');
        }
        return doc;
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

    async agregatedProduct(idCart, idProduct) {
        try {
            const doc = await CartsModel.findById(idCart)
            const product = await ProductsModel.findById(idProduct)
            if (!doc) {
                throw new Error('Carrito no encontrado');
            }
            if (!product) {
                throw new Error('Producto no encontrado');
            }
            doc.productos.push({ product: product._id, quantity: 1 })
            await doc.save()
            return doc
        } catch (error) {
            throw error;
        }
    }
    ///////////////No funciona/////////////////////////
    async deleteProduct(cid, pid) {
        const doc = await CartsModel.findById(cid)
        const productIndex = doc.productos.findIndex((p) => p.product._id.toString() == pid)
        if (productIndex === -1) {
            throw new Error("Producto no encontrado")
        }
        doc.productos.splice(productIndex, 1)
        await doc.save()
        return doc
    }

    async updateCarrito(cid, productos) {
        const doc = await CartsModel.findByIdAndUpdate(cid, { productos }, { new: true })
        return doc
    }

    ///////////////No funciona - el objeto que se envia por body debe ser ej.{"data":10}/////////////////////////
    ///// Me encuantra a  product como NULL y nose porque//////
    async actualizarCantidad(cid, pid, dataCantidad) {
        const doc = await CartsModel.findById(cid)
        const objectId = new ObjectId(pid)
        const productIndex = doc.productos.findIndex((p) => p.product._id.toString() == pid)
        if (productIndex == -1) {
            throw new Error("Producto no encontrado")
        }
        doc.productos[productIndex].quantity = dataCantidad
        await doc.save()
        return doc
    }

    async eliminarProdCarrito(cid) {
        let doc = await CartsModel.findOne({ _id: cid })
        doc.productos = []
        await doc.save()
    }

}

export const cartsService = new CartsService()