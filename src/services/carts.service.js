import { ProductsModel } from "../dao/models/products.model.js";
import { CartsModel } from "../dao/models/carts.model.js";


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

    async agregatedProduct(idCart, idProduct) {
        const cartProd = {
            product: idProduct,
            quantity: 1
        }
        const transIdProduct = `new ObjectId("${idProduct}")`
        const buscar = await this.findCart(idCart)
        const productos = buscar.productos
        const resultado = productos.find(fruta => fruta.product == transIdProduct);
        if (!resultado) {
            productos.push(cartProd)
            console.log(productos)
            const productUptaded = await ProductsModel.updateOne(
                { _id: idCart },
                { productos }
            );
            return productUptaded
        }
    }
}

export const cartsService = new CartsService()