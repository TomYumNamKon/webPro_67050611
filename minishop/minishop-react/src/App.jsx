import { useEffect, useMemo, useState } from 'react'
import { Box, Home, UserRound } from 'lucide-react'
import Header from './components/Header.jsx'
import Dashboard from './components/Dashboard.jsx'
import ProductList from './components/ProductList.jsx'
import ProductDetail from './components/ProductDetail.jsx'
import Profile from './components/Profile.jsx'
import CartPanel from './components/CartPanel.jsx'
import { normalizeProduct } from './data/products.js'
import { sampleProducts } from './data/sampleProducts.js'

const categories = ['All', 'Computer', 'Audio', 'Fashion', 'Gadget', 'Other']

function Sidebar({ page, onNavigate }) {
  const links = [
    ['dashboard', 'Dashboard', Home],
    ['products', 'Products', Box],
    ['profile', 'Profile', UserRound],
  ]
  return (
    <aside className="bg-white p-2 md:w-48 md:border-r md:border-slate-200 md:p-3">
      <nav className="mobile-scroll flex gap-1 overflow-x-auto md:flex-col" aria-label="Main navigation">
        {links.map(([id, label, Icon]) => (
          <button key={id} type="button" onClick={() => onNavigate(id)} aria-current={page === id ? 'page' : undefined}
            className={`flex shrink-0 items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${page === id ? 'bg-brand-50 text-brand-600' : 'text-slate-700 hover:bg-slate-50'}`}>
            <Icon size={19} /> {label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default function App() {
  const [page, setPage] = useState('products')
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [sort, setSort] = useState('default')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)
  const [notice, setNotice] = useState('')
  const [sampleMode, setSampleMode] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')

    async function loadProducts() {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=0', { signal: controller.signal })
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const data = await response.json()
        if (!data || !Array.isArray(data.products)) throw new Error('Invalid product response')
        const validProducts = data.products.map(normalizeProduct).filter(Boolean)
        if (data.products.length && !validProducts.length) throw new Error('No valid products in response')
        setProducts(validProducts)
        setSampleMode(false)
      } catch (cause) {
        if (controller.signal.aborted) return
        console.error('Failed to load products:', cause)
        setError('ไม่สามารถโหลดข้อมูลได้')
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadProducts()
    return () => controller.abort()
  }, [retry])

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase()
    const result = products.filter(product =>
      product.name.toLowerCase().includes(term) && (category === 'All' || product.category === category)
    )
    if (sort === 'low') result.sort((a, b) => a.price - b.price)
    if (sort === 'high') result.sort((a, b) => b.price - a.price)
    return result
  }, [products, search, category, sort])

  function addToCart(product, quantity = 1) {
    setCartItems(items => {
      const existing = items.find(item => item.product.id === product.id)
      return existing
        ? items.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
        : [...items, { product, quantity }]
    })
    setCartCount(count => count + quantity)
    setNotice(`${product.name} added to cart`)
    window.setTimeout(() => setNotice(''), 2200)
  }

  function openDetail(product) {
    setSelectedProduct(product)
    setPage('detail')
  }

  function useSampleProducts() {
    setProducts(sampleProducts)
    setSampleMode(true)
    setError('')
  }

  return (
    <div className="min-h-screen bg-slate-50 sm:p-5 lg:p-8">
      <div className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/60 sm:rounded-xl">
        <Header cartCount={cartCount} onHome={() => setPage('products')} onCart={() => setPage('cart')} />
        <div className="flex min-h-[calc(100vh-8rem)] flex-col md:flex-row">
          <Sidebar page={page} onNavigate={setPage} />
          <main className="min-w-0 flex-1 bg-[#f7f9fc] p-4 sm:p-6">
            {page === 'dashboard' && <Dashboard productCount={products.length} cartCount={cartCount} loading={loading} error={error} sampleMode={sampleMode} onBrowse={() => setPage('products')} />}
            {page === 'products' && (
              <section className="fade-in">
                <h1 className="text-2xl font-extrabold text-slate-950">Products</h1>
                {sampleMode && <p role="status" className="mt-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900">Showing workshop sample products because the API is unavailable. Refresh to try the API again.</p>}
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_170px_220px]">
                  <label><span className="sr-only">Search products</span><input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search product..." className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" /></label>
                  <label><span className="sr-only">Category</span><select value={category} onChange={event => setCategory(event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500">{categories.map(item => <option key={item}>{item}</option>)}</select></label>
                  <label><span className="sr-only">Sort products</span><select value={sort} onChange={event => setSort(event.target.value)} className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500"><option value="default">Default order</option><option value="low">Price: Low → High</option><option value="high">Price: High → Low</option></select></label>
                </div>
                {loading ? <div role="status" className="panel mt-4 p-10 text-center">Loading products...</div>
                  : error ? <div role="alert" className="panel mt-4 p-10 text-center text-red-700"><p>{error}</p><div className="mt-4 flex flex-wrap justify-center gap-2"><button type="button" onClick={() => setRetry(value => value + 1)} className="rounded-lg bg-brand-600 px-4 py-2 font-semibold text-white">Try again</button><button type="button" onClick={useSampleProducts} className="rounded-lg border border-brand-600 px-4 py-2 font-semibold text-brand-600">Use sample products</button></div></div>
                    : filteredProducts.length === 0 ? <div role="status" className="panel mt-4 p-10 text-center">ไม่พบสินค้าที่ค้นหา</div>
                      : <ProductList products={filteredProducts} onAdd={addToCart} onDetail={openDetail} />}
              </section>
            )}
            {page === 'detail' && selectedProduct && <ProductDetail product={selectedProduct} onBack={() => setPage('products')} onAdd={addToCart} />}
            {page === 'cart' && <CartPanel items={cartItems} onBack={() => setPage('products')} />}
            {page === 'profile' && <Profile />}
          </main>
        </div>
      </div>
      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-xl">{notice}</div>}
    </div>
  )
}
