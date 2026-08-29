import './globals.css'
import Nav from '@/components/Nav'

export const metadata = {
  title: 'Foam Inventory App',
  description: 'Track foam inventory, pieces, leftovers, and manufacturing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen md:flex">
          <Nav />
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </body>
    </html>
  )
}
