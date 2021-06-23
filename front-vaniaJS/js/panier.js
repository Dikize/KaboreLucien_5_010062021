//Mise à jour du panierPreview
panierPreview();

const orderForm = document.getElementById("orderForm");
const emptyPanier = document.getElementById("emptyPanier");

// indique que le panier est vide
if (panier.length < 1) {
    orderForm.classList.add("d-none");
  // sinon affiche le tableau avec les produits
} else {
    orderForm.classList.add("d-none");
    emptyPanier.classList.add("d-none");
    const fullPanier = document.getElementById("panier");
    fullPanier.classList.toggle("d-none");
    for (product of panier) {
        displayProductListTable(product);
    }

    // ajouter produit
    function addProduct(event) {
        const index = event.target.getAttribute("data-index");
        panier[index].quantity++;
        localStorage.setItem("cameras", JSON.stringify(panier));
        location.reload();
    }

    const buttonAdd = document.getElementsByClassName("plus");
    for (add of buttonAdd) {
        add.addEventListener("click", addProduct);
    }

    // supprimer un produit
    function minusProduct(event) {
        const index = event.target.getAttribute("data-index");
        if (panier[index].quantity > 1) {
            panier[index].quantity--;
        } else {
            panier.splice(index, 1);
        }
        localStorage.setItem("cameras", JSON.stringify(panier));
        location.reload();
    }

    const buttonMinus = document.getElementsByClassName("minus");
    for (minus of buttonMinus) {
        minus.addEventListener("click", minusProduct);
    }

    // affiche le prix total
    totalPrice();

    // affiche formulaire et masque les boutons valider/supprimer panier
    const validationPanier = document.getElementById("validationPanier");
    const cacheButton = document.getElementById("cacheButton");
    validationPanier.addEventListener("click", () => {
        orderForm.classList.toggle("d-none");
        cacheButton.classList.add("d-none");
    });

    // vide le panier
    const buttonClearPanier = document.getElementById("clearPanier");
    buttonClearPanier.addEventListener("click", () => {
        clearPanier();
        location.reload();
    });
}