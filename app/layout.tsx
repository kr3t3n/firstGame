'use client'

import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import WelcomeScreen from '@/components/welcome-screen'  // Updated import
import { useUser } from '@/lib/UserContext'
import { getUserPreference, updateUserPreference } from '@/lib/firestore'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showWelcome, setShowWelcome] = useState(false)
  const { user } = useUser()

  console.log('RootLayout rendered, user:', user)

  useEffect(() => {
    console.log('useEffect triggered')
    const checkWelcomeScreen = async () => {
      console.log('Checking welcome screen')
      if (user) {
        console.log('User found:', user)
        try {
          const hasSeenWelcome = await getUserPreference(user.uid, 'hasSeenWelcome')
          console.log('Has seen welcome:', hasSeenWelcome)
          setShowWelcome(!hasSeenWelcome)
        } catch (error) {
          console.error('Error getting user preference:', error)
        }
      } else {
        console.log('No user found')
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome')
        console.log('Local storage has seen welcome:', hasSeenWelcome)
        setShowWelcome(hasSeenWelcome !== 'true')
      }
    }

    checkWelcomeScreen()
  }, [user])

  console.log('Show welcome:', showWelcome)

  const handleCloseWelcome = (dontShowAgain: boolean) => {
    console.log('Closing welcome screen, dontShowAgain:', dontShowAgain)
    setShowWelcome(false)
    if (user) {
      console.log('Updating user preference in Firestore')
      updateUserPreference(user.uid, 'hasSeenWelcome', true)
    } else if (dontShowAgain) {
      console.log('Updating local storage')
      localStorage.setItem('hasSeenWelcome', 'true')
    }
  }

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {showWelcome ? (
          <WelcomeScreen onClose={handleCloseWelcome} />
        ) : (
          console.log('Welcome screen not shown')
        )}
      </body>
    </html>
  )
}