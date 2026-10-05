import { CircleUserRound, ShoppingCart } from 'lucide-react'

export default function Header({ cartCount, onHome, onCart }) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-7">
      <button type="button" onClick={onHome} className="text-xl font-extrabold tracking-tight text-brand-600" aria-label="MiniShop products">MiniShop</button>
      <div className="flex items-center gap-5 text-slate-600">
        <button type="button" onClick={onCart} className="relative" aria-label={`Cart with ${cartCount} ${cartCount === 1 ? 'item' : 'items'}`}>
          <ShoppingCart size={22} />
          <span className="absolute -right-2.5 -top-2.5 grid h-5 min-w-5 place-items-center rounded-full bg-brand-600 px-1 text-[11px] font-bold text-white">{cartCount}</span>
        </button>
        <CircleUserRound size={23} className="text-slate-400" aria-hidden="true" />
      </div>
    </header>
  )
}
