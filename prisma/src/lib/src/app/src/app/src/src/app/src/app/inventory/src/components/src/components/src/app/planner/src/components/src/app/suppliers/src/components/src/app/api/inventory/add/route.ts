import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const stock = await prisma.foamStock.create({
    data: {
      sku: body.sku,
      name: body.name,
      length: parseFloat(body.length),
      width: parseFloat(body.width),
      thickness: parseFloat(body.thickness),
      quantity: parseInt(body.quantity),
      unitPrice: parseFloat(body.unitPrice),
      batchNo: body.batchNo || null,
      location: body.location || null,
    },
  })

  return NextResponse.json(stock)
}
