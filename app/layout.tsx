import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Family Business Tycoon | Build Your Trading Empire Through History',
  description: 'Embark on a captivating journey through time in Family Business Tycoon, an immersive economic simulation game. Manage your family\'s trading empire across bustling towns, navigate dynamic markets, and make strategic decisions to grow your wealth and influence.',
  keywords: 'economic simulation, trading game, family business, tycoon game, historical strategy, market simulation, business management, trade empire, economic strategy, time progression game',
  openGraph: {
    title: 'Family Business Tycoon',
    description: 'Build your trading empire through historical eras',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Family Business Tycoon Game',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Family Business Tycoon',
    description: 'Build your trading empire through historical eras',
    images: ['/images/twitter-image.jpg'],
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