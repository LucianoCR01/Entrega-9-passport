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
        const products = this.getProducts()
        const prodSearch = products.find(pr => pr.id == idProduct)
        const cartSearch = this.findCart(idCart)
        if (cartSearch && prodSearch) {
            let prodAcortado = cartSearch.productos
            let busProd = prodAcortado.find(pr => pr.id == idProduct)
            let busProdIndex = this.carts.findIndex(bu => bu.idCarrito == idCart)
            if (busProd) {
                busProd.quantity++
            } else {
                prodAcortado.push({ "id": idProduct, "quantity": 1 })
            }
            cartSearch.productos = prodAcortado
            this.carts.slice(busProdIndex, 1, cartSearch)
            const cartsString = JSON.stringify(this.carts, null, 2)
            fs.writeFileSync(this.path, cartsString)
        } else {
            console.log("Verifique que los ID sean correctos")
        }
    }
}

export const cartsService = new CartsService()