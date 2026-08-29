import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const products = await prisma.product.findMany({
    include: { recipes: { include: { items: true } } },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(products)
}

export async function POST(req: Request) {
  const body = await req.json()

  const product = await prisma.product.create({
    data: {
      code: body.code,
      name: body.name,
      category: body.category || null,
      sellingPrice: parseFloat(body.sellingPrice || '0'),
      recipes: {
        create: {
          items: {
            create: [],
          },
        },
      },
    },
  })

  return NextResponse.json(product)
}
