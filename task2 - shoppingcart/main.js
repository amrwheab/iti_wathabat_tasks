const productsDom = document.getElementById('products')
const cartDom = document.getElementById('cart')

window.addEventListener('load', () => {
  initialize()
})

const initialize = () => {
  productsDom.innerHTML = '';
  cartDom.innerHTML = '<p class="cart-empty">Cart is empty</p>';

  let prodCards = ''
  products.map(prod => {
    prodCards += `
    <div class="product-card">
          <div class="img-contain">
            <img src="${prod.image}" alt="">
          </div>
          <div class="card-body">
            <div>
              <h5 class="title">${prod.title.length > 25 ? prod.title.slice(0, 25) : prod.title}</h5>
              <p>${prod.price}$</p>
            </div>
            <div class="btn-contain">
              <button class="btn btn-${prod.carted ? 'danger':'primary'}" onclick="modifyCart(${prod.id})">
                ${prod.carted ? '<img src="remove.svg" alt="cart">' : '<img src="cart.svg" alt="cart">'}
              </button>
            </div>
          </div>
        </div>
    `
  })

  const cartedProds = products.filter(prod => prod.carted)
  let cartCards = ''

  cartedProds.map(prod => {
    cartCards += `
    <div class="product-card">
          <div class="img-contain">
            <img src="${prod.image}" alt="">
          </div>
          <div class="card-body">
            <div>
              <h5 class="title">${prod.title.length > 25 ? prod.title.slice(0, 25) : prod.title}</h5>
              <p>${prod.price}$</p>
            </div>
            <div class="btn-contain">
              <button class="btn btn-danger" onclick="modifyCart(${prod.id})">
                <img src="remove.svg" alt="cart">
              </button>
            </div>
          </div>
        </div>
    `
  })

  productsDom.innerHTML += prodCards
  if (cartCards) {
    cartDom.innerHTML = ''
    cartDom.innerHTML += cartCards
  }
}

const modifyCart = (id) => {
  const product = products.find(prod => prod.id === id)
  if (product.carted) {
    product.carted = false
  } else {
    product.carted = true
  }
  initialize()
}