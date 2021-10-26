let order = document.getElementById('orderId');
let orderId = get();
let back = document.getElementById('back')

order.innerHTML = orderId;
console.log(order);

back.addEventListener('click', ()=>{
    sessionStorage.removeItem("orderId");
    localStorage.removeItem("cart");
})

function get(){
    const query = window.location.search;
    const urlParam = new URLSearchParams(query);
    const id = urlParam.get("orderId");
    return id
}