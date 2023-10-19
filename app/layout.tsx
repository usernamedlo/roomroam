import './globals.css'
import type { Metadata } from 'next'
import { Raleway } from "next/font/google";

import Navbar from './components/navbar/Navbar'
import ClientOnly from './components/ClientOnly';

import RegisterPhoneModal from './components/modals/RegisterPhoneModal';
import RegisterEmailModal from './components/modals/RegisterEmailModal';
import LoginEmailModal from './components/modals/LoginEmailModal';

import ToasterProvider from './providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Room Roam',
  description: 'Room Roam is website for finding hotel rooms.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={raleway.className} suppressHydrationWarning={true}>
        <ClientOnly>
          <ToasterProvider />
          <RegisterPhoneModal />
          <RegisterEmailModal />
          <LoginEmailModal />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
