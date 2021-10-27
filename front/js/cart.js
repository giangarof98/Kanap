let first = document.getElementById('firstName');
let last = document.getElementById('lastName');
let address = document.getElementById('address');
let city = document.getElementById('city');
let email = document.getElementById('email');
const submit = document.querySelector('.cart__order__form');

let firstErr = document.getElementById('firstNameErrorMsg');
let lastErr = document.getElementById('lastNameErrorMsg');
let addressErr = document.getElementById('addressErrorMsg');
let cityErr = document.getElementById('cityErrorMsg');
let emailErr = document.getElementById('emailErrorMsg');

let orderId;

function init(){
    showCart()
    total()
}

function showCart(){
    let cartItems = document.getElementById('cart__items');
    let array = JSON.parse(localStorage.getItem('cart'));
    
    console.log(array)
    if(array){ 
        for(let i = 0; i < array.length; i++){
            let price = array[i].price;
            let qty = array[i].quantity;
            let total = price * qty;
            let totalItems = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            let article = document.createElement('article')
            article.innerHTML = `
              <article class="cart__item" data-id="{product-ID}">
                <div class="cart__item__img">
                  <img  src="${array[i].imageUrl}" alt="${array[i].altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${array[i].name}</h2>
                    <p>${array[i].colors}</p>
                    <p>€ ${totalItems}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : ${array[i].quantity}</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${array[i].quantity}" onchange="changeQty(${i}, event.target.value)">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" onclick=deleteItem()>Delete</p>
                    </div>
                  </div>
                </div>
              </article>
    `
     cartItems.appendChild(article)
      }
    }
}

function changeQty(i, v){
    let array = JSON.parse(localStorage.getItem('cart'));
    array[i].quantity = parseInt(v);
    localStorage.setItem('cart', JSON.stringify(array))
    location.reload()
    showCart()
    total()
}

function total(){
    let array = JSON.parse(localStorage.getItem('cart'));
    let totalPrice = document.getElementById('totalPrice');
    let totalCart = 0;
    if(array){
        for(let i = 0; i < array.length; i++){
        let priceItems = array[i].price;
        let priceNum = parseInt(priceItems);
        let amount = priceNum * array[i].quantity;
        totalCart += amount
    }
}

    if(totalPrice){
        totalPrice.innerHTML = totalCart.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        sessionStorage.setItem('Total', JSON.stringify(totalCart));

    }
}

function deleteItem(i){
  let array = JSON.parse(localStorage.getItem('cart'));
  array.splice(i, 1);
  localStorage.setItem('cart', JSON.stringify(array))
  location.reload()
  showCart()
}

submit.addEventListener('submit', (e) => {
   e.preventDefault()
    let products = [];

    let array = JSON.parse(localStorage.getItem('cart'));
    for(let i = 0; i < array.length; i++){
        products.push(array[i].id)
        console.log(products)
    }

    let contact = {
      firstName: first.value,
      lastName: last.value,
      email: email.value,
      address: address.value,
      city: city.value
  }

    let data = {
        contact: contact,
        products: products
    }

    order(data)
    
})

function order(data){
  fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
      },
    body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)

      orderId = data.orderId;
      location.replace(`confirmation.html?orderId=${orderId}`)
    })
}

init()

