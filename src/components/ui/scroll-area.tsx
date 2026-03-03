
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

import { cn } from "@/lib/utils"

const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none transition-colors duration-200",
      orientation === "vertical" &&
        "h-full w-[16px] border-l-2 border-r-2 border-[#6366f1] p-[2px] bg-gradient-to-b from-[#ff003c] to-[#ff8a00]",
      orientation === "horizontal" &&
        "h-[16px] flex-col border-t-2 border-b-2 border-[#6366f1] p-[2px] bg-gradient-to-r from-[#ff003c] to-[#ff8a00]",
      "data-[state=visible]:opacity-100 data-[state=hidden]:opacity-100", 
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb 
      className="relative flex-1 rounded-full bg-[#6366f1] shadow-[0_0_25px_rgba(99,102,241,1),0_0_12px_rgba(99,102,241,0.8)]" 
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

export { ScrollArea, ScrollBar }
