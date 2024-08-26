import { useGameState } from '../context/gameStateContext'
import { usePlayer } from '../context/playerContext'
import { useTown } from '../context/townContext'
import { useTravel } from '../context/travelContext'
import { useNews } from '../context/newsContext'
import { useInventory } from '../context/inventoryContext'
import { useCharacterSheet } from '../context/characterSheetContext'
import { useMarket } from '../context/marketContext'
import { useGameBoard } from '../context/gameBoardContext'
import { useTownView } from '../context/townViewContext'
import { useMobileTownView } from '../context/mobileTownViewContext'
import { useTravelMap } from '../context/travelMapContext'
import { useNewsPanel } from '../context/newsPanelContext'
import { useGameStateContext } from '../context/gameStateContext'
import Image from 'next/image'

export default function Header() {
  return (
    <header className="bg-gray-800 text-white">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image 
              src="/fbticon.svg"
              alt="Family Business Tycoon Icon"
              width={32}
              height={32}
              className="mr-2"
            />
            <h1 className="text-2xl font-bold">Family Business Tycoon</h1>
          </div>
          {/* ... rest of the header content */}
        </div>
      </div>
    </header>
  )
}