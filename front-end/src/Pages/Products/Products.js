import React from "react";
import heart from "./heart.svg";
import "./Products.css";
import { Link } from "react-router-dom";
import inventory from "../../data/inventory.js";
// import camera from "../../../../backEnd/models/Camera.js";

export default function Products() {
    return (
        <div className="container-products">
            {inventory.map((item) => (
                <Link
                // Avoir un path special, permettra d'avoir des espace dans l'url pour les name du produit(remplace tous les spaces par des carractères vide et le trim on enleve les espace vide du debut et de la fin)
                to={{
                        pathname: `/produits/${item.title.replace(/\s+/g, "").trim()}`,
                }}
                // La clef
                key={item.id}
                >
                    {/*  */}
                    <div className="bloc-card">

                        {/* Le contenue de la carte */}
                        <div className="product-card">

                            {/* l'image */}
                            <div className="visual-aspect">
                                <img 
                                className="img-product"

                                // Quand ça sera en ligne avec une vrai url ça le mettra à cet endroit à la place de de process env
                                src={process.env.PUBLIC_URL + `/images/${item.img}.png`} 
                                alt="produit" />
                                <div className="like-container">
                                    <img src={heart} alt="icône j'aime" />
                                </div>
                            </div>

                            {/* Les information sur la carte  */}
                            <div className="info">
                                <p>{item.title}</p>
                                <p>Prix : {item.price}€</p>
                            </div>
                        </div>
                        {/* Sous card qui donne l'effet d'ombre */}
                        <div className="back-card"></div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
