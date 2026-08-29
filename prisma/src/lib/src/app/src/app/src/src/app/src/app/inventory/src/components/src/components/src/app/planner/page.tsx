import { prisma } from '@/lib/prisma'

async function getPlan() {
  const products = await prisma.product.findMany({
    where: { active: true },
    include: {
      recipes: {
        where: { active: true },
        include: { items: true },
      },
    },
  })

  const stocks = await prisma.foamStock.findMany()

  return products.map((product) => {
    const recipe = product.recipes[0]
    if (!recipe) {
      return { product, maxUnits: 0, limiting: 'No recipe' }
    }

    const caps = recipe.items.map((item) => {
      const matches = stocks.filter(
        (s) =>
          s.name.toLowerCase().includes(item.foamName.toLowerCase()) &&
          s.length >= item.requiredLength &&
          s.width >= item.requiredWidth &&
          s.thickness === item.requiredThickness
      )

      const totalQty = matches.reduce((sum, s) => sum + s.quantity, 0)
      return {
        item,
        possibleUnits: Math.floor(totalQty / item.quantityPerUnit),
        available: totalQty,
      }
    })

    const maxUnits = Math.min(...caps.map((c) => c.possibleUnits))
    const limiting = caps.find((c) => c.possibleUnits === maxUnits)

    return {
      product: { name: product.name, code: product.code },
      maxUnits,
      limiting,
    }
  })
}

export default async function PlannerPage() {
  const plan = await getPlan()

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manufacturing Planner</h2>

      <div className="grid gap-4">
        {plan.map((p) => (
          <div key={p.product.code} className="bg-white rounded shadow p-4">
            <h3 className="font-semibold text-lg">{p.product.name}</h3>
            <p className="text-sm text-slate-600">Code: {p.product.code}</p>
            <p className="mt-2">
              Can manufacture now: <b>{p.maxUnits}</b>
            </p>
            {p.limiting && (
              <p className="mt-1 text-sm text-red-600">
                Limiting component: {p.limiting.item.foamName}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
