import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const stocks = await prisma.foamStock.findMany({
    include: { supplier: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(stocks)
}
