//Mise à jour du PanierPreview
panierPreview();

// récupérer(appel) URL(Api) grace à fetch
// 1er then renvoie une Promesse Json pour informe si correct et 2em accède au data Json
// catch log l'erreur s'il y'en à une
fetch(url)
    .then((response) => response.json())
    .then((data) => {
        addCards(data);
    })
    .catch((erreur) => console.log("erreur : " + erreur));

// fonction pour la création des cards de la page d'accueil
function addCards(data) {
    //boucle pour chaque iteration d'un produit
    for (produit of data) {
        //recupère l'élément liste dans le HTML
        const card = document.getElementById("liste");
        //convertit le prix
        const price = convertPrice(produit.price);
        
        //insérer le HTML dans le document
        card.innerHTML += `
        <div class="col-sm-12 col-md-6 col-lg-6 pb-3 carte ">
            <div class="card border shadow p-3 mb-5 bg-body rounded">
                <div class="card-body">
                    <div class="row">
                        <a href="./front-vaniaJS/pages/produit.html?_id=${produit._id}"><img src="${produit.imageUrl}" class="img-fluid img-thumbnail p-1" alt="${produit.name}"></a>
                        <div class="col-6 col-sm-7 mt-3" >
                            <h5 class="card-title">${produit.name}</h5>
                        </div>
                        <div class="col-6 col-sm-5 text-end mt-3">
                            <h5 class="card-title">${price}</h5>
                        </div>
                    </div>
                    <p class="card-text text-truncate">${produit.description}</p>
                    <a href="./front-vaniaJS/pages/produit.html?_id=${produit._id}" class="btn btn-light">Ajouter au panier</a>
                </div>
            </div>
        </div>`;

        // Animation card grace a Vanilla-Tilt
        VanillaTilt.init(document.querySelectorAll(".card"), {
            max: 25,
            speed: 400,
            glare: true,
            "max-glare": 1
        });
    }
}
