document.addEventListener("DOMContentLoaded", function(){

// MOBILE MENU
const toggle = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-links");

if(toggle){
toggle.addEventListener("click", function(){
nav.classList.toggle("show");
});
}

// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount(){
const cartCount = document.getElementById("cart-count");
if(cartCount){
cartCount.textContent = cart.reduce((acc,item)=>acc+item.quantity,0);
}
}

function addToCart(name,price){
const existing = cart.find(item=>item.name===name);
if(existing){
existing.quantity++;
}else{
cart.push({name,price,quantity:1});
}
saveCart();
updateCartCount();
alert("Added to cart!");
}

document.querySelectorAll(".add-to-cart").forEach(btn=>{
btn.addEventListener("click",()=>{
addToCart(btn.dataset.name,parseInt(btn.dataset.price));
});
});

updateCartCount();

});
