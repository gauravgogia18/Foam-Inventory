import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const suppliers = await prisma.supplier.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(suppliers)
}

export async function POST(req: Request) {
  const body = await req.json()

  const supplier = await prisma.supplier.create({
    data: {
      name: body.name,
      contactPerson: body.contactPerson || null,
      phone: body.phone || null,
      email: body.email || null,
      address: body.address || null,
      leadTimeDays: parseInt(body.leadTimeDays || '7'),
    },
  })

  return NextResponse.json(supplier)
}
