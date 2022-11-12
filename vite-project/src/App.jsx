import './App.css'
import Navbar from './components/Navbar'
import Card from './components/Card'
import data from "../data"

function App() {
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

export default App
