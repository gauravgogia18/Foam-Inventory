import { prisma } from '@/lib/prisma'
import Link from 'next/link'

async function getDashboard() {
  const stocks = await prisma.foamStock.findMany({
    include: { supplier: true },
  })

  const totalValue = stocks.reduce(
    (sum, s) => sum + s.quantity * s.unitPrice,
    0
  )

  const lowStock = stocks.filter((s) => s.quantity <= 5)

  return {
    totalSheets: stocks.length,
    totalValue,
    lowStockCount: lowStock.length,
    stocks,
  }
}

export default async function DashboardPage() {
  const data = await getDashboard()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded shadow p-4">
          <p className="text-sm text-slate-500">Total Sheets</p>
          <p className="text-3xl font-bold">{data.totalSheets}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <p className="text-sm text-slate-500">Inventory Value</p>
          <p className="text-3xl font-bold">₹{data.totalValue.toFixed(2)}</p>
        </div>
        <div className="bg-white rounded shadow p-4">
          <p className="text-sm text-slate-500">Low Stock Alerts</p>
          <p className="text-3xl font-bold">{data.lowStockCount}</p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Recent Stock</h3>
          <Link className="text-blue-600" href="/inventory">
            View Inventory
          </Link>
        </div>

        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left border-b">
              <tr>
                <th className="py-2">Name</th>
                <th>Size</th>
                <th>Thickness</th>
                <th>Qty</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {data.stocks.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="py-2">{s.name}</td>
                  <td>
                    {s.length} x {s.width}
                  </td>
                  <td>{s.thickness}</td>
                  <td>{s.quantity}</td>
                  <td>₹{(s.quantity * s.unitPrice).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
