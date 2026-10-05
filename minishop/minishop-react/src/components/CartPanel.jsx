import { ArrowLeft } from 'lucide-react'
import { currency } from '../data/products.js'

export default function CartPanel({ items, onBack }) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  return (
    <section className="fade-in">
      <button type="button" onClick={onBack} className="flex items-center gap-2 text-sm font-semibold text-brand-600"><ArrowLeft size={17} /> Back to Products</button>
      <h1 className="mt-4 text-2xl font-extrabold text-slate-950">Cart</h1>
      {items.length === 0 ? <div className="panel mt-4 p-10 text-center text-slate-600">Your cart is empty.</div> : (
        <div className="panel mt-4 divide-y divide-slate-100 p-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
              {product.image && <img src={product.image} alt="" className="h-16 w-16 object-contain" />}
              <div className="min-w-0 flex-1"><p className="font-semibold text-slate-950">{product.name}</p><p className="text-sm text-slate-600">Qty: {quantity}</p></div>
              <p className="shrink-0 font-bold">{currency(product.price * quantity, product.currencyCode)}</p>
            </div>
          ))}
          <p className="pt-4 text-right text-lg font-extrabold">Total: {currency(total, items[0].product.currencyCode)}</p>
        </div>
      )}
    </section>
  )
}
