
/* LOCAL STORAGE*/

let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
            button.textContent = "✓"
            button.classList.add("added");
            button.disabled = true
        }
    });
}

/* product page button*/ 

function syncProductPageButton(){
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const button = document.querySelector(".add-cart");
    if (!button) return;

    const name = button.dataset.name;

    const exists = cart.find(item => item.name === name);

    if (exists) {
        button.textContent = "✓ Added"
        button.disabled
        button.classList.add("added")
    }
}

/* LOCAL STORAGE */
document.addEventListener("DOMContentLoaded", () => {

    const storedCart = localStorage.getItem("cart")
    cart = storedCart ? JSON.parse(storedCart) : [];

    syncButtonsWithCart();
    syncProductPageButton();
    renderCart();
});

/* CHECKOUT PAGE*/


const checkoutItems = document.getElementById("checkoutItems");
const subtotalEl = document.getElementById("subtotal");
const totalEl = document.getElementById("total");

function renderCheckout(){
    console.log ("Checkout rendering");
    console.log(cart);

    if (!checkoutItems) return; //only running on checkout page
    
    const checkoutCart = JSON.parse(localStorage.getItem("cart")) || [];

    checkoutItems.innerHTML = "";
    let subtotal = 0;

    checkoutCart.forEach(item => {
        const price = parseFloat(item.price); 
        
        subtotal += price* item.quantity;

        const div = document.createElement("div");
        div.classList.add("summary-item");

        div.innerHTML = `
            <img src="${item.image}">
            <div>
                <p>${item.name}</p>
                <span>$${price.toFixed(2)} x ${item.quantity}</span>
            </div>
        `;

            checkoutItems.appendChild(div)
    });
    
    const shipping = checkoutCart.length > 0 ? 5 : 0; 
    const total = subtotal + shipping; 

    if (subtotalEl) subtotalEl.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `Total: $${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", renderCheckout);

document.addEventListener("DOMContentLoaded", () => {
    const storedCart = localStorage.getItem("cart")
    cart = storedCart ? JSON.parse(storedCart) : [];

    syncButtonsWithCart();
    renderCart();
});

const checkoutBtn = document.getElementById("checkoutBtn");

document.addEventListener("DOMContentLoaded", () => {

    if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
        window.location.href = "checkout.html";
    });
}
})



// purchase confirmation and clearing cart 
document.addEventListener("DOMContentLoaded", () => {
    const payBtn = document.getElementById("payBtn");
    const transition = document.getElementById("purchaseTransition")
    
    if (!payBtn || !transition) return;

    payBtn.addEventListener("click", (e) => {
        e.preventDefault();

        //show success screen   
     transition.classList.add("active");
     
     // clearing cart 
     setTimeout(() => {
        cart = [];
        localStorage.removeItem("cart");
        sessionStorage.removeItem("cart")
     }, 1200);
    })
})

// continue shopping button 

document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("continueShopping");

    if (btn){
        btn.addEventListener("click", () => {
            localStorage.removeItem("cart");
            cart = [];
            window.location.href = "index.html";
        })
    }
})