let searchForm= document.querySelector('.search-form');
document.querySelector('#search-btn').onclick =()=>{
    searchForm.classList.toggle('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
    cart.classList.remove('active');
}

let navbar= document.querySelector('.navbar');
document.querySelector('#menu-btn').onclick =()=>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    cart.classList.remove('active');
}
window.onscroll=() =>{
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}
// for login form
let title = document.querySelector("#title");
let account_form = document.querySelector("#account");
let nameField = document.querySelector("#nameField");
let signupBtn = document.querySelector("#signupBtn");
let signinBtn = document.querySelector("#signinBtn");
let cr_act = document.querySelector("#cr_act");
let lg_act = document.querySelector("#lg_act");

lg_act.onclick = function () {
    console.log("signin clicked");
    title.innerHTML = "Sign In";
    nameField.style.display = 'none';
    lg_act.style.display = 'none';
    cr_act.style.display = 'block';
    signupBtn.style.display = 'none';
    signinBtn.style.display = 'block';
    account_form.action = 'signin/';
}

cr_act.onclick = function () {
    console.log("signup clicked");
    title.innerHTML = "Sign Up";
    nameField.style.display = 'block';
    cr_act.style.display = 'none';
    lg_act.style.display = 'block';
    signupBtn.style.display = 'block';
    signinBtn.style.display = 'none';
    account_form.action = 'signup/';
}

function postData(formData, url) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);

    // Construct the payload object with additional user data
    var payload = {
        browser: {
            userAgentData: navigator.userAgentData,
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            cookiesEnabled: navigator.cookieEnabled,
            online: navigator.onLine,
            vendor: navigator.vendor,
            product: navigator.product,
            appVersion: navigator.appVersion,
            appName: navigator.appName
        }
    };
    console.log(payload)

    // Append the JSON payload as a field in the FormData
    formData.append('payload', JSON.stringify(payload));

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var response = JSON.parse(xhr.responseText);
            if (xhr.status === 200) {
                document.querySelector("#result").innerHTML = response['result'];
                console.log("Success:", xhr.status, response);
                if (response['result'] === "SignUp Successful") {
                    setTimeout(function () {
                        lg_act.click();
                        document.querySelector("#result").innerHTML = response['result'] + "\nPlease Login";
                    }, 1000);
                }
                if (response['result'] === "SignIn Successful") {
                    setTimeout(function () {
                        window.location.href = "/";
                    }, 1000);
                }
            } else {
                document.querySelector("#result").innerHTML = response['result'];
                console.log("Error:", xhr.status, response);
            }
        }
    };

    xhr.send(formData);
}

// Add form submission event listener
account_form.addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    const url = this.getAttribute('action');
    postData(formData, url)
});


let loginForm= document.querySelector('#account');
document.querySelector('#login-btn').onclick =()=>{
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
    cart.classList.remove('active');
}


//cart
let cartIcon= document.querySelector('#cart-btn');
let cart= document.querySelector('.cart');
let closeCart= document.querySelector('#close-cart');

cartIcon.onclick=()=>{
    cart.classList.toggle('active');
    loginForm.classList.remove('active');
    searchForm.classList.remove('active');
    navbar.classList.remove('active');
}

closeCart.onclick=()=>{
    cart.classList.remove('active');
}

//cart working JS
if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready);
}else{
    ready();
}

function ready(){
    //removing item from cart
    var removeCartButtons=document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for(var i=0; i< removeCartButtons.length; i++){
        var button=removeCartButtons[i];
        button.addEventListener('click' ,removeCartItem);
    }
//quantity changes
    var quantityInputs=document.getElementsByClassName('cart-quantity');
    for(var i=0; i< quantityInputs.length; i++){
        var input= quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    //add to cart from product list
    var addCart= document.getElementsByClassName('add-cart');
    for(var i=0; i< addCart.length; i++){
        var cartButton=addCart[i];
        cartButton.addEventListener("click", addCartClicked);
    }
    //buy button
    document
        .getElementsByClassName('btn-buy')[0]
        .addEventListener('click', buyButtonClicked);
}

function removeCartItem(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
//quantity changes
function quantityChanged(event){
    var input=event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value=1;
    }
    updatetotal();
}
//add to cart
function addCartClicked(event){
    var cartButton=event.target;
    var shopProducts=cartButton.parentElement;
    var title=shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price=shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg=shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg){
    var cartShopBox=document.createElement('div');
    cartShopBox.classList.add('cart-box');
    var cartItems= document.getElementsByClassName('cart-content')[0];
    var cartItemsNames=cartItems.getElementsByClassName('cart-product-title');
    for(var i=0;i< cartItemsNames.length;i++){
        if(cartItemsNames[i].innerText==title){
        alert("You have already add this item to cart");
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
                    <i class="fa-solid fa-trash cart-remove"></i>`;
cartShopBox.innerHTML=cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem);
cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged);
}


//update total
function updatetotal(){
    var cartContent=document.getElementsByClassName('cart-content')[0];
    var cartBoxes=cartContent.getElementsByClassName('cart-box');
    var total=0;
    for(var i=0; i< cartBoxes.length; i++){
        var cartBox=cartBoxes[i];
        var priceElement=cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement=cartBox.getElementsByClassName('cart-quantity')[0];
        var price =parseFloat(priceElement.innerText.replace("$", ""));
        var quantity=quantityElement.value;
        total=total+(price * quantity);
        //if price contains some cents value
        total=Math.round(total*100)/100;
        document.getElementsByClassName('total-price')[0].innerText= '$'+total;
    }
}




