import './style.css'

// Week 3: Vite + Vanilla JavaScript + Tailwind CSS. React is introduced later.
const products = [
  { id: 1, name: 'Laptop', price: 12900, rating: '4.3', reviews: 24, category: 'Electronics', image: '/products/laptop.png' },
  { id: 2, name: 'Headphones', price: 1290, rating: '4.3', reviews: 18, category: 'Audio', image: '/products/headphones.png' },
  { id: 3, name: 'Backpack', price: 890, rating: '4.7', reviews: 32, category: 'Accessories', image: '/products/backpack.png' },
  { id: 4, name: 'Smart Watch', price: 2990, rating: '4.4', reviews: 20, category: 'Electronics', image: '/products/watch.png' },
  { id: 5, name: 'Sport Shoes', price: 1590, rating: '4.6', reviews: 15, category: 'Accessories', image: '/products/sport-shoes.png' },
]

const orders = [
  ['1', '2025-09-15', 'Somchai J.', '3', '฿1,260', 'Completed', 'bg-emerald-100 text-emerald-700'],
  ['2', '2025-09-14', 'Nattaya K.', '1', '฿520', 'Processing', 'bg-blue-100 text-blue-700'],
  ['3', '2025-09-13', 'Kritsada P.', '2', '฿980', 'Shipped', 'bg-violet-100 text-violet-700'],
  ['4', '2025-09-12', 'Piyaporn S.', '1', '฿450', 'Completed', 'bg-emerald-100 text-emerald-700'],
  ['5', '2025-09-11', 'Thanawat C.', '4', '฿1,800', 'Pending', 'bg-amber-100 text-amber-700'],
]

const app = document.querySelector('#app')
let page = 'dashboard'
let cartCount = 0
let search = ''
let category = 'All Categories'
let selectedProduct = products[4]
let quantity = 1
let editingProfile = false
let profileData = { name: 'Alex Student', email: 'alex@email.com', studentId: '6501234567' }

const money = value => `฿${value.toLocaleString('en-US')}`
const escapeAttribute = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

function header() {
  return `
    <header class="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-7">
      <button type="button" data-page="dashboard" class="text-xl font-extrabold tracking-tight text-brand-600">MiniShop</button>
      <div class="flex items-center gap-5 text-slate-600">
        <button type="button" data-page="products" aria-label="Search products" class="text-xl">⌕</button>
        <button type="button" id="cart-button" aria-label="Cart with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}" class="relative text-xl">🛒<span id="cart-count" class="absolute -right-2.5 -top-2.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white">${cartCount}</span></button>
        <button type="button" data-page="profile" aria-label="Profile" class="text-xl">◉</button>
      </div>
    </header>`
}

function sidebar() {
  const links = [
    ['dashboard', '⌂', 'Dashboard'],
    ['products', '▣', 'Products'],
    ['profile', '♙', 'Profile'],
  ]
  return `
    <aside class="bg-white p-2 md:w-48 md:border-r md:border-slate-200 md:p-3">
      <nav class="flex gap-1 overflow-x-auto md:flex-col" aria-label="Main navigation">
        ${links.map(([id, icon, label]) => `<button type="button" data-page="${id}" ${(page === id || (page === 'detail' && id === 'products')) ? 'aria-current="page"' : ''} class="flex shrink-0 items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium ${(page === id || (page === 'detail' && id === 'products')) ? 'bg-brand-50 text-brand-600' : 'text-slate-700 hover:bg-slate-50'}"><span aria-hidden="true" class="text-lg">${icon}</span>${label}</button>`).join('')}
      </nav>
    </aside>`
}

function dashboard() {
  const stats = [
    ['Total Products', '24', '▣', 'bg-blue-100 text-brand-600'],
    ['Orders', '128', '🛒', 'bg-emerald-100 text-emerald-700'],
    ['Revenue', '฿48,500', '฿', 'bg-violet-100 text-violet-700'],
  ]
  return `
    <section>
      <h1 class="text-2xl font-extrabold text-slate-950">Dashboard</h1>
      <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${stats.map(([label, value, icon, tone]) => `<article class="panel flex min-h-24 items-center gap-4 p-4"><div class="grid h-12 w-12 place-items-center rounded-full text-2xl ${tone}">${icon}</div><div><p class="text-sm text-slate-600">${label}</p><p class="mt-1 text-2xl font-extrabold text-slate-950">${value}</p></div></article>`).join('')}
      </div>
      <article class="panel mt-4 overflow-hidden p-4">
        <h2 class="text-lg font-bold text-slate-950">Recent Orders</h2>
        <div class="mt-3 overflow-x-auto"><table class="w-full min-w-[620px] text-left text-sm"><thead class="bg-slate-50 text-slate-600"><tr>${['#', 'Date', 'Customer', 'Items', 'Total', 'Status'].map(label => `<th class="px-3 py-3 font-semibold">${label}</th>`).join('')}</tr></thead><tbody>${orders.map(([id, date, customer, items, total, status, tone]) => `<tr class="border-b border-slate-100 last:border-0"><td class="px-3 py-3">${id}</td><td class="px-3 py-3">${date}</td><td class="px-3 py-3">${customer}</td><td class="px-3 py-3">${items}</td><td class="px-3 py-3">${total}</td><td class="px-3 py-3"><span class="rounded-full px-2.5 py-1 text-xs font-medium ${tone}">${status}</span></td></tr>`).join('')}</tbody></table></div>
      </article>
    </section>`
}

