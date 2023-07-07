//---------------------------------------__dirname-----------------------------------
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/public");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

export const uploader = multer({ storage });
import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

//-------------------------------------------------Mongoose-----------------------------------
import { connect } from "mongoose";
export async function connectMongo() {
    try {
        await connect(
            "mongodb+srv://crucciluciano:crucciluciano@backendcoder.rhria47.mongodb.net/?retryWrites=true&w=majority"
        );
        console.log("plug to mongo!");
    } catch (e) {
        console.log(e);
        throw "can not connect to the db";
    }
}

//-------------------------------------------------SocketServer--------------------------------------------------
import { Server } from "socket.io"
import { productos } from "./clases/clases.product.js"
export function connectSocket(httpServer) {

    const socketServer = new Server(httpServer)
    socketServer.on("connection", socket => {
        console.log("Se abrio un Socket " + socket.id)
        socket.on("newProduct", async newProduct => {
            productos.addProduct(newProduct)
            const listProdSocke = await productos.getProducts()
            socket.emit("listProdSocke", listProdSocke)
        })

        socket.on("inputEliminar", async inputEliminar => {
            productos.deleteProduct(inputEliminar)
            const listProdSocke = await productos.getProducts()
            socket.emit("listProdSocke", listProdSocke)
        })
    })
}
//--------------------- BCRYPT ---------------------

import bcrypt from 'bcrypt';
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
export const isValidPassword = (password, hashPassword) => bcrypt.compareSync(password, hashPassword)


