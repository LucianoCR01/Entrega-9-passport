import { ProductsModel } from "../dao/models/products.model.js";


class ProductsService {

    async findProducts(idParam) {
        const findProducts = await ProductsModel.find({ _id: idParam });
        return findProducts
    }

    async getProducts() {
        const products = await ProductsModel.find({});
        return products
    }

    async createProduct(title, description, code, price, status, stock, category, picture) {
        if (!title || !description || !code || !price || !status || !stock || !category || !picture) {
            console.log(
                "validation error: please complete the form."
            );
            return res.status(400).json({
                status: "error",
                msg: "please complete the form.",
                data: {},
            });
        }
        const productCreated = await ProductsModel.create({ title, description, code, price, status, stock, category, picture })
        return productCreated
    }

    async updateProduct(id, title, description, code, price, status, stock, category, picture) {
        if (!title || !description || !code || !price || !status || !stock || !category || !picture) {
            console.log(
                "validation error: please complete form."
            );
            return res.status(400).json({
                status: "error",
                msg: "please complete form.",
                data: {},
            });
        }
        const productUptaded = await ProductsModel.updateOne(
            { _id: id },
            { title, description, code, price, status, stock, category, picture }
        );
        return productUptaded
    }

    async deleteProduct(id) {
        const deleted = await ProductsModel.deleteOne({ _id: id });
        return deleted
    }

}

export const productsService = new ProductsService()