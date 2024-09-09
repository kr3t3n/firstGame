import React, { useState, useCallback } from 'react'
import { X, TrendingUp, Book, MapPin, Newspaper } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

const tutorialScreens = [
  {
    title: "Welcome to Business Empire!",
    content: "Embark on a journey through history as you build your trading empire from the ground up.",
  },
  {
    title: "Key Instructions/Tips",
    content: [
      { icon: TrendingUp, text: "Trade Wisely: Buy low, sell high. Watch market trends and news to make informed decisions." },
      { icon: Book, text: "Develop Skills: Improve your trading, negotiation, and management abilities to gain an edge." },
      { icon: MapPin, text: "Explore Cities: Travel between towns to find the best deals and expand your influence." },
      { icon: Newspaper, text: "Stay Informed: Keep an eye on the news panel for events that may impact your business." },
    ],
  },
  {
    title: "Core Mechanics Overview",
    content: "Master the art of trading, navigate through different cities, and adapt to historical events as you grow your business empire.",
  },
  {
    title: "Getting Started",
    content: "Begin in industrial London, make your first trades, and gradually expand your operations. Don't forget to check your inventory and treasury regularly!",
  },
  {
    title: "Future Teaser",
    content: "As you progress, unlock new transportation options, technologies, and trading opportunities. The world of commerce awaits!",
  },
  {
    title: "Call to Action",
    content: "Are you ready to make your mark on history? Start your journey now!",
  },
]

export default function WelcomeModal() {
  const [showModal, setShowModal] = useState(true)
  const [currentScreen, setCurrentScreen] = useState(0)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  const closeModal = useCallback(() => setShowModal(false), [])
  const nextScreen = useCallback(() => {
    setCurrentScreen((prev) => (prev < tutorialScreens.length - 1 ? prev + 1 : prev))
  }, [])
  const prevScreen = useCallback(() => {
    setCurrentScreen((prev) => (prev > 0 ? prev - 1 : prev))
  }, [])

  const handleDontShowAgainChange = useCallback((checked: boolean) => {
    setDontShowAgain(checked)
  }, [])

  const screen = tutorialScreens[currentScreen]
  const isLastScreen = currentScreen === tutorialScreens.length - 1

  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden relative">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-4rem)]">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto mb-4 bg-contain bg-center bg-no-repeat"
                 style={{backgroundImage: "url('/placeholder.svg?height=96&width=96')"}}
                 aria-label="Business Empire logo" />
            <h2 className="text-2xl font-bold text-sepia mb-2">{screen.title}</h2>
            {Array.isArray(screen.content) ? (
              <div className="space-y-4 text-left">
                {screen.content.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <item.icon className="h-6 w-6 text-sepia mr-3 flex-shrink-0" />
                    <p className="text-brown-800">{item.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-brown-800">{screen.content}</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2 order-2 sm:order-1">
              <Checkbox 
                id="dontShow" 
                checked={dontShowAgain}
                onCheckedChange={handleDontShowAgainChange}
              />
              <label
                htmlFor="dontShow"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-brown-700"
              >
                Don't show this again
              </label>
            </div>
            <div className="flex gap-4 w-full sm:w-auto order-1 sm:order-2">
              {currentScreen > 0 && (
                <Button variant="outline" className="flex-1 sm:flex-initial border-black text-black hover:bg-black hover:text-white" onClick={prevScreen}>
                  Previous
                </Button>
              )}
              <Button 
                className="flex-1 sm:flex-initial bg-black hover:bg-gray-800 text-white" 
                onClick={isLastScreen ? closeModal : nextScreen}
              >
                {isLastScreen ? "Start Playing" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}