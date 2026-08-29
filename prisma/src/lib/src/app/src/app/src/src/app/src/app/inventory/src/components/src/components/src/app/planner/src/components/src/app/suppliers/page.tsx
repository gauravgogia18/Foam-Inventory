import { prisma } from '@/lib/prisma'
import SupplierForm from '@/components/SupplierForm'

export default async function SuppliersPage() {
  const suppliers = await prisma.supplier.findMany({
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Suppliers</h2>

      <div className="max-w-xl">
        <SupplierForm />
      </div>

      <div className="bg-white rounded shadow p-4 space-y-3">
        {suppliers.map((s) => (
          <div key={s.id} className="border-b pb-3">
            <h3 className="font-semibold">{s.name}</h3>
            <p className="text-sm text-slate-600">{s.phone}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
