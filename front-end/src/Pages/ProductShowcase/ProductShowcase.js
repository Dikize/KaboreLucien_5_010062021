import React, { useState, useEffect, useRef } from "react";
// Permet de retrouver l'élements que l'on veut acheter
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ProductShowcase.css";
// Nos données
import inventory from "../../data/inventory";

export default function ProductShowcase() {
    const [nbMugs, setNbMugs] = useState(1);

    // useParams nous retourne un objet
    const { id } = useParams();

    // findIndex va iterer à traver le tableau d'objet, execute la fonction callback pour chaque élement du tableau et on va voir si chaque élement le titre est égale au param 
    const productClicked = inventory.findIndex(
        (obj) => obj.title.replace(/\s+/g, "").trim() === id
    );
        
    //Mise à jour des élément au clique sur ajouter
    const updateMugs = (e) => {
        setNbMugs(Number(e.target.value));
    };
    
    // 
    const addingInfo = useRef();
    let timerInfo;
    let display = true;
    
    // 
    const dispatch = useDispatch()
    
    // 
    const addToCart = e => {
        e.preventDefault()
        
        // 
        const itemAdded = {
            ...inventory[productClicked],
            quantity: nbMugs
        }
        
        // 
        dispatch({
            type: "ADDITEM",
            payload: itemAdded
        })

        //    
        addingInfo.current.innerText = "Ajouté au panier"
        
        // 
        if(display){
            display = false;
            timerInfo = setTimeout(() => {
                addingInfo.current.innerText = "";
                display = true;
            }, 500)
        }
    }

    // 
    useEffect(() => {
        return () => {
            clearTimeout(timerInfo)
        }
    }, [])

    return (
        // Affiche ce que l'on veux dans ui (Montrer l'élement sur le quel on viens de clique)
        <div className="showcase">
            <div className="container-img-showcase">
                {/* L'image de l'élement */}
                <img
                className="img-showcase"
                src={
                    process.env.PUBLIC_URL +
                    `/images/${inventory[productClicked].img}.png`
                    // Chaine de carractère ces la raison du crochet
                }
                alt=""
                />
            </div>

            {/*  */}
            <div className="product-infos">
                <h2>{inventory[productClicked].title}</h2>
                
                <p>Prix: {inventory[productClicked].price}€</p>
                
                <form onSubmit={addToCart}>
                    <label htmlFor="quantity">Quantité</label>
                    
                    <input
                        type="number"
                        id="quanitity"
                        value={nbMugs}
                        // Liaison avec le state
                        onChange={updateMugs}
                    />
                    <button>Ajouter au panier</button>
                    
                    <span 
                    ref={addingInfo}
                    className="adding-info"></span>
                </form>
            </div>
        </div>
    );
}
