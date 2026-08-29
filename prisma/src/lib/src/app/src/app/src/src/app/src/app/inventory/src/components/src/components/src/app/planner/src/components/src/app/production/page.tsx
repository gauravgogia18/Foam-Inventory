import { prisma } from '@/lib/prisma'
import ProductionForm from '@/components/ProductionForm'

export default async function ProductionPage() {
  const runs = await prisma.productionRun.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Production</h2>

      <div className="max-w-xl">
        <ProductionForm />
      </div>

      <div className="bg-white rounded shadow p-4 overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left border-b">
            <tr>
              <th className="py-2">Product</th>
              <th>Planned</th>
              <th>Produced</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((r) => (
              <tr key={r.id} className="border-b">
                <td className="py-2">{r.product.name}</td>
                <td>{r.plannedQty}</td>
                <td>{r.producedQty}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
