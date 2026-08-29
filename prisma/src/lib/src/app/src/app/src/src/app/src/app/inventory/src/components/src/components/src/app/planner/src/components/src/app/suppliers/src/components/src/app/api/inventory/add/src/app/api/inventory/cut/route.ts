import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  const piece = await prisma.foamPiece.create({
    data: {
      sourceStockId: body.stockId,
      name: body.cutName,
      length: parseFloat(body.cutLength),
      width: parseFloat(body.cutWidth),
      thickness: parseFloat(body.cutThickness),
      quantity: parseInt(body.quantity),
      isReusable: true,
    },
  })

  return NextResponse.json(piece)
}
