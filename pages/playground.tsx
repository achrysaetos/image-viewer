import Image from "next/image";
import React, { useState, useRef } from "react";
import { TransformWrapper, TransformComponent, MiniMap } from "react-zoom-pan-pinch";
import { Move, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PlaygroundProps {
  image: string;
  bboxColor: string;
  showMinimap: boolean;
  setCoordinates: (coordinates: { startX: number; startY: number; endX: number; endY: number }) => void;
}

export default function Playground({ image, bboxColor, showMinimap, setCoordinates }: PlaygroundProps) {
  const [boundingBox, setBoundingBox] = useState({ startX: 0, startY: 0, endX: 0, endY: 0 });
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<"move" | "draw">("move");
  const imageRef = useRef<HTMLDivElement>(null);

  const IMAGE_WIDTH = image == '/1920x1080.jpg' ? 1920 : 2560;
  const IMAGE_HEIGHT = image == '/1920x1080.jpg' ? 1080 : 1440;

  const getImageCoordinates = (clientX: number, clientY: number) => {
    if (!imageRef.current) return { x: 0, y: 0 };
    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.round((clientX - rect.left) * (IMAGE_WIDTH / rect.width));
    const y = Math.round((clientY - rect.top) * (IMAGE_HEIGHT / rect.height));
    return { x, y };
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== "draw") return;
    const { x, y } = getImageCoordinates(e.clientX, e.clientY);
    setBoundingBox({ startX: x, startY: y, endX: x, endY: y });
    setIsDrawing(true);
    setCoordinates({ startX: x, startY: y, endX: x, endY: y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mode !== "draw" || !isDrawing) return;
    const { x, y } = getImageCoordinates(e.clientX, e.clientY);
    setBoundingBox(prev => ({ ...prev, endX: x, endY: y }));
    if (isDrawing) {
      setCoordinates({ startX: boundingBox.startX, startY: boundingBox.startY, endX: x, endY: y });
    }
  };

  const handleMouseUp = () => {
    if (mode !== "draw") return;
    setIsDrawing(false);
  };

  const renderBoundingBox = () => {
    const left = Math.min(boundingBox.startX, boundingBox.endX) / IMAGE_WIDTH * 100;
    const top = Math.min(boundingBox.startY, boundingBox.endY) / IMAGE_HEIGHT * 100;
    const width = Math.abs(boundingBox.endX - boundingBox.startX) / IMAGE_WIDTH * 100;
    const height = Math.abs(boundingBox.endY - boundingBox.startY) / IMAGE_HEIGHT * 100;

    return (
      <div
        style={{
          position: 'absolute',
          left: `${left}%`,
          top: `${top}%`,
          width: `${width}%`,
          height: `${height}%`,
          border: `3px dotted ${bboxColor}`,
        }}
      />
    );
  };

  return (
    <div className="w-full h-full">
      <div className="flex items-center justify-between mb-2">
        {/* Status bar */}
        <div className="flex space-x-2">
          <Button
            onClick={() => setMode("move")}
            className={`flex items-center ${mode === "move" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-gray-200"}`}
          >
            <Move className="mr-2 h-4 w-4" /> Move/Zoom
          </Button>
          <Button
            onClick={() => setMode("draw")}
            className={`flex items-center ${mode === "draw" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-gray-200"}`}
          >
            <Pencil className="mr-2 h-4 w-4" /> Draw
          </Button>
        </div>
        <div className="text-xs text-green-600">
          <p className="ml-2">
            &#123;x: {boundingBox.startX}, y: {boundingBox.startY}&#125;, &#123;x: {boundingBox.endX}, y: {boundingBox.startY}&#125;,
          </p>
          <p className="ml-2">
            &#123;x: {boundingBox.startX}, y: {boundingBox.endY}&#125;, &#123;x: {boundingBox.endX}, y: {boundingBox.endY}&#125;
          </p>
        </div>
      </div>

      {/* Image and minimap*/}
      <TransformWrapper disabled={mode === "draw"}>
        <TransformComponent>
          <div
            ref={imageRef}
            className={`relative ${mode === "move" ? "cursor-grab active:cursor-grabbing" : "cursor-crosshair"}`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <Image
              src={image}
              alt="Playground image"
              width={IMAGE_WIDTH}
              height={IMAGE_HEIGHT}
              className="w-full h-full"
            />
            {renderBoundingBox()}
          </div>
        </TransformComponent>

        {showMinimap && !isDrawing && (
          <div className="absolute bottom-0 right-0">
            <MiniMap>
              <div className="relative">
                <Image src={image} alt="Minimap" width={IMAGE_WIDTH} height={IMAGE_HEIGHT} />
                <div className="absolute inset-0 bg-white opacity-50"></div>
              </div>
            </MiniMap>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
}
