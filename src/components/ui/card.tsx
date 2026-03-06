import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * ENFORCED NEON CARD ARCHITECTURE
 * Replaces standard shadcn card logic with the mandatory After Patent branding.
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { badgeText?: string; square?: boolean }
>(({ className, children, badgeText, square, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative group",
      square ? "aspect-square" : "",
      className
    )}
    {...props}
  >
    {/* Gradient border frame */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-orange-400 opacity-90 blur-[0.2px]" />

    {/* Glow */}
    <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-orange-400 opacity-25 blur-2xl group-hover:opacity-40 transition-opacity duration-500" />

    {/* Inner card */}
    <div className="relative h-full w-full rounded-3xl bg-black/70 backdrop-blur-xl border border-white/10 overflow-hidden">
      {children}
    </div>

    {/* Optional badge (PRO pill) */}
    {badgeText ? (
      <div className="absolute bottom-4 right-4 z-20">
        <span className="px-3 py-1.5 rounded-full border border-white/15 bg-black/60 backdrop-blur text-white/90 text-[10px] font-black uppercase tracking-widest shadow-2xl">
          {badgeText}
        </span>
      </div>
    ) : null}
  </div>
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