function productCard(product) {
  return `<article class="panel flex flex-col p-3">
    <div class="product-image h-40 rounded-lg p-3"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
    <h2 class="mt-3 font-bold text-slate-950">${product.name}</h2>
    <p class="mt-1 font-extrabold text-slate-950">${money(product.price)}</p>
    <p class="mt-2 text-sm text-slate-500"><span class="text-amber-500">★</span> ${product.rating} (${product.reviews})</p>
    <div class="mt-4 grid gap-2"><button type="button" data-detail="${product.id}" class="w-full rounded-lg border border-brand-600 py-2.5 text-sm font-bold text-brand-600 hover:bg-brand-50">View Details</button>
    <button type="button" data-add="${product.id}" class="w-full rounded-lg bg-brand-600 py-2.5 text-sm font-bold text-white hover:bg-brand-700">Add to Cart</button></div>
  </article>`
}

function productsPage() {
  return `
    <section>
      <h1 class="text-2xl font-extrabold text-slate-950">Products</h1>
      <div class="mt-4 grid gap-3 sm:grid-cols-[1fr_220px]">
        <label><span class="sr-only">Search products</span><input id="search" type="search" value="${escapeAttribute(search)}" placeholder="Search products..." class="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500"></label>
        <label><span class="sr-only">Category</span><select id="category" class="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500">${['All Categories', 'Electronics', 'Audio', 'Accessories'].map(value => `<option ${category === value ? 'selected' : ''}>${value}</option>`).join('')}</select></label>
      </div>
      <div id="product-list" class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"></div>
      <p id="empty-state" class="panel mt-4 hidden p-10 text-center text-slate-600">No products found.</p>
    </section>`
}

function profile() {
  const summary = [
    ['Total Orders', '128', 'bg-blue-50'],
    ['Total Spent', '฿48,500', 'bg-violet-50'],
    ['Wishlist Items', '6', 'bg-emerald-50'],
    ['Loyalty Points', '320', 'bg-amber-50'],
  ]
  return `
    <section>
      <h1 class="text-2xl font-extrabold text-slate-950">Profile</h1>
      <div class="mt-4 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <article class="panel flex flex-col items-center justify-center p-6 text-center">
          <div class="grid h-28 w-28 place-items-center rounded-full bg-blue-100 text-5xl text-brand-600">◉</div>
          <h2 class="mt-5 text-xl font-extrabold text-slate-950">${escapeAttribute(profileData.name)}</h2>
          <p class="mt-4 text-slate-600">✉ ${escapeAttribute(profileData.email)}</p>
          <p class="mt-3 text-slate-600">Student ID: ${escapeAttribute(profileData.studentId)}</p>
          <button type="button" data-edit-profile class="mt-5 w-full rounded-lg bg-brand-600 py-2.5 font-bold text-white hover:bg-brand-700">Edit Profile</button>
        </article>
        <article class="panel p-5"><h2 class="font-bold text-slate-950">Account Summary</h2><div class="mt-5 grid gap-4 sm:grid-cols-2">${summary.map(([label, value, tone]) => `<div class="min-h-32 rounded-xl p-4 ${tone}"><p class="mt-3 text-sm text-slate-600">${label}</p><p class="mt-1 text-xl font-extrabold text-slate-950">${value}</p></div>`).join('')}</div></article>
      </div>
      ${editingProfile ? `<form id="profile-form" class="panel mt-4 grid gap-4 p-5 sm:grid-cols-2"><h2 class="sm:col-span-2 text-lg font-bold">Edit Profile</h2><label class="grid gap-1 text-sm font-medium">Name<input name="name" required value="${escapeAttribute(profileData.name)}" class="rounded-lg border border-slate-300 p-2"></label><label class="grid gap-1 text-sm font-medium">Email<input name="email" type="email" required value="${escapeAttribute(profileData.email)}" class="rounded-lg border border-slate-300 p-2"></label><label class="grid gap-1 text-sm font-medium">Student ID<input name="studentId" required value="${escapeAttribute(profileData.studentId)}" class="rounded-lg border border-slate-300 p-2"></label><div class="flex items-end gap-2"><button type="submit" class="rounded-lg bg-brand-600 px-5 py-2.5 font-bold text-white">Save</button><button type="button" data-cancel-profile class="rounded-lg border border-slate-300 px-5 py-2.5">Cancel</button></div></form>` : ''}
    </section>`
}

