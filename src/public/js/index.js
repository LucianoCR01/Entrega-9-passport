//Codigo del FRONT

const socket = io()

const formProducts = document.getElementById("form-products");
const inputTitle = document.getElementById("form-title");
const inputDescript = document.getElementById("form-description");
const inputPrice = document.getElementById("form-price");
const inputCode = document.getElementById("form-code");
const inputStock = document.getElementById("form-stock");
const inputCategory = document.getElementById("form-category");
const inputThumbnail = document.getElementById("form-thumbnail");

const formeliminar = document.getElementById("form-eliminar");
const inputEliminar = document.getElementById("inputEliminar")

formProducts.onsubmit = (e) => {
    e.preventDefault();
    const newProduct = {
        title: inputTitle.value,
        description: inputDescript.value,
        price: +inputPrice.value,
        picture: inputThumbnail.value,
        code: inputCode.value,
        stock: +inputStock.value,
        category: inputCategory.value,
    };

    socket.emit("newProduct", newProduct);
    formProducts.reset();
};

socket.on("listProdSocke", listProdSocke => {
    window.location.reload();
})

formeliminar.onsubmit = (e) => {
    e.preventDefault();
    socket.emit("inputEliminar", inputEliminar.value);
    formeliminar.reset();
};

///----------FETCH CART----------

let cartId = localStorage.getItem("cart-id");
const API_URL = "http://localhost:8080";

function putIntoCart(_id) {
    cartId = localStorage.getItem("cart-id");
    const url = API_URL + "/carts/" + cartId + "/product/" + _id;
    const data = {};
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((res) => {
            console.log(res);
            alert("added");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert(JSON.stringify(error));
        });
}

if (!cartId) {
    alert("no id");
    const url = API_URL + "/carts";
    const data = { quantity: 1 };
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
            console.log("Response:", data);
            const cartId = localStorage.setItem("cart-id", data._id);
        })
        .catch((error) => {
            console.error("Error:", error);
            alert(JSON.stringify(error));
        });
}