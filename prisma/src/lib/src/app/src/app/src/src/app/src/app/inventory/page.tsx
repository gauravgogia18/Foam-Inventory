import { prisma } from '@/lib/prisma'
import InventoryForm from '@/components/InventoryForm'
import CutForm from '@/components/CutForm'

export default async function InventoryPage() {
  const stocks = await prisma.foamStock.findMany({
    include: { supplier: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Foam Inventory</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InventoryForm />
        <CutForm />
      </div>

      <div className="bg-white rounded shadow p-4 overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left border-b">
            <tr>
              <th className="py-2">Name</th>
              <th>SKU</th>
              <th>Size</th>
              <th>Thickness</th>
              <th>Qty</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((s) => (
              <tr key={s.id} className="border-b">
                <td className="py-2">{s.name}</td>
                <td>{s.sku}</td>
                <td>
                  {s.length} x {s.width}
                </td>
                <td>{s.thickness}</td>
                <td>{s.quantity}</td>
                <td>₹{s.unitPrice.toFixed(2)}</td>
                <td>₹{(s.quantity * s.unitPrice).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
