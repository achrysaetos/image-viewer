import React, { useState } from "react"
import { Share } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import Playground from "./playground"

const ConfigurationForm = () => (
  <form className="grid w-full items-start gap-6">
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
      <div className="grid gap-3">
        <Label htmlFor="model">Image</Label>
        <Select>
          <SelectTrigger id="model">
            <SelectValue placeholder="Select an image" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="/image.jpg">Default</SelectItem>
            <SelectItem value="/ultrawide.jpg">Ultrawide</SelectItem>
            <SelectItem value="/image3">Image 3</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="temperature">Temperature</Label>
        <Input id="temperature" type="number" placeholder="0.4" />
      </div>
    </fieldset>
    
    <fieldset className="grid gap-6 rounded-lg border p-4">
      <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
      <div className="grid gap-3">
        <Label htmlFor="role">Role</Label>
        <Select defaultValue="system">
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="assistant">Assistant</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" placeholder="You are a..." className="min-h-[9.5rem]" />
      </div>
    </fieldset>
  </form>
)

export default function Home() {
  const [image, setImage] = useState("/ultrawide.jpg")
  return (
    <div className="w-2/3 mx-auto">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Playground</h1>
          <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
            <Share className="size-3.5" />
            Share
          </Button>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-[1fr,2fr] lg:grid-cols-[1fr,3fr]">
          <div className="relative hidden flex-col items-start gap-8 md:flex">
            <ConfigurationForm />
          </div>
          <div className="relative flex h-full min-h-[55vh] flex-col rounded-sm bg-muted/50 p-1">
            <Playground image={image} />
          </div>
        </main>
      </div>
    </div>
  )
}
