let products = JSON.parse(localStorage.getItem("products"));
let cart = JSON.parse(localStorage.getItem("cart"));


fetch("/js/products.json")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        localStorage.setItem("products", JSON.stringify(data));
        if(!localStorage.getItem("cart")){
            localStorage.setItem("cart", "[]");
        }
    });


function addItemToCart(productId, quantity) {
    let products = JSON.parse(localStorage.getItem("products"));
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = products.find(function(item) {
        return item.id == productId;
    });

    if (product) {
        let cartItem = cart.find(element => element.id == productId);
        if (cartItem) {
            cartItem.quantity += quantity;
        } else {
            product.quantity = quantity;
            cart.push(product);
        }
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartQuantityBadge();
}
function addToCartHandler(event) {
    // Retrieve the closest product element
    const productElement = event.target.closest('.product');
    const productId = parseInt(productElement.getAttribute('data-product-id'));
    const quantityInput = productElement.querySelector('.inputQuantity');
    const quantity = parseInt(quantityInput.value);

    addItemToCart(productId, quantity);
}

function getTotalCartQuantity() {
    // Retrieve the cart from localStorage, or initialize an empty array if it doesn't exist
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Initialize total quantity counter
    let totalQuantity = 0;

    // Loop through each item in the cart and add its quantity to the total counter
    cart.forEach(item => {
        totalQuantity += item.quantity;
    });

    // Return the total quantity
    return totalQuantity;
}

function updateCartQuantityBadge() {
    // Get the total quantity from the cart
    const totalQuantity = getTotalCartQuantity();

    // Update the badge element with the total quantity
    document.getElementById('cartQuantity').textContent = totalQuantity;
}


document.addEventListener('DOMContentLoaded', function() {
    updateCartQuantityBadge();
});