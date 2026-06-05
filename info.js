
/* LOCAL STORAGE*/
let cart = [];

function saveCart(){
localStorage.setItem("cart", JSON.stringify(cart));
}


const openAccount = document.getElementById("openAccount")
const closeAccount = document.getElementById("closeAccount")
const accountDrawer = document.getElementById("accountDrawer")
const accountOverlay = document.getElementById("accountOverlay")

/* ACCOUNT CODE*/

if (openAccount && closeAccount && accountDrawer && accountOverlay) {

    openAccount.addEventListener("click", () => {
        accountDrawer.classList.add("active");
        accountOverlay.classList.add("active");
    });

    closeAccount.addEventListener("click", () => {
        accountDrawer.classList.remove("active");
        accountOverlay.classList.remove("active");
    });

    accountOverlay.addEventListener("click", () => {
        accountDrawer.classList.remove("active");
        accountOverlay.classList.remove("active");
    });
}

/* CART*/
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const addCartButtons = document.querySelectorAll(".add-cart");

/* CART FUNCTION */ 
if (openCart && closeCart && cartDrawer && cartOverlay) {

    openCart.addEventListener("click", () => {
        cartDrawer.classList.add("active");
        cartOverlay.classList.add("active");
    });

    closeCart.addEventListener("click", () => {
        cartDrawer.classList.remove("active");
        cartOverlay.classList.remove("active");
    });

    cartOverlay.addEventListener("click", () => {
        cartDrawer.classList.remove("active");
        cartOverlay.classList.remove("active");
    });

}

/* ADD ITEMS */
addCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name ;
        const price = button.dataset.price ;
        const image = button.dataset.image ; 

        const existing = cart.find(item => item.name === name);
        
        if (existing){
            existing.quantity += 1;
        } else{
            cart.push({name, price, image, quantity: 1});
        }
        
        saveCart();
        renderCart();

        button.textContent = "✓";
        button.classList.add("added");
        button.disabled = true;

        /* OPEN CART */
        cartDrawer.classList.add("active");
        cartOverlay.classList.add("active");
       });  
    });

    /* HIDDEN FILTER FOR IPHONE VERSION*/ 
    const openFilters = document.getElementById("openFilters");
    const filterDrawer = document.getElementById("filterDrawer");
    const filterOverlay = document.getElementById("filterOverlay");
   

/*OPENING FILTERS*/
if (openFilters && filterDrawer && filterOverlay) {

    openFilters.addEventListener("click", () => {
        filterDrawer.classList.add("active");
        filterOverlay.classList.add("active");
    });

    filterOverlay.addEventListener("click", () => {
        filterDrawer.classList.remove("active");
        filterOverlay.classList.remove("active");
    });

}

/* RENDERING CART*/
function renderCart(){

    if(!cartItems) return;

    const storedCart = localStorage.getItem("cart")
    
    cartItems.innerHTML="";

    if(cart.length === 0){
        cartItems.innerHTML = '<p class="empty-cart"> Your cart is empty :(</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
    

    cartItem.innerHTML = `
    <img src="${item.image}" alt="${item.name}">
    <div class="cart-item-info">
        <p>${item.name}</p>
        <p>${item.price}</p>
    </div>
    <button class="remove-item">x</button>`;
    
    cartItem.querySelector(".remove-item").addEventListener("click", () => {
        cart = cart.filter(i => i.name !== item.name);
        saveCart();
        renderCart();
    });
    cartItems.appendChild(cartItem)
});
}



  function syncButtonsWithCart(){
    addCartButtons.forEach(button => {
        const name = button.dataset.name;

        const exists = cart.find(item => item.name === name);

        if (exists) {
            button.textContent = "✓ Added"
            button.classList.add("added");
            button.disabled = true
        }
    });
}

/* LOCAL STORAGE */
document.addEventListener("DOMContentLoaded", () => {

    const storedCart = localStorage.getItem("cart")
    cart = storedCart ? JSON.parse(storedCart) : [];

    syncButtonsWithCart();
    renderCart();
});