import { useState } from 'react'
import { ArrowLeft, Minus, Plus, ShoppingCart, Star } from 'lucide-react'
import { currency } from '../data/products.js'

export default function ProductDetail({ product, onBack, onAdd }) {
  const [quantity, setQuantity] = useState(1)
  return (
    <section className="fade-in">
      <button type="button" onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-brand-600"><ArrowLeft size={17} /> Back to Products</button>
      <article className="panel mt-4 grid gap-6 p-4 md:grid-cols-[minmax(220px,320px)_1fr] md:p-6">
        <div className="product-image h-72 rounded-lg p-6">{product.image ? <img src={product.image} alt={product.name} /> : <div className="grid h-full place-items-center">No image</div>}</div>
        <div>
          <p className="text-sm font-semibold text-brand-600">{product.category}</p>
          <h1 className="mt-2 text-2xl font-extrabold text-slate-950">{product.name}</h1>
          <p className="mt-3 text-2xl font-extrabold">{currency(product.price, product.currencyCode)}</p>
          {product.rating !== null && <p className="mt-3 flex items-center gap-1 text-slate-600"><Star size={18} className="fill-amber-400 text-amber-400" /> {product.rating} {product.reviews !== null && `(${product.reviews} reviews)`}</p>}
          <p className="mt-4 leading-relaxed text-slate-600">{product.description || 'No description available.'}</p>
          <div className="mt-5 flex items-center gap-3">
            <button type="button" onClick={() => setQuantity(value => Math.max(1, value - 1))} aria-label="Decrease quantity" className="grid h-11 w-11 place-items-center rounded-lg bg-brand-600 text-white"><Minus size={19} /></button>
            <output className="grid h-11 w-16 place-items-center rounded-lg border border-slate-200 bg-white font-bold">{quantity}</output>
            <button type="button" onClick={() => setQuantity(value => value + 1)} aria-label="Increase quantity" className="grid h-11 w-11 place-items-center rounded-lg bg-brand-600 text-white"><Plus size={19} /></button>
          </div>
          <button type="button" onClick={() => onAdd(product, quantity)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 py-3 font-bold text-white hover:bg-brand-700"><ShoppingCart size={19} /> Add to Cart</button>
        </div>
      </article>
    </section>
  )
}
