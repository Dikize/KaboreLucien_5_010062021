//Variables Globales
const url = `https://back-end-orinoco.herokuapp.com/api/Cameras`;
const panier = JSON.parse(localStorage.getItem("cameras")) || [];

// convertir le prix
function convertPrice(productPrice) {
    let price = `${productPrice}`;
    price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    }).format(price / 100);
    return price;
}

// calcul du PanierPreview
function panierPreview() {
    if (panier.length == 0) {
    } else {
        let addPanierPreview = document.getElementById("panierPreview");
        let calculPanierPreview = 0;
        for (product of panier) {
            calculPanierPreview += product.quantity;
        }
        addPanierPreview.innerHTML = `Panier <span class="badge rounded-pill bg-secondary align-middle my-auto">${calculPanierPreview}</span>`;
    }
}

//ajoute le tableau de commande
function displayProductListTable(product) {
    const indexProduct = panier.indexOf(product);
    const productList = document.getElementById("productsPanier");
    productList.innerHTML += `
    <tr class="text-center">
        <td class="w-25">
            <img src="${product.imgurl}" class="img-fluid img-thumbnail" alt="${product.name}">
        </td>
        <td class="align-middle">
            <span>${product.name}</span>
        </td>
        <td class="align-middle">
            <span>${product.option}</span>
        </td>
        <td class="align-middle productQuantity">
            <button type="button" class="rounded minus data-toggle="modal" data-target="#exampleModal" data-index="${indexProduct}"><span class="fas fa-minus-square text-danger" data-index="${indexProduct}"></span></button>
            <span class="mx-0 mx-lg-3"> ${product.quantity}</span>
            <button type="button" class="rounded plus" data-toggle="modal" data-target="#exampleModal" data-index="${indexProduct}"><span class="fas fa-plus-square text-success" data-index="${indexProduct}"></span></button>
        </td>
        <td class="align-middle">
            <span>${convertPrice(product.price)}</span>
        </td>
        <td class="align-middle bg-light">
            <span>${convertPrice(product.quantity * product.price)}</span>
        </td>
    </tr>`;
}