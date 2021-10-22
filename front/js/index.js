let url = 'http://localhost:3000/api/products';
const section = document.getElementById('items');

//Fetch Api and invoke information
async function getItems(){
    const res = await fetch(url)
    const data = await res.json()

    for(let i = 0; i < data.length; i++){
        let id = data[i]._id;
        let name = data[i].name;
        let colors = data[i].colors;
        let description = data[i].description;
        let altTxt = data[i].altTxt;
        let img = data[i].imageUrl;
        let price = data[i].price;
        console.log(id)
        
        let a = document.createElement('a');


        a.innerHTML = `
        <a href="./product.html?id=${id}">
            <article>
              <img src="${img}" alt="${altTxt}">
              <h3 class="${name}">Kanap name1</h3>
              <p class="productDescription">${description}</p>
            </article>
          </a>
        `
        section.appendChild(a)

    }
}

getItems()
