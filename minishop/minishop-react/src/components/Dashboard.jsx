import { Bitcoin, Box, Package, ShoppingCart } from 'lucide-react'

const sampleOrders = [
  ['1', '2025-09-15', 'Somchai J.', '3', '฿1,260', 'Completed', 'bg-emerald-100 text-emerald-700'],
  ['2', '2025-09-14', 'Nattaya K.', '1', '฿520', 'Processing', 'bg-blue-100 text-blue-700'],
  ['3', '2025-09-13', 'Kritsada P.', '2', '฿980', 'Shipped', 'bg-violet-100 text-violet-700'],
  ['4', '2025-09-12', 'Piyaporn S.', '1', '฿450', 'Completed', 'bg-emerald-100 text-emerald-700'],
  ['5', '2025-09-11', 'Thanawat C.', '4', '฿1,800', 'Pending', 'bg-amber-100 text-amber-700'],
]

function StatCard({ label, value, icon: Icon, tone }) {
  return <article className="panel flex min-h-24 items-center gap-4 p-4"><div className={`grid h-12 w-12 place-items-center rounded-full ${tone}`}><Icon size={25} /></div><div><p className="text-sm text-slate-600">{label}</p><p className="mt-1 text-2xl font-extrabold text-slate-950">{value}</p></div></article>
}

export default function Dashboard({ productCount, cartCount, loading, error, sampleMode, onBrowse }) {
  return (
    <section className="fade-in">
      <h1 className="text-2xl font-extrabold text-slate-950">Dashboard</h1>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard label={sampleMode ? 'Sample Products' : 'Products from API'} value={loading ? '…' : error ? 'Unavailable' : productCount} icon={Package} tone="soft-blue text-brand-600" />
        <StatCard label="Items in Cart" value={cartCount} icon={ShoppingCart} tone="soft-green text-emerald-600" />
        <StatCard label="Sample Revenue" value="฿48,500" icon={Bitcoin} tone="soft-purple text-violet-600" />
      </div>
      <article className="panel mt-4 overflow-hidden p-4">
        <div className="flex flex-wrap items-center justify-between gap-2"><div><h2 className="text-lg font-bold text-slate-950">Recent Orders</h2><p className="text-xs text-slate-500">Sample data from the previous dashboard</p></div><button type="button" onClick={onBrowse} className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-bold text-white hover:bg-brand-700">Browse Products</button></div>
        <div className="mt-3 overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm"><thead className="bg-slate-50 text-slate-600"><tr>{['#', 'Date', 'Customer', 'Items', 'Total', 'Status'].map(label => <th key={label} className="px-3 py-3 font-semibold">{label}</th>)}</tr></thead><tbody>{sampleOrders.map(([id, date, customer, items, total, status, tone]) => <tr key={id} className="border-b border-slate-100 last:border-0"><td className="px-3 py-3">{id}</td><td className="px-3 py-3">{date}</td><td className="px-3 py-3">{customer}</td><td className="px-3 py-3">{items}</td><td className="px-3 py-3">{total}</td><td className="px-3 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${tone}`}>{status}</span></td></tr>)}</tbody></table></div>
      </article>
    </section>
  )
}
