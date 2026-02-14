/* ================= CART SYSTEM ================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* Save cart */
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* Update cart counter */
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalItems;
  }
}

/* Add to cart */
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart();
  updateCartCount();
  alert("Item added to cart!");
}

/* Remove item */
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  saveCart();
  loadCart();
  updateCartCount();
}

/* Change quantity */
function changeQuantity(name, amount) {
  const item = cart.find(item => item.name === name);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(name);
  } else {
    saveCart();
    loadCart();
    updateCartCount();
  }
}

/* Load cart page */
function loadCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems) return;

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <span>${item.name}</span>
      <div>
        <button class="quantity-btn minus">-</button>
        ${item.quantity}
        <button class="quantity-btn plus">+</button>
      </div>
      <span>₹${item.price * item.quantity}</span>
      <button class="quantity-btn remove">X</button>
    `;

    /* Button actions */
    div.querySelector(".minus").addEventListener("click", () => {
      changeQuantity(item.name, -1);
    });

    div.querySelector(".plus").addEventListener("click", () => {
      changeQuantity(item.name, 1);
    });

    div.querySelector(".remove").addEventListener("click", () => {
      removeFromCart(item.name);
    });

    cartItems.appendChild(div);
  });

  if (cartTotal) cartTotal.textContent = total;
}

/* ================= MOBILE MENU ================= */

function setupMobileMenu() {
  const toggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (toggle && navLinks) {
    toggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }
}

/* ================= SEARCH FILTER ================= */

function setupSearch() {
  const searchInput = document.getElementById("search");

  if (!searchInput) return;

  searchInput.addEventListener("keyup", function () {
    const value = this.value.toLowerCase();
    const products = document.querySelectorAll(".product-wrapper, .product-card");

    products.forEach(product => {
      const text = product.textContent.toLowerCase();
      product.style.display = text.includes(value) ? "block" : "none";
    });
  });
}

/* ================= INIT ================= */

document.addEventListener("DOMContentLoaded", () => {

  updateCartCount();
  loadCart();
  setupMobileMenu();
  setupSearch();

  /* Add-to-cart buttons */
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseInt(button.dataset.price);
      addToCart(name, price);
    });
  });

});
