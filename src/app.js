import express from "express"
import { productsRouter } from "./routes/products.router.js"
import { cartsRouter } from "./routes/carts.router.js"
import { handlebarsRouter } from "./routes/handlebars.router.js"
import { authRouter } from "./routes/auth.router.js"
import { realTime } from "./routes/realtime.router.js"
import { __dirname, connectMongo, connectSocket } from "./utils.js"
import path from "path"
import handlebars from "express-handlebars"
import MongoStore from 'connect-mongo';
import session from "express-session"
import { iniPassport } from "./config/passport.config.js"
import passport from "passport"


const app = express()
const PORT = 8080

const httpServer = app.listen(PORT, () => {
    console.log(`APP corriendo en el http://localhost:${PORT}`)
})

//Conexion a Mongo
connectMongo()

//FRONT del socket
connectSocket(httpServer)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        store: MongoStore.create({ mongoUrl: "mongodb+srv://crucciluciano:crucciluciano@backendcoder.rhria47.mongodb.net/?retryWrites=true&w=majority", ttl: 3600 }),
        secret: 'un-re-secreto',
        resave: true,
        saveUninitialized: true,
    })
);

iniPassport();
app.use(passport.initialize());
app.use(passport.session())

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"));

//Endponits
app.use("/products", productsRouter)
app.use("/carts", cartsRouter)
app.use("/realtimeproducts", realTime)
app.use("/", handlebarsRouter)
app.use("/auth", authRouter)

app.get("*", (req, res) => {
    return res.status(404).json({
        status: "error",
        msg: "Ruta no encontrada",
        data: {}
    })
})