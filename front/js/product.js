let itemImg = document.querySelector('.item__img');
let title = document.getElementById('title');
let priceItem = document.getElementById('price');
let descriptionItem = document.getElementById('description');
let select = document.getElementById('colors');
let qty = document.getElementById('quantity')
let add = document.getElementById('addToCart')

let product = {};

function init(){
    let productId = get();
    fetchProduct(productId);
}

function get(){
    const query = window.location.search;
    const urlParam = new URLSearchParams(query);
    const id = urlParam.get("id");
    return id
}

async function fetchProduct(id){
    fetch('http://localhost:3000/api/products/' + id)
        .then(res => res.json())
        .then(data => {
            product = data;
            console.log(data)
            display(data)
        })
}

function display(data){
    let name = data.name;
    let price = data.price;
    let imageUrl = data.imageUrl;
    let colors = data.colors;
    let description = data.description;
    let altTxt = data.altTxt;
    console.log(imageUrl)

    title.innerHTML = name;
    priceItem.innerHTML = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    descriptionItem.innerHTML = description;

    for(let i in colors){
        const arr = document.createElement('option');
        arr.textContent = colors[i];
        select.appendChild(arr)
    }

    itemImg.innerHTML = `<img src="${imageUrl}" alt="">`
}

//Save Item in localStore
add.addEventListener('click', () => {
    let list = [];
    let local = localStorage.getItem('cart');
    let dataQty = document.getElementById('quantity');
    let dataColor = document.getElementById('colors');
    // if(local === null){
    //     list = [];
    // } else {
    //     list = JSON.parse(local)
    // }
    
    let productList = {
        imageUrl: product.imageUrl,
        name: product.name,
        id: product._id,
        price: product.price,
        colors: dataColor.value,
        altTxt: product.altTxt,
        quantity: dataQty.value
    }

    if(localStorage.getItem('cart') && localStorage.getItem('cart').length > 0) {
        const local = JSON.parse(localStorage.getItem('cart')); 
        const data = local.findIndex(data => data.name === productList.name && data.colors === productList.colors);
        if(data === -1){
            local.push(productList);
            localStorage.setItem('cart', JSON.stringify(local))
        } else {
            local[data].quantity = parseInt(local[data].quantity) + parseInt(productList.quantity)
            localStorage.setItem('cart', JSON.stringify(local))
        } 
    } else {
        local = [];
        local.push(productList);
        localStorage.setItem('cart', JSON.stringify(local))
    }

    // if(list.length === 0){
    //     list.push(productList);
    // } else {
    //     let doPush = true;
    //     for(let i =0; i < list.length; i++){
    //         if(productList.name === list[i].name && productList.colors === list[i].colors){
    //             list[i].quantity = productList[i].quantity;

    //         }
    //     } 

    //     if(doPush){
    //         list.push(productList);
    //     }

    // }
    // localStorage.setItem('cart', JSON.stringify(list));
    // console.log(productList);

    // list.push(productList);
    // localStorage.setItem('cart', JSON.stringify(list));
    // console.log(productList);

})

init()