//Mise à jour du panierPreview
panierPreview();

// récupération de l'id du produit
const searchParams = new URLSearchParams(location.search);
const newId = searchParams.get("_id");

//modification de l'adresse d'appel à l'API
const newUrl = `https://back-end-orinoco.herokuapp.com/api/Cameras/${newId}`;

fetch(newUrl)
    .then((response) => response.json())
    .then((data) => {
        const product = data;
        addCard(data);

        // fonction pour la création de la card de la page produit
        function addCard(product) {

            // insertion des information de la card du produit
            const selectionProductImage = document.getElementById("productImage");
            selectionProductImage.innerHTML += 
            `
                <img src="${product.imageUrl}" class="img-fluid img-thumbnail" alt="${product.name}">
            `
        ;
            const selectionProductName = document.getElementById("productName");
            selectionProductName.innerHTML += 
            `
                <h5 class="card-title">${product.name}</h5>
            `
        ;
            const selectionProductPrice = document.getElementById("productPrice");
            selectionProductPrice.innerHTML += 
            `
                <h5 class="card-title">${convertPrice(product.price)}</h5>
            `
        ;
            const selectionProductDescription = document.getElementById("productDescription");
            selectionProductDescription.innerHTML += 
            `
                <p class="card-text">${product.description}</p>
            `
        ;
            addLenses(product);
        }

        function addLenses(product) {
            const versionChoice = document.getElementById("option");
            for (let lenses of product.lenses) {
                versionChoice.innerHTML += 
                `
                <option value="${lenses}">${lenses}</option>
                `
                ;
            }
        }

        const btnAddPanier = document.getElementById("btnAddPanier");
        btnAddPanier.addEventListener("click", (e) => {
            e.preventDefault();
            const list = document.getElementById("option");
            const quantity = document.getElementById("quantity");

            // créer un nouveau produit
            let objectProduct = new Product(
                newId,
                product.name,
                product.description,
                product.price,
                list.value,
                quantity.value,
                product.imageUrl
            );
            // vérifie s'il est déja présent
            // oui? si true, sauvegarde sa place dans le localStorage
            let isAlreadyPresent = false;
            let indexModification;
            for (products of panier) {
                switch (products.option) {
                    case objectProduct.option:
                        isAlreadyPresent = true;
                        indexModification = panier.indexOf(products);
                }
            }

            // si true incrémente seulement la quantité
            if (isAlreadyPresent) {
                panier[indexModification].quantity =
                    +panier[indexModification].quantity + +objectProduct.quantity;
                localStorage.setItem("cameras", JSON.stringify(panier));
                // false , ajoute le produit au localStorage
            } else {
                panier.push(objectProduct);
                localStorage.setItem("cameras", JSON.stringify(panier));
            }
        });
    });
