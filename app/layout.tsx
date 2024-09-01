import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Business Empire | Build Your Trading Dynasty Through History',
  description: 'Embark on an epic journey through time in Business Empire, an immersive economic simulation game. Manage your trading empire across bustling towns, navigate dynamic markets, and make strategic decisions to grow your wealth and influence.',
  keywords: 'economic simulation, trading game, business empire, tycoon game, historical strategy, market simulation, business management, trade empire, economic strategy, time progression game',
  openGraph: {
    title: 'Business Empire',
    description: 'Build your trading dynasty through historical eras',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Business Empire Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Empire',
    description: 'Build your trading dynasty through historical eras',
    images: [
      {
        url: '/images/twitter-image.jpg',
        width: 1200,
        height: 675,
        alt: 'Business Empire Game',
      }
    ],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}