import React, { useState } from "react"
import { Share } from "lucide-react"
import { Button } from "@/components/ui/button"

import ConfigurationForm, { Coordinates } from "./configform"
import Playground from "./playground"

export default function Home() {
  const [image, setImage] = useState("/1920x1080.jpg")
  const [bboxColor, setBboxColor] = useState("green")
  const [showMinimap, setShowMinimap] = useState(true)
  const [coordinates, setCoordinates] = useState<Coordinates>({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0
  });

  const sendCoordinates = async () => {
    const pixels = [
      { x: coordinates.startX, y: coordinates.startY },  // Top-left
      { x: coordinates.endX, y: coordinates.startY },    // Top-right
      { x: coordinates.startX, y: coordinates.endY },    // Bottom-left
      { x: coordinates.endX, y: coordinates.endY }       // Bottom-right
    ];
    try {
      const response = await fetch('https://the-base-page-4392-c964a3ff-ejyxadcd.onporter.run/api/pixels-receiver/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pixels: pixels }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response:", data);
      } else {
        throw new Error('Failed to send coordinates');
      }
    } catch (error) {
      console.error('Error sending coordinates:', error);
    }
  };

  return (
    <div className="w-3/4 mx-auto">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Image Viewer</h1>
          <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
            <Share className="size-3.5" /> Share
          </Button>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-[1fr,2fr] lg:grid-cols-[1fr,3fr]">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <ConfigurationForm 
              image={image} 
              setImage={setImage} 
              showMinimap={showMinimap} 
              setShowMinimap={setShowMinimap} 
              bboxColor={bboxColor} 
              setBboxColor={setBboxColor}
              coordinates={coordinates}
              sendCoordinates={sendCoordinates}
            />
          </div>
          <div className="relative flex flex-col rounded-sm bg-muted/50 p-1">
            <Playground image={image} bboxColor={bboxColor} showMinimap={showMinimap} setCoordinates={setCoordinates} />
          </div>
        </main>
      </div>
    </div>
  )
}
