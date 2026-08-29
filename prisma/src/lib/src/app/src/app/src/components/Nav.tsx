import Link from 'next/link'

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/inventory', label: 'Inventory' },
  { href: '/planner', label: 'Planner' },
  { href: '/production', label: 'Production' },
  { href: '/products', label: 'Products' },
  { href: '/suppliers', label: 'Suppliers' },
]

export default function Nav() {
  return (
    <aside className="bg-slate-900 text-white md:w-64 p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold">Foam App</h1>
        <p className="text-sm text-slate-300">Inventory & Manufacturing</p>
      </div>

      <nav className="flex md:flex-col gap-2 overflow-auto">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-3 py-2 rounded bg-slate-800 hover:bg-slate-700"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
