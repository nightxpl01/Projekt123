function getTotalCartQuantity() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = 0;
    cart.forEach(item => {
        totalQuantity += item.quantity;
    });
    return totalQuantity;
}

function updateCart() {
    document.getElementById('totalQuantity').textContent = getTotalCartQuantity();
    displayCartItems();
}

function increaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItem = cart.find(item => item.id == productId);
    if (cartItem) {
        cartItem.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
}

function decreaseQuantity(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItem = cart.find(item => item.id == productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    }
}

function getTotalCartCost() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCost = 0;
    cart.forEach(item => {
        totalCost += item.price * item.quantity;
    });
    return totalCost.toFixed(2);
}

function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    cart.forEach(item => {
        let cartItem = document.createElement('div');
        cartItem.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'border', 'p-2', 'mb-2');
        cartItem.innerHTML = `
                    <div>
                        <h5>${item.name}</h5>
                         <p>Ilość: <button class="btn btn-outline-secondary btn-sm" onclick="decreaseQuantity(${item.id})">-</button>
                        <span class="mx-2">${item.quantity}</span>
                        <button class="btn btn-outline-secondary btn-sm" onclick="increaseQuantity(${item.id})">+</button></p>
                    </div>
                    <div>
                        <p>${item.price}zł</p>
                    </div>
                `;
        cartItemsContainer.appendChild(cartItem);
        document.getElementById('totalCost').textContent = getTotalCartCost();

    });

    document.getElementById('totalQuantity').textContent = getTotalCartQuantity();
}

document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
});