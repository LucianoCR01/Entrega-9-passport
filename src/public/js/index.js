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