function productDetail() {
  const product = selectedProduct
  return `<section>
    <button type="button" data-page="products" class="text-sm font-semibold text-brand-600">← Back to Products</button>
    <h1 class="mt-3 text-2xl font-extrabold text-slate-950">Product Details</h1>
    <p class="mt-1 text-sm text-slate-600">Choose a quantity, then add the product to your cart.</p>
    <article class="panel mt-5 grid gap-5 p-4 sm:grid-cols-2">
      <div class="product-image h-64 rounded-lg p-5"><img src="${product.image}" alt="${product.name}"></div>
      <div class="flex flex-col justify-center"><h2 class="text-xl font-extrabold">${product.name}</h2><p class="mt-2 text-2xl font-bold">${money(product.price)}</p><p class="mt-3 text-sm text-slate-600"><span class="text-amber-500">★</span> ${product.rating} (${product.reviews})</p>
      <div class="mt-5 flex items-center gap-2"><button type="button" data-quantity="decrease" aria-label="Decrease quantity" class="rounded-lg bg-brand-600 px-4 py-2 font-bold text-white">−</button><output id="quantity" class="min-w-14 rounded-lg border border-slate-200 px-4 py-2 text-center">${quantity}</output><button type="button" data-quantity="increase" aria-label="Increase quantity" class="rounded-lg bg-brand-600 px-4 py-2 font-bold text-white">+</button></div>
      <button type="button" data-add-detail class="mt-4 rounded-lg bg-brand-600 px-5 py-3 font-bold text-white hover:bg-brand-700">🛒 Add to Cart</button><p id="cart-message" role="status" class="mt-2 text-sm text-emerald-700"></p></div>
    </article>
  </section>`
}

function renderProducts() {
  if (page !== 'products') return
  const filtered = products.filter(product => product.name.toLowerCase().includes(search.trim().toLowerCase()) && (category === 'All Categories' || product.category === category))
  document.querySelector('#product-list').innerHTML = filtered.map(productCard).join('')
  document.querySelector('#empty-state').classList.toggle('hidden', filtered.length > 0)
}

function render() {
  app.innerHTML = `
    <div class="min-h-screen bg-slate-50 sm:p-5 lg:p-8">
      <div class="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/60 sm:rounded-xl">
        ${header()}
        <div class="flex min-h-[calc(100vh-8rem)] flex-col md:flex-row">
          ${sidebar()}
          <main class="min-w-0 flex-1 bg-[#f7f9fc] p-4 sm:p-6">${page === 'dashboard' ? dashboard() : page === 'products' ? productsPage() : page === 'detail' ? productDetail() : profile()}</main>
        </div>
      </div>
    </div>`
  renderProducts()
}

app.addEventListener('click', event => {
  const navigation = event.target.closest('[data-page]')
  if (navigation) {
    page = navigation.dataset.page
    render()
    if (event.target.getAttribute('aria-label') === 'Search products') document.querySelector('#search')?.focus()
    return
  }

  const detailButton = event.target.closest('[data-detail]')
  if (detailButton) {
    selectedProduct = products.find(product => product.id === Number(detailButton.dataset.detail))
    quantity = 1
    page = 'detail'
    render()
    return
  }

  const quantityButton = event.target.closest('[data-quantity]')
  if (quantityButton) {
    quantity = Math.max(1, quantity + (quantityButton.dataset.quantity === 'increase' ? 1 : -1))
    document.querySelector('#quantity').textContent = quantity
    return
  }

  if (event.target.closest('[data-edit-profile]')) {
    editingProfile = true
    render()
    document.querySelector('[name="name"]')?.focus()
    return
  }

  if (event.target.closest('[data-cancel-profile]')) {
    editingProfile = false
    render()
    return
  }

  if (event.target.closest('[data-add], [data-add-detail]')) {
    cartCount += event.target.closest('[data-add-detail]') ? quantity : 1
    document.querySelector('#cart-count').textContent = cartCount
    document.querySelector('#cart-button').setAttribute('aria-label', `Cart with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`)
    const message = document.querySelector('#cart-message')
    if (message) message.textContent = `Added ${quantity} ${selectedProduct.name} to cart.`
  }
})

app.addEventListener('submit', event => {
  if (event.target.id !== 'profile-form') return
  event.preventDefault()
  const data = new FormData(event.target)
  profileData = {
    name: String(data.get('name')).trim(),
    email: String(data.get('email')).trim(),
    studentId: String(data.get('studentId')).trim(),
  }
  editingProfile = false
  render()
})

app.addEventListener('input', event => {
  if (event.target.id === 'search') {
    search = event.target.value
    renderProducts()
  }
})

app.addEventListener('change', event => {
  if (event.target.id === 'category') {
    category = event.target.value
    renderProducts()
  }
})

render()
