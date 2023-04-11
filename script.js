// Cart

let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#close-cart");
// Open cart
cartIcon.onclick = () => {
    cart.classList.add("active");
};

// Close cart 
closeCart.onclick = () => {
    cart.classList.remove("active");
};

// Cart Working JS
if (document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// Making Function
function ready(){
    // Remove Items From Cart 
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for (var t = 0; t < removeCartButtons.length; t++) {
        var button = removeCartButtons[t];
        button.addEventListener("click", removeCartItem);
    }
// Quantity changes
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for (var t = 0; t < quantityInputs.length; t++){
        var input = quantityInputs[t]
        input.addEventListener('change', quantityChanged);
    }
    // Add  to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var t = 0; t < addCart.length; t++){
        var button = addCart[t];
        button.addEventListener("click", addCartClicked);
    };
    // Buy Button Work
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}
// Buy Button 
function buyButtonClicked(){
    alert('your order is placed')
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while ( cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    Updatetotal()
}

// Remove Items From Cart 
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    Updatetotal();
}

function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    Updatetotal();
}
// Add to cart  
function addCartClicked(event) {
    var button = event.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    var price = shopProduct.getElementsByClassName("price")[0].innerText;
    var productImg = shopProduct.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    Updatetotal();
}
function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add('cart-box');
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var t = 0; t < cartItemsNames.length; t++) {
      if (cartItemsNames[t].innerText == title) {
        alert("You have already add this items to cart");
        return;
    }
}

var cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- remove -->
                        <i class="bx bxs-trash-alt cart-remove"></i>`;
cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);

}

// Update total 
function Updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0]
    var cartBoxes = cartContent.getElementsByClassName("cart-box")
    var total = 0;
    for (var t = 0; t < cartBoxes.length; t++) {
        var cartBox = cartBoxes[t];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0]
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
        // if price contain some cents value
        total = Math.round(total * 100) / 100;
        
        document.getElementsByClassName("total-price")[0].innerText = "$" + total;
}


// /*                   COMPLETED                 */