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

    //affiche le formulaire et cache les boutons valider/supprimer panier
    const validationPanier = document.getElementById("validationPanier");
    const cacheButton = document.getElementById("cacheButton");
    validationPanier.addEventListener("click", () => {
        orderForm.classList.toggle("d-none");
        cacheButton.classList.add("d-none");
    });

    //vide le panier
    const buttonClearPanier = document.getElementById("clearPanier");
    buttonClearPanier.addEventListener("click", () => {
        clearPanier();
        location.reload();
    });

    //validation du formulaire et envoie en POST
    const order = document.getElementById("order");
    //const regexName = ;
    //const regexCity = ;
    //const regexMail = ;
    //const regexAddress = ;
    const checkBox = document.getElementById("invalidCheck2");

    order.addEventListener("click", (event) => {
        // on prépare les infos pour l'envoie en POST
        let contact = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            address: document.getElementById("address").value,
            city: document.getElementById("city").value,
            email: document.getElementById("email").value,
        };

        // verification de l'information saisi
        if (
            (regexMail.test(contact.email) == true) &
            (regexName.test(contact.firstName) == true) &
            (regexName.test(contact.lastName) == true) &
            (regexCity.test(contact.city) == true) &
            (regexAddress.test(contact.address) == true) &
            (checkBox.checked == true)
        ) {
            event.preventDefault();

            // on stocke date/heure de la commande
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 
            // 

            // envoie en POST
            fetch("https://back-end-orinoco.herokuapp.com/api/Cameras/order", 
            // fetch("http://localhost:3000/api/cameras/order", 
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ contact, products }),
            })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem("order", JSON.stringify(data));
                    document.location.href = "order.html";
                })
                .catch((erreur) => console.log("erreur : " + erreur));
        } else {
            alert(
                "Veuillez correctement verifier les informations saisi s'ils vous plaît."
            );
        }

    });
}