import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await prisma.product.findMany({
    include: { recipes: { include: { items: true } } },
  })
  const stocks = await prisma.foamStock.findMany()

  const result = products.map((product) => {
    const recipe = product.recipes[0]
    if (!recipe) {
      return { product: product.name, maxUnits: 0, limitingComponent: 'No recipe' }
    }

    const componentCaps = recipe.items.map((item) => {
      const matches = stocks.filter(
        (s) =>
          s.name.toLowerCase().includes(item.foamName.toLowerCase()) &&
          s.length >= item.requiredLength &&
          s.width >= item.requiredWidth &&
          s.thickness === item.requiredThickness
      )

      const total = matches.reduce((sum, s) => sum + s.quantity, 0)
      return {
        component: item.foamName,
        available: total,
        required: item.quantityPerUnit,
        possibleUnits: Math.floor(total / item.quantityPerUnit),
      }
    })

    const maxUnits = Math.min(...componentCaps.map((c) => c.possibleUnits))
    const limitingComponent = componentCaps.find((c) => c.possibleUnits === maxUnits)

    return {
      product: product.name,
      code: product.code,
      maxUnits,
      limitingComponent,
    }
  })

  return NextResponse.json(result)
}
