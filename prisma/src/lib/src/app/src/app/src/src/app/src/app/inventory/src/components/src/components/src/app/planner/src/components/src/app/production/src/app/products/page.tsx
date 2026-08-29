import { prisma } from '@/lib/prisma'
import ProductForm from '@/components/ProductForm'

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
    include: { recipes: { include: { items: true } } },
  })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Products & Recipes</h2>

      <div className="max-w-xl">
        <ProductForm />
      </div>

      <div className="bg-white rounded shadow p-4 space-y-4">
        {products.map((p) => (
          <div key={p.id} className="border-b pb-4">
            <h3 className="font-semibold">{p.name}</h3>
            <p className="text-sm text-slate-600">{p.code}</p>
            {p.recipes[0]?.items?.map((item) => (
              <div key={item.id} className="text-sm mt-2">
                {item.foamName} - {item.requiredLength} x {item.requiredWidth} x{' '}
                {item.requiredThickness} ({item.quantityPerUnit})
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
