import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type Coordinates = {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

interface ConfigurationFormProps {
  image: string;
  setImage: (image: string) => void;
  showMinimap: boolean;
  setShowMinimap: (showMinimap: boolean) => void;
  bboxColor: string;
  setBboxColor: (bboxColor: string) => void;
  coordinates: Coordinates;
  sendCoordinates: () => void;
}

export default function ConfigurationForm({
  image,
  setImage,
  showMinimap,
  setShowMinimap,
  bboxColor,
  setBboxColor,
  coordinates,
  sendCoordinates,
}: ConfigurationFormProps) {
  const [sent, setSent] = useState(false);

  return (
    <form className="grid w-full items-start gap-6">
      <fieldset className="grid gap-6 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
        <div className="grid gap-3">
          <Label htmlFor="image">Image</Label>
          <Select value={image} onValueChange={setImage}>
            <SelectTrigger id="image">
              <SelectValue placeholder="Select an image" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="/1920x1080.jpg">
                Default (1920x1080)
              </SelectItem>
              <SelectItem value="/2560x1440.jpg">
                Ultrawide (2560x1440)
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="boundingBoxColor">Bounding Box Color</Label>
          <Select value={bboxColor} onValueChange={setBboxColor}>
            <SelectTrigger id="boundingBoxColor">
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="blue">Blue</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showMinimap" className="text-sm font-medium">
            Show Minimap
          </Label>
          <Switch id="showMinimap" checked={showMinimap} onCheckedChange={setShowMinimap} />
        </div>

        <div className="grid gap-3">
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              sendCoordinates();
              setSent(true);
              setTimeout(() => {
                setSent(false);
              }, 2000);
            }}
          >
            Send Coordinates
          </Button>
        </div>

        {sent && (
          <div className="text-xs text-green-600">Coordinates sent!</div>
        )}
      </fieldset>
    </form>
  );
}
