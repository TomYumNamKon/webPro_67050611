import { Star } from 'lucide-react'
import { currency } from '../data/products.js'

export default function ProductCard({ name, price, currencyCode, image, category, rating, reviews, onAdd, onDetail }) {
  return (
    <article className="panel flex flex-col p-3">
      <div className="product-image h-40 rounded-lg p-3">
        {image ? <img src={image} alt={name} loading="lazy" /> : <div className="grid h-full place-items-center text-slate-500">No image</div>}
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-brand-600">{category}</p>
      <h2 className="mt-1 line-clamp-2 min-h-12 font-bold text-slate-950">{name}</h2>
      <p className="mt-1 font-extrabold text-slate-950">{currency(price, currencyCode)}</p>
      {rating !== null && <p className="mt-2 flex items-center gap-1 text-sm text-slate-500"><Star size={16} className="fill-amber-400 text-amber-400" /> {rating} {reviews !== null && `(${reviews})`}</p>}
      <div className="mt-auto grid gap-2 pt-4">
        <button type="button" onClick={onDetail} className="rounded-lg border border-brand-600 py-2.5 text-sm font-bold text-brand-600 hover:bg-brand-50">View Detail</button>
        <button type="button" onClick={onAdd} className="rounded-lg bg-brand-600 py-2.5 text-sm font-bold text-white hover:bg-brand-700">Add to Cart</button>
      </div>
    </article>
  )
}
