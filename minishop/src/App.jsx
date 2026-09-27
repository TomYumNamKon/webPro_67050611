import { useMemo, useState } from 'react'
import {
  Bell, Bitcoin, Box, ChevronDown, CircleUserRound, Home, Mail,
  Minus, Package, Pencil, Plus, Search, ShoppingCart, Star, Trophy,
  UserRound, WalletCards,
} from 'lucide-react'

const products = [
  { id: 1, name: 'Laptop', price: 12900, rating: '4.3', reviews: 24, category: 'Electronics', image: '/products/laptop.png' },
  { id: 2, name: 'Headphones', price: 1290, rating: '4.3', reviews: 18, category: 'Audio', image: '/products/headphones.png' },
  { id: 3, name: 'Backpack', price: 890, rating: '4.7', reviews: 32, category: 'Accessories', image: '/products/backpack.png' },
  { id: 4, name: 'Smart Watch', price: 2990, rating: '4.4', reviews: 20, category: 'Electronics', image: '/products/watch.png' },
]

const orders = [
  ['1', '2025-09-15', 'Somchai J.', '3', '฿1,260', 'Completed', 'green'],
  ['2', '2025-09-14', 'Nattaya K.', '1', '฿520', 'Processing', 'blue'],
  ['3', '2025-09-13', 'Kritsada P.', '2', '฿980', 'Shipped', 'purple'],
  ['4', '2025-09-12', 'Piyaporn S.', '1', '฿450', 'Completed', 'green'],
  ['5', '2025-09-11', 'Thanawat C.', '4', '฿1,800', 'Pending', 'amber'],
]

const currency = (value) => `฿${value.toLocaleString('en-US')}`

function Header({ cartCount, onCart }) {
  return (
    <header className="h-16 border-b border-slate-200 bg-white px-5 sm:px-7 flex items-center justify-between">
      <button className="text-xl font-extrabold text-brand-600 tracking-tight" onClick={() => location.reload()} aria-label="MiniShop home">MiniShop</button>
      <div className="flex items-center gap-5 text-slate-600">
        <button aria-label="Search"><Search size={21} /></button>
        <button className="relative" onClick={onCart} aria-label={`Cart with ${cartCount} items`}>
          <ShoppingCart size={22} />
          <span className="absolute -right-2.5 -top-2.5 min-w-5 h-5 px-1 rounded-full bg-brand-600 text-[11px] font-bold text-white grid place-items-center">{cartCount}</span>
        </button>
        <button aria-label="Profile"><CircleUserRound size={23} className="text-slate-400" /></button>
      </div>
    </header>
  )
}

