import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

export const menuArray = [
    {
        id: uuidv4(),
        name: "Pizza",
        image: "🍕",
        ingredients: ["pepperoni, mushrom, mozarella"],
        category: "main",
        price: 14,
        discount: 0
    },
    {
        id: uuidv4(),
        name: "Hamburger",
        image: "🍔",
        ingredients: ["beef, cheese, lettuce"],
        category: "main",
        price: 12,
        discount: 0
    },
    {
        id: uuidv4(),
        name: "Beer",
        image: "🍺",
        ingredients: ["grain, hops, yeast, water"],
        category: "beverage",
        price: 12,
        discount: 0
    },
    {
        id: uuidv4(),
        name: "Chocolate Cake",
        image: "🎂",
        ingredients: ["cocoa, strawberries"],
        category: "desert",
        price: 8,
        discount: 0
    }
]