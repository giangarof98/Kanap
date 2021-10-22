let order = document.getElementById('orderId');
let orderId = sessionStorage.getItem('orderId');
let back = document.getElementById('back')

order.innerHTML = orderId;
console.log(order);

back.addEventListener('click', ()=>{
    sessionStorage.removeItem("orderId");
    localStorage.removeItem("cart");
})