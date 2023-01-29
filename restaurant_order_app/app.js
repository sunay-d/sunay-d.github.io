import { menuArray } from "./data.js"

const option = document.getElementById("categories")
const sortBy = document.getElementById("sort-by")
const paymentForm = document.getElementById("payment-form")

option.addEventListener("change", render)
sortBy.addEventListener("change", render)
paymentForm.addEventListener("submit", function(e){
    e.preventDefault()
    const paymentForm = document.getElementById("payment-form")
    const paymentData = new FormData(paymentForm)
    const userName = paymentData.get("user-name")
    order = []
    totalPrice = 0
    orderSummary()
    document.getElementById("purchase-modal").classList.add("hidden")
    document.getElementById("payment-message").classList.remove("hidden")
    document.getElementById("payment-message").textContent = `Thanks ${userName}! Your order is on its way!`
})
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
        document.getElementById("purchase-modal").classList.add("hidden")}
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

    let newListSorted = [...newList]
    if (sortBy.value === "descending") {
        newListSorted.sort((a,b) => (a.price < b.price) ? 1 : -1)
    } else if (sortBy.value === "increasing") {
        newListSorted.sort((a,b) => (a.price > b.price) ? 1 : -1)
    }
    newListSorted.forEach(function(dish){
        menu += `
            <div class="card">
                <h2 class="dish-emoji">${dish.image}</h2> 
                <div class="details">
                    <h2 class="dish-name">${dish.name}</h2>
                    <p class="dish-ingredients">${dish.ingredients}</p>
                    <p class="dish-price">$${dish.price}</p>
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