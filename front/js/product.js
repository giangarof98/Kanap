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
    priceItem.innerHTML = price;
    descriptionItem.innerHTML = description;

    for(let i in colors){
        const arr = document.createElement('option');
        arr.textContent = colors[i];
        select.appendChild(arr)
    }

    itemImg.innerHTML = `<img src="${imageUrl}" alt="Photographie d'un canapé">`
}

//Save Item in localStore
add.addEventListener('click', () => {
    let list = [];
    const local = localStorage.getItem('cart')
    if(local === null){
        list = [];
    } else {
        list = JSON.parse(local)
    }
    
    let productList = {
        imageUrl: product.imageUrl,
        name: product.name,
        id: product._id,
        price: product.price,
        colors: product.colors,
        altTxt: product.altTxt,
        quantity: qty.value
    } 
    list.push(productList);
    localStorage.setItem('cart', JSON.stringify(list));
    console.log(productList);
})

init()