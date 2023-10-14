import './globals.css'
import type { Metadata } from 'next'
import { Raleway } from "next/font/google";

import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly';

import RegisterModalEmail from './components/modals/RegisterModalPhone';
import RegisterModalPhone from './components/modals/RegisterModalEmail';
import ToasterProvider from './providers/ToasterProvider';

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
        <ClientOnly>
          <ToasterProvider />
          <RegisterModalEmail />
          <RegisterModalPhone />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
