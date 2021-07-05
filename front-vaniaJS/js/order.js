const order = JSON.parse(localStorage.getItem("order")) || [];
const date = JSON.parse(localStorage.getItem("date")) || [];

// affiche les info
const informations = document.getElementById("contact");
// 
informations.innerHTML += `
    <p class="fs-5"><span class="fw-bold text-capitalize">${order.contact.firstName}</span>, merci pour votre achat sur Orinoco !</p>
    <p class="fs-5"> Votre commande passée le <span class="fw-bold">${date[0].date}</span> à <span class="fw-bold">${date[0].hours}</span> d'un montant total de <span class="fw-bold">${convertPrice(displayTotalPanier())}</span> a été validée.</p>
    <p class="fs-5">Référence de l'achat <span class="fw-bold">${order.orderId}</span>.</p>
    <p class="fs-5">Votre facture va vous être transmise par mail à : <span class="fw-bold">${order.contact.email}</span>.</p>
    <p class="fs-5">Votre commande sera envoyée à l'adresse suivante :
    <div class=" fs-5 text-center fw-bold">
        <p class="text-capitalize">${order.contact.firstName} ${order.contact.lastName}</p>
        <p class="text-capitalize">${order.contact.address}</p>
        <p class="text-capitalize">${order.contact.city}</p>
    </div>
    `;

// affiche Récapitulatif de ma commande
for (product of panier) {
    displayProductListTable(product);
}
const deletedItem = document.getElementsByClassName("rounded");
// cache les button + et -
for(element of deletedItem){
    element.classList.add("d-none");
}

//affiche le prix total
totalPrice();

//bouton imprimer
const print = document.getElementById("print");
print.addEventListener("click", (e) => {
    e.preventDefault;
    window.print();
});

//vide le localStorage
const clickHome = document.getElementById("accueil");
clickHome.addEventListener("click", () => {
    clearPanier();
});

// Supprime le panier
const clickPanier = document.getElementById("panierPreview");
clickPanier.addEventListener("click", () => {
    clearPanier();
});