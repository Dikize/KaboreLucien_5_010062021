//Mise à jour du panierPreview
panierPreview();

// section formulaire
const orderForm = document.getElementById("orderForm");
// section panier vide 
const emptyPanier = document.getElementById("emptyPanier");

// indique que le panier est vide, donc masque le formulaire
if (panier.length < 1) {
    orderForm.classList.add("d-none");
    // sinon affiche le tableau avec les produits
} else {
    // si le panier est contient un produit on masque le panier vide et le formulaire.
    orderForm.classList.add("d-none");
    emptyPanier.classList.add("d-none");

    // toggle bascule la section panier en block si le panier contient au moin un produit
    const fullPanier = document.getElementById("panier");
    fullPanier.classList.toggle("d-none");
    // boucle pour la section panier
    for (product of panier) {
        displayProductListTable(product);
    }

    // ajouter produit avec le button +
    function addProduct(event) {
        const index = event.target.getAttribute("data-index");
        panier[index].quantity++;
        localStorage.setItem("cameras", JSON.stringify(panier));
        location.reload();
    }

    // evenement sur le button + pour ajouter un element
    const buttonAdd = document.getElementsByClassName("plus");
    for (add of buttonAdd) {
        add.addEventListener("click", addProduct);
    }

    // supprimer un produit avec le button -
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
    // evenement sur le button - pour supprimer un element 
    for (minus of buttonMinus) {
        minus.addEventListener("click", minusProduct);
    }

    // affiche le prix total
    totalPrice();

    // affiche le formulaire quand on clique sur valider le panier et cache les boutons valider/supprimer panier
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

    // validation du formulaire et envoie en POST
    const order = document.getElementById("order");
    const regexName = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+))$/;
    const regexCity = /^(([a-zA-ZÀ-ÿ]+[\s\-]{1}[a-zA-ZÀ-ÿ]+)|([a-zA-ZÀ-ÿ]+)){1,10}$/;
    const regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]{2,}\.[a-z]{2,4}$/;
    const regexAddress = /^(([a-zA-ZÀ-ÿ0-9]+[\s\-]{1}[a-zA-ZÀ-ÿ0-9]+)){1,10}$/;
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
            // Empecher le rechargement de la page
            event.preventDefault();

            // stock date/heure de la commande
            const todayDate = new Date();
            let nowadays = todayDate.getDate();
            let month = todayDate.getMonth() + 1;
            let todayHours = todayDate.getHours();
            let todayMinutes = todayDate.getMinutes();

            if (nowadays < 10) {
                nowadays = "0" + nowadays;
            }

            if (month < 10) {
                month = "0" + month;
            }

            if (todayHours < 10) {
                todayHours = "0" + todayHours;
            }

            if (todayMinutes < 10) {
                todayMinutes = "0" + todayMinutes;
            }

            const date = nowadays + "-" + month + "-" + todayDate.getFullYear();
            const hours = todayHours + ":" + todayMinutes;
            const fullDate = {
                date,
                hours
            };
            const infoOrder = JSON.parse(localStorage.getItem("date")) || [];
            infoOrder.push(fullDate);
            localStorage.setItem("date", JSON.stringify(infoOrder));

            let products = [];
            for (listId of panier) {
                products.push(listId.id);
            }

            // envoie en POST les produits selectionner et le formulaire
            // fetch("https://back-end-orinoco.herokuapp.com/api/Cameras/order",
            fetch("http://localhost:3000/api/cameras/order", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        contact,
                        products
                    }),
                })
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem("order", JSON.stringify(data));
                    document.location.href = "order.html";
                })
                .catch(erreur => console.log("erreur : " + erreur));
        } else {
            alert(
                "Veuillez correctement verifier les informations saisi s'ils vous plaît."
            );
        }

    });
}