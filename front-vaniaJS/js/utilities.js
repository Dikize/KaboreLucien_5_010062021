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

