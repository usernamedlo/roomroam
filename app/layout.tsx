import './globals.css'
import type { Metadata } from 'next'
import { Raleway } from "next/font/google";

import Navbar from './components/navbar/Navbar'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Room Roam',
  description: 'Room Roam is website for finding hotel rooms.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <Navbar />
        {children}
        </body>
    </html>
  )
}
