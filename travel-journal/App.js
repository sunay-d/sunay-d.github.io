import React from "react"
import Navbar from "./components/Nav"
import Card from "./components/Card"
import data from "./data"

export default function App(){
    const cards = data.map(card => 
         <Card
             card = {card}
         />
    )
    return (
        <main>
            <Navbar />
            {cards}
        </main>
    )
}