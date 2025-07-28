


import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { type VariantProps, cva } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { Separator } from "@radix-ui/react-separator"
import { Button } from "@/components/ui/button"
import { Input } from "./input"

const Sidebar = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("w-64 bg-white border-r border-gray-200 flex flex-col", className)} {...props} />
})
Sidebar.displayName = "Sidebar"

const SidebarProvider = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, children, ...props }, ref) => {
  return (
    <TooltipProvider>
      <div ref={ref} className={cn("flex min-h-screen", className)} {...props}>
        {children}
      </div>
    </TooltipProvider>
  )
})
SidebarProvider.displayName = "SidebarProvider"

const SidebarHeader = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("p-6 border-b border-gray-200", className)} {...props} />
})
SidebarHeader.displayName = "SidebarHeader"

const SidebarContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex-1 p-4", className)} {...props} />
})
SidebarContent.displayName = "SidebarContent"

const SidebarFooter = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("p-4 border-t border-gray-200", className)} {...props} />
})
SidebarFooter.displayName = "SidebarFooter"

const SidebarInset = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex-1 bg-gray-50", className)} {...props} />
})
SidebarInset.displayName = "SidebarInset"

const SidebarInput = React.forwardRef<React.ElementRef<typeof Input>, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className)}
        {...props}
      />
    )
  }
)
SidebarInput.displayName = "SidebarInput"

const SidebarSeparator = React.forwardRef<React.ElementRef<typeof Separator>, React.ComponentProps<typeof Separator>>(
  ({ className, ...props }, ref) => {
    return <Separator ref={ref} className={cn("mx-2 w-auto bg-sidebar-border", className)} {...props} />
  }
)
SidebarSeparator.displayName = "SidebarSeparator"

const SidebarGroup = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("relative flex w-full min-w-0 flex-col p-2", className)} {...props} />
})
SidebarGroup.displayName = "SidebarGroup"

const SidebarGroupLabel = React.forwardRef<HTMLDivElement, React.ComponentProps<"div"> & { asChild?: boolean }>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        ref={ref}
        className={cn("flex h-8 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70", className)}
        {...props}
      />
    )
  }
)
SidebarGroupLabel.displayName = "SidebarGroupLabel"

const SidebarGroupContent = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("w-full text-sm", className)} {...props} />
)
SidebarGroupContent.displayName = "SidebarGroupContent"

const SidebarMenu = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("flex w-full flex-col gap-1", className)} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("group/menu-item relative", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

const sidebarMenuButtonVariants = cva(
  "flex w-full items-center gap-2 rounded-md p-2 text-left text-sm hover:bg-gray-100 hover:text-gray-900 [&>span:last-child]:truncate [&>svg]:size-4",
  {
    variants: {
      variant: {
        default: "",
        outline: "bg-background shadow border hover:shadow-md",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean
    tooltip?: string | React.ComponentProps<typeof TooltipContent>
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(({ asChild = false, variant = "default", size = "default", tooltip, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"

  const button = (
    <Comp ref={ref} className={cn(sidebarMenuButtonVariants({ variant, size }), className)} {...props} />
  )

  if (!tooltip) return button

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center">{typeof tooltip === "string" ? tooltip : tooltip.children}</TooltipContent>
    </Tooltip>
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

export {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarInput,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
}
