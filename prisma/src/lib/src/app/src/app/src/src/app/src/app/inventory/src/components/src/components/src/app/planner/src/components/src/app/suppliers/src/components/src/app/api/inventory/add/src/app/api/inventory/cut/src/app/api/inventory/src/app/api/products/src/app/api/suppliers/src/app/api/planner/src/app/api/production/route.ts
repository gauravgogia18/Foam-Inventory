import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const runs = await prisma.productionRun.findMany({
    include: { product: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(runs)
}

export async function POST(req: Request) {
  const body = await req.json()

  const run = await prisma.productionRun.create({
    data: {
      productId: body.productId,
      plannedQty: parseInt(body.quantity),
      producedQty: parseInt(body.quantity),
      status: 'completed',
      operatorName: body.operatorName || null,
    },
  })

  return NextResponse.json(run)
}
