import { Bitcoin, Box, Mail, ShoppingCart, Trophy, UserRound, WalletCards } from 'lucide-react'

export default function Profile() {
  const summary = [
    ['Total Orders', '128', ShoppingCart, 'soft-blue text-brand-600'],
    ['Total Spent', '฿48,500', Bitcoin, 'soft-purple text-violet-600'],
    ['Wishlist Items', '6', Box, 'soft-green text-emerald-600'],
    ['Loyalty Points', '320', Trophy, 'soft-gold text-amber-600'],
  ]
  return (
    <section className="fade-in">
      <h1 className="text-2xl font-extrabold text-slate-950">Profile</h1>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.15fr]">
        <article className="panel flex flex-col items-center justify-center p-6 text-center">
          <div className="soft-blue grid h-28 w-28 place-items-center rounded-full"><UserRound size={60} className="text-brand-500" /></div>
          <h2 className="mt-5 text-xl font-extrabold text-slate-950">Alex Student</h2>
          <p className="mt-4 flex items-center gap-3 text-slate-600"><Mail size={18} /> alex@email.com</p>
          <p className="mt-3 flex items-center gap-3 text-slate-600"><WalletCards size={18} /> Student ID: 6501234567</p>
        </article>
        <article className="panel p-5"><h2 className="font-bold text-slate-950">Account Summary</h2><p className="mt-1 text-xs text-slate-500">Sample data from the previous profile</p><div className="mt-5 grid gap-4 sm:grid-cols-2">{summary.map(([label, value, Icon, tone]) => <div key={label} className={`${tone} min-h-32 rounded-xl p-4`}><Icon size={24} /><p className="mt-3 text-sm text-slate-600">{label}</p><p className="mt-1 text-xl font-extrabold text-slate-950">{value}</p></div>)}</div></article>
      </div>
    </section>
  )
}
