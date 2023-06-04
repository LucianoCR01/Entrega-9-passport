import fs from "fs"
import crypto from "crypto"

class CartsManager {
    constructor(path) {
        this.path = path
        this.carts = []
        const cartsString = fs.readFileSync(this.path, "utf-8")
        const carts = JSON.parse(cartsString)
        this.carts = carts
    }

    newCart() {
        let id = crypto.randomUUID()
        const cart = {
            idCarrito: id,
            productos: []
        }
        this.carts.push(
            cart
        );
        const cartsString = JSON.stringify(this.carts, null, 2)
        fs.writeFileSync(this.path, cartsString)
    }

    getCart(idCart) {
        const cartSearch = this.carts.find(ca => ca.idCarrito == idCart)
        if (cartSearch) {
            return cartSearch
        }
        else {
            return "No se encontro el carrito con ese ID"
        }
    }

    agregarProductos(idCart, idProduct) {
        const cartSearch = this.carts.find(ca => ca.idCarrito == idCart)
        const productsString = fs.readFileSync("./storage/data/DB/productos.json", "utf-8")
        const products = JSON.parse(productsString)
        const prodSearch = products.find(pr => pr.id == idProduct)
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
export const carts = new CartsManager("./storage/data/DB/carts.json")