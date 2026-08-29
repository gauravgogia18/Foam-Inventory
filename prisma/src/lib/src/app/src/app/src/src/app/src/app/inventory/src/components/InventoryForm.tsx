'use client'

import { useState } from 'react'

export default function InventoryForm() {
  const [form, setForm] = useState({
    sku: '',
    name: '',
    length: '',
    width: '',
    thickness: '',
    quantity: '1',
    unitPrice: '',
    batchNo: '',
    location: '',
  })

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/inventory/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    window.location.reload()
  }

  return (
    <form onSubmit={submit} className="bg-white rounded shadow p-4 space-y-3">
      <h3 className="font-semibold">Add Foam Stock</h3>
      {Object.keys(form).map((key) => (
        <input
          key={key}
          placeholder={key}
          value={(form as any)[key]}
          onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          className="w-full border rounded px-3 py-2"
        />
      ))}
      <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
        Save Stock
      </button>
    </form>
  )
}
