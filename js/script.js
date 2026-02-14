let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart(){
localStorage.setItem("cart",JSON.stringify(cart));
}

function updateCartCount(){
const cartCount=document.getElementById("cart-count");
if(cartCount){
cartCount.textContent=cart.reduce((acc,item)=>acc+item.quantity,0);
}
}

function addToCart(name,price){
const existing=cart.find(item=>item.name===name);

if(existing){
existing.quantity++;
}else{
cart.push({name,price,quantity:1});
}

saveCart();
updateCartCount();
alert("Added to cart!");
}

function removeFromCart(name){
cart=cart.filter(item=>item.name!==name);
saveCart();
loadCart();
updateCartCount();
}

function changeQuantity(name,amount){
const item=cart.find(i=>i.name===name);
if(item){
item.quantity+=amount;
if(item.quantity<=0){
removeFromCart(name);
}else{
saveCart();
loadCart();
updateCartCount();
}
}
}

function loadCart(){
const cartItems=document.getElementById("cart-items");
const cartTotal=document.getElementById("cart-total");

if(!cartItems)return;

cartItems.innerHTML="";
let total=0;

cart.forEach(item=>{
total+=item.price*item.quantity;

cartItems.innerHTML+=`
<div class="cart-item">
<span>${item.name}</span>
<div>
<button class="quantity-btn" onclick="changeQuantity('${item.name}',-1)">-</button>
${item.quantity}
<button class="quantity-btn" onclick="changeQuantity('${item.name}',1)">+</button>
</div>
<span>₹${item.price*item.quantity}</span>
<button class="quantity-btn" onclick="removeFromCart('${item.name}')">X</button>
</div>
`;
});

if(cartTotal) cartTotal.textContent=total;
}

document.addEventListener("DOMContentLoaded",()=>{
updateCartCount();
loadCart();

document.querySelectorAll(".add-to-cart").forEach(btn=>{
btn.addEventListener("click",()=>{
addToCart(btn.dataset.name,parseInt(btn.dataset.price));
});
});
});
