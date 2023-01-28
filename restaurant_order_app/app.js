import { menuArray } from "./data.js"

const option = document.getElementById("categories")
option.addEventListener("click", render)
let order = []
let totalPrice = 0

document.addEventListener("click", function(e){
    document.getElementById("payment-message").classList.add("hidden")
    if(e.target.dataset.add){
        const dish = menuArray.filter((dish) => dish.id === e.target.dataset.add)[0]
        if (order.map(element => element.name).includes(dish.name)) {
            for (let element of order){
                if (element.name === dish.name){
                    element.quantity++
                }
            }
        }else {
            order.push({id:dish.id, name:dish.name, price:dish.price, quantity:1})
        }
        totalPrice += dish.price
        orderSummary()
    }
    else if(e.target.dataset.remove){
        for (let element of order) {
            if (element.id === e.target.dataset.remove){
                if (element.quantity>1){
                    element.quantity--
                }else {
                    order = order.filter(element => element.id != e.target.dataset.remove)
                }
                totalPrice -= element.price
            }
        }
        orderSummary()
    }else if(e.target.id === "complete-order-btn"){
        document.getElementById("purchase-modal").classList.remove("hidden")
    }else if(e.target.id === "cancel-btn"){
        document.getElementById("purchase-modal").classList.add("hidden")
    }else if(e.target.id === "payment-btn"){
        e.preventDefault()
        order = []
        totalPrice = 0
        orderSummary()
        document.getElementById("purchase-modal").classList.add("hidden")
        document.getElementById("payment-message").classList.remove("hidden")
        document.getElementById("payment-message").textContent = "Thanks James! Your order is on its way!"

    }
})


function render() {
    let menu = ''
    let newList
    if (option.value === "all"){
        newList = menuArray
    }else if (option.value === "main") {
        newList = menuArray.filter(element => element.category === "main")
    }else if (option.value === "desert") {
        newList = menuArray.filter(element => element.category === "desert")
    }else if (option.value === "beverage") {
        newList = menuArray.filter(element => element.category === "beverage")
    }
    newList.forEach(function(dish){
        menu += `
            <div class="card">
                <h1>${dish.image}</h1> 
                <div class="details">
                    <h2>${dish.name}</h2>
                    <p>${dish.ingredients}</p>
                    <p>$${dish.price}</p>
                </div>
                <button class="add-btn" data-add=${dish.id}> + </button>
            </div>
        `
    })
    document.getElementById("menu-list").innerHTML = menu
}

render()

function orderSummary() {
    document.getElementById("payment-message").classList.add("hidden")
    document.getElementById("order").style.display = (order.length === 0) ? "none" :"block"
    let orderHtml = ''
    order.forEach(function(dish){
        orderHtml += `
        <div class="dish" id="dish">
            <div class="dish-name" id="dish-name">
                <h3>${dish.name} x ${dish.quantity}</h3>
                <p data-remove=${dish.id}>remove</p>
            </div>
            <h3>$${dish.price*dish.quantity}</h3>
        </div>
    `
    })
    document.getElementById("order-list").innerHTML = orderHtml
    document.getElementById("total-price").textContent = `$${totalPrice}`
}
