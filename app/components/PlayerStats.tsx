import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { InfoIcon } from "lucide-react"

export function PlayerStats({ player }: PlayerStatsProps) {
  return (
    <div className="flex flex-col space-y-2 p-4 bg-secondary text-secondary-foreground rounded-lg">
      {/* ... existing code ... */}
      <div className="flex items-center justify-between">
        <span>Treasury:</span>
        <div className="flex items-center">
          <span>${player.money.toLocaleString()}</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-1">
                  <InfoIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Your available funds for trading and investments.</p>
                <p>Increase it by selling goods at a profit!</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      {/* ... rest of the component ... */}
    </div>
  )
}