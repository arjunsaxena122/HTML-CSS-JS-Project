async function apiCalling() {
    const url = "./product.json"
    const res = await fetch(url)
    const json = await res.json()
    return json
}

async function main() {
    const product = document.getElementById("product")
    const products = await apiCalling()
    product.innerHTML = products.map((product) => `
    <div class = "product-cards" id = "${product.product_id}">
    <img src= "${product.image}" alt= "${product.name}">
    <h1 class= "product-name">${product.name}</h1>
    <p class = "product-description">${product.description}</p>
    <div class= "product-price">${product.currency}:${product.price}</div>
    <button class="btn-buy-now">Buy now</button>
    <button class="btn-add-to-cart">Add to cart</button>
    </div>
    `).join("")

}

main()