function Sidebar({ page, setPage }) {
  const links = [
    ['dashboard', 'Dashboard', Home],
    ['products', 'Products', Box],
    ['profile', 'Profile', UserRound],
  ]
  return (
    <aside className="md:w-48 md:border-r border-slate-200 bg-white p-2 md:p-3">
      <nav className="flex md:flex-col gap-1 overflow-x-auto mobile-scroll" aria-label="Main navigation">
        {links.map(([id, label, Icon]) => (
          <button key={id} onClick={() => setPage(id)} className={`shrink-0 flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${page === id ? 'bg-brand-50 text-brand-600' : 'text-slate-700 hover:bg-slate-50'}`}>
            <Icon size={19} /> {label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

function StatCard({ label, value, icon: Icon, tone, valueClass = 'text-brand-600' }) {
  return (
    <article className="panel p-4 flex items-center gap-4 min-h-24">
      <div className={`w-12 h-12 rounded-full grid place-items-center ${tone}`}><Icon size={25} /></div>
      <div><p className="text-sm text-slate-600">{label}</p><p className={`text-2xl font-extrabold mt-1 ${valueClass}`}>{value}</p></div>
    </article>
  )
}

function Dashboard() {
  return (
    <section className="fade-in">
      <h1 className="text-2xl font-extrabold text-slate-950">Dashboard</h1>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Total Products" value="24" icon={Package} tone="soft-blue text-brand-600" />
        <StatCard label="Orders" value="128" icon={ShoppingCart} tone="soft-green text-emerald-600" valueClass="text-emerald-700" />
        <StatCard label="Revenue" value="฿48,500" icon={Bitcoin} tone="soft-purple text-violet-600" valueClass="text-violet-700" />
      </div>
      <article className="panel mt-4 p-4 overflow-hidden">
        <h2 className="text-lg font-bold text-slate-950">Recent Orders</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[620px] text-sm text-left">
            <thead className="bg-slate-50 text-slate-600"><tr>{['#', 'Date', 'Customer', 'Items', 'Total', 'Status'].map(x => <th className="px-3 py-3 font-semibold" key={x}>{x}</th>)}</tr></thead>
            <tbody>{orders.map(([id, date, customer, items, total, status, tone]) => (
              <tr key={id} className="border-b border-slate-100 last:border-0">
                {[id, date, customer, items, total].map((x, i) => <td className="px-3 py-3" key={i}>{x}</td>)}
                <td className="px-3 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${tone === 'green' ? 'bg-emerald-100 text-emerald-700' : tone === 'blue' ? 'bg-blue-100 text-blue-700' : tone === 'purple' ? 'bg-violet-100 text-violet-700' : 'bg-amber-100 text-amber-700'}`}>{status}</span></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </article>
    </section>
  )
}

function ProductCard({ product, onAdd }) {
  return (
    <article className="panel p-3 flex flex-col">
      <div className="product-image h-40 rounded-lg p-3"><img src={product.image} alt={product.name} /></div>
      <h2 className="font-bold text-slate-950 mt-3">{product.name}</h2>
      <p className="font-extrabold text-slate-950 mt-1">{currency(product.price)}</p>
      <p className="text-sm text-slate-500 mt-2 flex items-center gap-1"><Star size={16} className="fill-amber-400 text-amber-400" /> {product.rating} ({product.reviews})</p>
      <button onClick={() => onAdd(product)} className="mt-4 w-full rounded-lg bg-brand-600 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2">Add to Cart</button>
    </article>
  )
}

function Products({ onAdd }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All Categories')
  const filtered = useMemo(() => products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) && (category === 'All Categories' || p.category === category)), [query, category])
  return (
    <section className="fade-in">
      <h1 className="text-2xl font-extrabold text-slate-950">Products</h1>
      <div className="mt-4 grid sm:grid-cols-[1fr_220px] gap-3">
        <label className="relative"><Search size={19} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" /><span className="sr-only">Search products</span><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search products..." className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-11 pr-4 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100" /></label>
        <label className="relative"><span className="sr-only">Category</span><select value={category} onChange={e => setCategory(e.target.value)} className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brand-500"><option>All Categories</option><option>Electronics</option><option>Audio</option><option>Accessories</option></select><ChevronDown size={18} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" /></label>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filtered.map(p => <ProductCard product={p} onAdd={onAdd} key={p.id} />)}
      </div>
      {!filtered.length && <div className="panel mt-4 py-12 text-center text-slate-500">No products found.</div>}
    </section>
  )
}

function Profile() {
  const summary = [
    ['Total Orders', '128', ShoppingCart, 'soft-blue text-brand-600'],
    ['Total Spent', '฿48,500', Bitcoin, 'soft-purple text-violet-600'],
    ['Wishlist Items', '6', Box, 'soft-green text-emerald-600'],
    ['Loyalty Points', '320', Trophy, 'soft-gold text-amber-600'],
  ]
  return (
    <section className="fade-in">
      <h1 className="text-2xl font-extrabold text-slate-950">Profile</h1>
      <div className="mt-4 grid lg:grid-cols-[1fr_1.15fr] gap-4">
        <article className="panel p-6 text-center flex flex-col items-center justify-center">
          <div className="w-28 h-28 rounded-full soft-blue grid place-items-center"><UserRound size={60} className="text-brand-500" /></div>
          <h2 className="mt-5 text-xl font-extrabold text-slate-950">Alex Student</h2>
          <p className="mt-4 flex items-center gap-3 text-slate-600"><Mail size={18} /> alex@email.com</p>
          <p className="mt-3 flex items-center gap-3 text-slate-600"><WalletCards size={18} /> Student ID: 6501234567</p>
          <button className="mt-6 w-full rounded-lg bg-brand-600 py-3 font-bold text-white hover:bg-brand-700 flex items-center justify-center gap-2"><Pencil size={17} /> Edit Profile</button>
        </article>
        <article className="panel p-5">
          <h2 className="font-bold text-slate-950">Account Summary</h2>
          <div className="grid sm:grid-cols-2 gap-4 mt-5">
            {summary.map(([label, value, Icon, tone]) => <div key={label} className={`${tone} rounded-xl p-4 min-h-32`}><Icon size={24} /><p className="text-sm text-slate-600 mt-3">{label}</p><p className="text-xl font-extrabold text-slate-950 mt-1">{value}</p></div>)}
          </div>
        </article>
      </div>
    </section>
  )
}

function ProductDetail({ quantity, setQuantity, onAdd }) {
  return (
    <section className="fade-in">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950">React Workshop</h1>
      <p className="text-lg text-slate-600 mt-1">ลองใช้งาน React กับ Tailwind CSS</p>
      <p className="text-sm text-slate-500 mt-1">เพิ่มจำนวนสินค้าในตะกร้า และดูจำนวนสินค้าที่เลือกได้ที่ไอคอนตะกร้า</p>
      <article className="panel mt-6 p-4 md:p-5 grid md:grid-cols-[260px_1fr] gap-6 items-center">
        <div className="product-image h-56 rounded-lg p-4"><img src="/products/sport-shoes.png" alt="White and blue sport shoes" /></div>
        <div>
          <h2 className="text-xl font-extrabold text-slate-950">Sport Shoes</h2>
          <p className="text-2xl font-extrabold text-slate-950 mt-2">฿1,590</p>
          <p className="mt-2 flex items-center gap-1 text-slate-500"><Star size={18} className="fill-amber-400 text-amber-400" /> 4.6 (15)</p>
          <div className="mt-5 flex items-center gap-3">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-11 h-11 rounded-lg bg-brand-600 text-white grid place-items-center hover:bg-brand-700" aria-label="Decrease quantity"><Minus size={19} /></button>
            <output className="w-16 h-11 rounded-lg border border-slate-200 bg-white grid place-items-center font-bold">{quantity}</output>
            <button onClick={() => setQuantity(q => q + 1)} className="w-11 h-11 rounded-lg bg-brand-600 text-white grid place-items-center hover:bg-brand-700" aria-label="Increase quantity"><Plus size={19} /></button>
          </div>
          <button onClick={() => onAdd(null, quantity)} className="mt-4 w-full rounded-lg bg-brand-600 py-3 font-bold text-white hover:bg-brand-700 flex items-center justify-center gap-2"><ShoppingCart size={19} /> Add to Cart</button>
        </div>
      </article>
    </section>
  )
}

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [cartCount, setCartCount] = useState(2)
  const [quantity, setQuantity] = useState(1)
  const [notice, setNotice] = useState('')

  const addToCart = (product, amount = 1) => {
    setCartCount(count => count + amount)
    setNotice(`${product?.name ?? 'Sport Shoes'} added to cart`)
    window.setTimeout(() => setNotice(''), 1800)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-0 sm:p-5 lg:p-8">
      <div className="mx-auto max-w-7xl min-h-[calc(100vh-4rem)] overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-200/60 sm:rounded-xl">
        <Header cartCount={cartCount} onCart={() => setPage('detail')} />
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-8rem)]">
          <Sidebar page={page} setPage={setPage} />
          <main className="flex-1 bg-[#f7f9fc] p-4 sm:p-6">
            {page === 'dashboard' && <Dashboard />}
            {page === 'products' && <Products onAdd={addToCart} />}
            {page === 'profile' && <Profile />}
            {page === 'detail' && <ProductDetail quantity={quantity} setQuantity={setQuantity} onAdd={addToCart} />}
          </main>
        </div>
      </div>
      {notice && <div role="status" className="fixed bottom-5 left-1/2 -translate-x-1/2 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-xl">{notice}</div>}
    </div>
  )
}
