import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CRUD U&F',
  description: 'CRUD of Universities and Faculties',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="max-w-3xl mx-auto p-4">
        <Navbar/>
          <div className="mt-8">{children}</div>
      </div>
      </body>
    </html>
  )
}
