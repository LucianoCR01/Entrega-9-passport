import fs from "fs"
import crypto from "crypto"

class ProductManager {

    constructor(path) {
        this.path = path
        this.products = []
        const productsString = fs.readFileSync(this.path, "utf-8")
        const products = JSON.parse(productsString)
        this.products = products
    }

    addProduct(newProduct) {
        let id = crypto.randomUUID()
        let argumentos = Object.keys(newProduct).length ?? 0
        if (argumentos < 7) {
            return console.log("Faltan argumentos")
        }
        else {
            if (this.products.find((e) => e.code == newProduct["code"])) {
                return console.log("el code esta repetido")
            } else {
                newProduct.id = id
                this.products.push(
                    newProduct
                );
                const productsString = JSON.stringify(this.products, null, 2)
                fs.writeFileSync(this.path, productsString)
            }
        }
    }

    async getProducts() {
        if (fs.existsSync(this.path)) {
            let productsList = await fs.promises.readFile(this.path, "utf-8")
            productsList = JSON.parse(productsList)
            return productsList
        } else {
            console.log("Error el archivo no existe")
        }

    }

    async getProductById(id) {
        let productsList = await this.getProducts()
        let existID = productsList.find(e => e.id === id)
        if (existID == undefined) {
            return "not found"
        } else return existID
    }

    async updateProduct(idActualizar, campoActualizar, actualizacion) {
        if (campoActualizar == "title" || "description" || "code" || "price" || "status" || "stock" || "category") {
            let productsList = await this.getProducts()
            let existID = productsList.find(e => e.id == idActualizar)
            let indexID = productsList.findIndex(e => e.id == idActualizar)
            if (existID !== undefined) {
                existID[campoActualizar] = actualizacion
                this.products.splice(indexID, 1, existID)
                fs.writeFileSync(this.path, JSON.stringify(this.products))
            }
        } else if (campoActualizar == "id") {
            console.log("no se puede cambiar el ID")
        } else {
            console.log("no soy un campo")
        }
    }

    async deleteProduct(idDelete) {
        let productDelete = await fs.promises.readFile(this.path, "utf-8")
        productDelete = JSON.parse(productDelete)
        let indexID = productDelete.findIndex(e => e.id == idDelete)
        productDelete.splice(indexID, 1)
        fs.writeFileSync(this.path, JSON.stringify(productDelete))
    }
}

export const productos = new ProductManager("./storage/data/DB/productos.json")