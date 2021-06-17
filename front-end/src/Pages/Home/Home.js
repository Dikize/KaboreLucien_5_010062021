import React from 'react'
import './Home.css'
import imgHomeShop from './shopimg.jpg'

export default function Home() {
    return (
        <div className="global-container">
            <h1 className="home-title">Bienvenue chez <span>Orinoco</span></h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus provident minima repellendus sint fugiat ea, molestiae consequuntur eligendi ducimus soluta, cupiditate fuga saepe assumenda natus iste eius aliquid molestias eos.</p>
            <img src={imgHomeShop} alt="accueil Orinoco" />
        </div>
    )
}
