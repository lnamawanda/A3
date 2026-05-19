

const openAccount = document.getElementById("openAccount")
const closeAccount = document.getElementById("closeAccount")
const accountDrawer = document.getElementById("accountDrawer")
const accountOverlay = document.getElementById("accountOverlay")

/* OPEN*/
openAccount.addEventListener("click",()=>{
    accountDrawer.classList.add("active");
    accountOverlay.classList.add("active")
});

/* CLOSE*/
closeAccount.addEventListener("click",() => {
accountDrawer.classList.remove("active");
accountOverlay.classList.remove("active");
});

/* CLOSE WHEN OUTSIDE CLICKED*/
accountOverlay.addEventListener("click", () => {
    accountDrawer.classList.remove("active");
    accountOverlay.classList.remove("active");
});

/* CART*/
const openCart = document.getElementById("openCart");
const closeCart = document.getElementById("closeCart");
const cartDrawer = document.getElementById("cartDrawer");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const addCartButtons = document.querySelectorAll(".add-cart");

/* OPEN CART */ 
openCart.addEventListener("click", () => {
    cartDrawer.classList.add("active");
    cartOverlay.classList.add("active");
});

/* CLOSE CART */ 
closeAccount.addEventListener("click", () => {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
});

/* CLOSE OUTSIDE */ 
cartOverlay.addEventListener("click", () => {
    cartDrawer.classList.remove("active");
    cartOverlay.classList.remove("active");
});

/* ADD ITEMS */
addCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const name = button.dataset.name ;
        const price = button.dataset.price ;
        const image = button.dataset.image ; 


        /* REMOVES EMPTY CART MESSAGE*/
     const emptyCart= document.querySelector(".empty-cart");
     if(emptyCart){
        emptyCart.remove();
     }  

     /* CHECK IF ITEM ALR EXISTS*/
     const existingItem = document.querySelector(
        '.cart-item[data-name="${name}"]'
     );

     if(existingItem){
        setTimeout(() => {
            existingItem.classList.remove("cart-highlight")
        }, 500);

     }
     
/* CREATE ITEM */
const cartItem = document.createElement("div");

cartItem.classList.add("cart-item");

cartItem.innerHTML = `
    <img src="${image}" alt="${name}">

    <div class="cart-item-info">
        <p>${name}</p>
        <p>${price}</p> 
    </div>
`;

/* REMOVE ITEM*/
cartItem.querySelector(".remove-item")
.addEventListener("click", () => {
    cartItem.remove();
/*SHOW EMPTY MESSAGE AGAIN*/
if(cartItems.children.length===0){
     cartItems.innerHTML = `
    <p class="empty-cart">
    Your cart is empty </p>`;
}    
})

cartItems.appendChild(cartItem);

/* OPEN CART */
cartDrawer.classList.add("active");
cartOverlay.classList.add("active");
    });

});